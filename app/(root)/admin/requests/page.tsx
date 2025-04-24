"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertCircle, Loader2, BookOpenCheck } from "lucide-react"
import Link from "next/link"
import { RxCross2 } from "react-icons/rx"

interface BorrowRequest {
  id?: string
  _id?: string
  userId: string
  userName?: string
  bookId?: string
  book_id?: string
  bookTitle?: string
  bookAuthor?: string
  status: string
  createdAt?: Date
  img?: string
}

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState<BorrowRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("pending")

  // Fetch all borrow requests
  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/books/borrowRequests/getAll")
      setRequests(response.data)
    } catch (error) {
      console.error("Error fetching borrow requests:", error)
      toast.error("Failed to fetch borrow requests.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleApprove = async (requestId: string, bookId: string, userId: string) => {
    setProcessing(requestId)
    try {
      const response = await axios.post("/api/books/borrowRequests/approve", {
        requestId,
        bookId,
        userId,
      })

      if (response.status === 200) {
        toast.success("Request approved successfully!")
        fetchRequests() // Refresh the list
      } else {
        toast.error("Failed to approve the request.")
      }
    } catch (error: any) {
      console.error("Error approving request:", error)
      const errorMessage = error.response?.data?.error || "An error occurred while approving the request."
      toast.error(errorMessage)
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (requestId: string) => {
    setProcessing(requestId)
    try {
      const response = await axios.post("/api/books/borrowRequests/reject", {
        requestId,
      })

      if (response.status === 200) {
        toast.success("Request rejected successfully!")
        fetchRequests() // Refresh the list
      } else {
        toast.error("Failed to reject the request.")
      }
    } catch (error: any) {
      console.error("Error rejecting request:", error)
      const errorMessage = error.response?.data?.error || "An error occurred while rejecting the request."
      toast.error(errorMessage)
    } finally {
      setProcessing(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter requests by status
  const pendingRequests = requests.filter((req) => req.status.toLowerCase() === "pending")
  const approvedRequests = requests.filter((req) => req.status.toLowerCase() === "approved")
  const rejectedRequests = requests.filter((req) => req.status.toLowerCase() === "rejected")

  // Get count for each status
  const pendingCount = pendingRequests.length
  const approvedCount = approvedRequests.length
  const rejectedCount = rejectedRequests.length

  const renderRequestsTable = (filteredRequests: BorrowRequest[]) => {
    if (filteredRequests.length === 0) {
      return (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <BookOpenCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No requests found</h3>
          <p className="text-muted-foreground mt-2">There are no book borrow requests in this category.</p>
        </div>
      )
    }

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request: BorrowRequest, idx) => {
              const requestId = request.id || request._id || ""
              const isPending = request.status.toLowerCase() === "pending"

              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    <div className="w-16 h-24 rounded-md overflow-hidden bg-muted">
                      {request.img ? (
                        <img
                          src={request.img || "/placeholder.svg"}
                          alt={request.bookTitle}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Skeleton className="h-full w-full" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.bookTitle}</p>
                      <p className="text-sm text-muted-foreground">{request.bookAuthor}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{request.userName}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    {isPending ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                          onClick={() =>
                            handleApprove(requestId, request.bookId || request.book_id || "", request.userId)
                          }
                          disabled={!!processing}
                        >
                          {processing === requestId ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                          onClick={() => handleReject(requestId)}
                          disabled={!!processing}
                        >
                          {processing === requestId ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No actions available</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">Borrow Requests</CardTitle>
              <CardDescription>Manage book borrow requests from users</CardDescription>
            </div>
            <div className="flex items-center gap-2">
            <Button variant="outline" onClick={fetchRequests} disabled={loading} className="self-start md:self-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>Refresh</>
              )}
            </Button>
            <Button asChild className="">
              <Link href="/admin">
                <RxCross2 className=" h-4 w-4" />
              </Link>
            </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="pending" className="relative">
                  Pending
                  {pendingCount > 0 && (
                    <Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                      {pendingCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="approved" className="relative">
                  Approved
                  {approvedCount > 0 && (
                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                      {approvedCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="rejected" className="relative">
                  Rejected
                  {rejectedCount > 0 && (
                    <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
                      {rejectedCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-0">
                {renderRequestsTable(pendingRequests)}
              </TabsContent>

              <TabsContent value="approved" className="mt-0">
                {renderRequestsTable(approvedRequests)}
              </TabsContent>

              <TabsContent value="rejected" className="mt-0">
                {renderRequestsTable(rejectedRequests)}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminRequestsPage


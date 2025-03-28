"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, XCircle, AlertCircle, Loader2, BookOpenCheck } from "lucide-react"

interface BorrowRequest {
  id?: string
  _id?: string
  userId: string
  bookId?: string
  book_id?: string
  bookTitle?: string
  status: string
  createdAt?: Date
}

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState<BorrowRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState<string | null>(null)

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

  // Approve a borrow request
  const handleApprove = async (requestId: string, bookId: string) => {
    setProcessing(requestId)
    console.log("Approving request with payload:", { requestId, bookId })
    try {
      const response = await axios.post("/api/books/borrowRequests/approve", {
        requestId,
        bookId,
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

  // Reject a borrow request
  const handleReject = async (requestId: string) => {
    setProcessing(requestId)
    console.log("Rejecting request with payload:", { requestId })
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

  useEffect(() => {
    fetchRequests()
  }, [])

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

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">Borrow Requests</CardTitle>
              <CardDescription>Manage book borrow requests from users</CardDescription>
            </div>
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
          ) : requests.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <BookOpenCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No borrow requests</h3>
              <p className="text-muted-foreground mt-2">There are no book borrow requests at the moment.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request: BorrowRequest, idx) => {
                    const requestId = request.id || request._id || ""
                    const bookId = request.bookId || request.book_id || ""
                    const isPending = request.status.toLowerCase() === "pending"

                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{request.userId}</TableCell>
                        <TableCell>{request.bookTitle}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          {isPending ? (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                                onClick={() => handleApprove(requestId, bookId)}
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminRequestsPage


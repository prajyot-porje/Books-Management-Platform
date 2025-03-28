"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import type { IBorrowRequest } from "@/lib/database/models/BorrowRequest.modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Calendar } from "lucide-react"

// Define IRequestWithBookDetails without Mongoose-specific properties
interface IRequestWithBookDetails {
  id: string
  userId: string
  bookId: string
  status: string
  createdAt: Date
  bookDetails?: {
    img: string
    title: string
    author: string
  } | null
}

const Page = () => {
  const { userId } = useAuth() // Get the logged-in user's ID
  const [status, setStatus] = useState("pending")
  const [requests, setRequests] = useState<IRequestWithBookDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequestsAndBooks = async () => {
      try {
        // Fetch all borrow requests
        const requestsResponse = await fetch("/api/books/borrowRequests/getAll")
        if (!requestsResponse.ok) {
          throw new Error(`HTTP error! status: ${requestsResponse.status}`)
        }
        const requestsData: IBorrowRequest[] = await requestsResponse.json()
        console.log("Borrow Requests API Response:", requestsData)

        // Filter requests for the logged-in user
        const userRequests = userId
          ? requestsData.filter((request) => request.userId.trim().toLowerCase() === userId.trim().toLowerCase())
          : []
        console.log("Filtered User Requests:", userRequests)

        // Fetch all books with the "all books" status
        const booksResponse = await fetch("/api/books/getBooks?status=all books")
        if (!booksResponse.ok) {
          throw new Error(`HTTP error! status: ${booksResponse.status}`)
        }
        const booksData = await booksResponse.json()
        console.log("Books API Response:", booksData)

        // Map book details to requests
        const requestsWithBookDetails: IRequestWithBookDetails[] = userRequests.map((request) => {
          const book = booksData.find((b: any) => b.isbn === request.bookId)
          return {
            id: request.id,
            userId: request.userId,
            bookId: request.bookId,
            status: request.status,
            createdAt: request.createdAt,
            bookDetails: book
              ? {
                  img: book.img,
                  title: book.title,
                  author: book.author,
                }
              : null,
          }
        })

        console.log("Requests with Book Details:", requestsWithBookDetails)
        setRequests(requestsWithBookDetails)
      } catch (error) {
        console.error("Error fetching requests or books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequestsAndBooks()
  }, [userId])

  // Normalize status for case-insensitive comparison
  const filteredRequests = requests.filter((request) => request.status.toLowerCase() === status.toLowerCase())

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">My Borrow Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" value={status} onValueChange={setStatus} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            {["pending", "approved", "rejected"].map((tabStatus) => (
              <TabsContent key={tabStatus} value={tabStatus} className="mt-0">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Skeleton className="h-16 w-12 rounded" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                        <Skeleton className="h-8 w-24 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No {tabStatus} requests</h3>
                    <p className="text-muted-foreground mt-2">
                      You don't have any {tabStatus} book borrow requests at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRequests.map((request, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                          {request.bookDetails?.img ? (
                            <img
                              src={request.bookDetails.img || "/placeholder.svg"}
                              alt={request.bookDetails.title}
                              className="h-20 w-16 object-cover rounded shadow"
                            />
                          ) : (
                            <div className="h-20 w-16 bg-muted rounded flex items-center justify-center shadow">
                              <BookOpen className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium text-lg line-clamp-1">
                              {request.bookDetails?.title || "Unknown Title"}
                            </h3>
                            <p className="text-muted-foreground">{request.bookDetails?.author || "Unknown Author"}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {new Date(request.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(request.status)} capitalize self-start sm:self-center`}>
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page


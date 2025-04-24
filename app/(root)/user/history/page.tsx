"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, BookOpen } from "lucide-react"

const BookTable = ({ books }: { books: any[] }) => {
  const calculateReturnDate = (borrowedDate: string) => {
    const date = new Date(borrowedDate)
    date.setDate(date.getDate() + 15)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Borrowed Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Fine</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id} className="hover:bg-muted/50">
              <TableCell>
                <div className="h-16 w-12 overflow-hidden rounded-sm">
                  <img
                    src={book.img || "/placeholder.svg?height=150&width=100"}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <span>
                    {new Date(book.borrowedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <span>{calculateReturnDate(book.borrowedDate)}</span>
                </div>
              </TableCell>
              <TableCell>{book.fine}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    book.status === "borrowed" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Cover</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Borrowed Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Fine</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-16 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[180px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[120px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

const EmptyState = ({ status }: { status: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="py-16 flex flex-col items-center justify-center text-center"
  >
    <div className="bg-muted/50 rounded-full p-6 mb-4">
      <BookOpen className="h-10 w-10 text-muted-foreground/60" />
    </div>
    <h3 className="text-xl font-medium mb-2">No {status} books found</h3>
    <p className="text-muted-foreground max-w-md">
      {status === "borrowed"
        ? "You don't have any borrowed books at the moment. Visit the library to borrow some books."
        : "You haven't returned any books yet. Return your borrowed books to see them here."}
    </p>
  </motion.div>
)

const HistoryPage = () => {
  const [status, setStatus] = useState("borrowed")
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const { userId } = useAuth()

  const fetchBooks = async () => {
    if (!userId) return

    setLoading(true)
    try {
      // Fetch all borrowed books
      const response = await fetch(`/api/books/getBorrowedBooks`)
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }
      const allBooks = await response.json()

      // Normalize and filter books based on userId and status
      const filteredBooks = allBooks.filter((book: any) => {
        const normalizedUserId = book.userId?.trim().toLowerCase()
        const normalizedStatus = book.status?.trim().toLowerCase()
        return normalizedUserId === userId.trim().toLowerCase() && normalizedStatus === status.trim().toLowerCase()
      })

      setBooks(filteredBooks)
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setTimeout(() => setLoading(false), 600) // Add slight delay for animation
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [status, userId])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Tabs defaultValue="borrowed" value={status} onValueChange={setStatus} className="w-full">
        <div className=" mb-5">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
            <TabsTrigger value="returned">Returned</TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-auto"
          >
            <TabsContent value="borrowed" className="mt-0">
              {loading ? (
                <LoadingSkeleton />
              ) : books.length === 0 ? (
                <EmptyState status="borrowed" />
              ) : (
                <BookTable books={books} />
              )}
            </TabsContent>

            <TabsContent value="returned" className="mt-0">
              {loading ? (
                <LoadingSkeleton />
              ) : books.length === 0 ? (
                <EmptyState status="returned" />
              ) : (
                <BookTable books={books} />
              )}
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

export default HistoryPage


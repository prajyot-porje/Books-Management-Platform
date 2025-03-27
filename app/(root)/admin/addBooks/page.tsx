"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Save, Loader2 } from "lucide-react"

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    category: "",
    price: "",
    quantity: "",
    img: "",
    publishedDate: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Book added successfully!")
        setFormData({
          title: "",
          author: "",
          isbn: "",
          publisher: "",
          category: "",
          price: "",
          quantity: "",
          img: "",
          publishedDate: "",
        })
      } else {
        toast.error("Failed to add book. Please try again.")
      }
    } catch (error) {
      console.error("Error adding book:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl w-full">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="space-y-1">
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Add a New Book</CardTitle>
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardDescription>Fill in the details below to add a new book to your inventory</CardDescription>
        </motion.div>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            />
          </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN number"
            required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publisher">Publisher</Label>
            <Input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Enter publisher name"
            required
            />
          </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange(value, "category")}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fiction">Fiction</SelectItem>
              <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Biography">Biography</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="0"
            min="0"
            required
            />
          </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="img">Cover Image URL</Label>
            <Input
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
            required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publishedDate">Published Date</Label>
            <Input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            required
            />
          </div>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full bg-blue-500 " disabled={isSubmitting}>
            {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin " />
              Adding Book...
            </>
            ) : (
            <>
              <Save className="mr-2 h-4 w-4 " />
              Add Book
            </>
            )}
          </Button>
          </motion.div>
        </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <motion.p variants={itemVariants}>All fields are required to add a new book to the inventory</motion.p>
        </CardFooter>
      </Card>
      </motion.div>
    </div>
  )
}

export default AddBookPage


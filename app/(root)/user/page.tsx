"use client"

import type React from "react"

import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "@clerk/nextjs"

import BookModal from "@/components/Custom/BookModal"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { placeholders } from "@/constants"
import type { IBook } from "@/lib/database/models/books.model"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const Page = () => {
  const { userId } = useAuth()
  const [list, setList] = useState<IBook[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/books/getBooks?status=all books")
        setList(response.data)
      } catch (error) {
        console.error("Error fetching books:", error)
        setMessage("Failed to load books. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Animation variants
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
        damping: 12,
      },
    },
  }

  const heroImageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  const sectionHeaderVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        
        /* Ensure modals appear above everything */
        [role="dialog"],
        .modal-container,
        .modal-overlay {
          position: fixed !important;
          z-index: 50 !important;
          inset: 0 !important;
        }
      `}</style>

      {/* Search Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-8 pb-4 w-full max-w-4xl mx-auto px-4"
      >
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </motion.div>

      {/* Hero Section */}
      <div className="w-full h-[400px] relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>

        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div custom={0} variants={heroImageVariants}>
            <Image
              src="/icons/import2/Ellipse 5.svg"
              width={144}
              height={144}
              className="absolute top-[36.17px] left-[-19px]"
              alt="Decorative circle"
            />
          </motion.div>

          <motion.div custom={1} variants={heroImageVariants}>
            <Image
              src="/icons/import2/icon.svg"
              width={328}
              height={249}
              className="absolute top-[90px] left-[360px]"
              alt="Book icon"
            />
          </motion.div>

          {/* <motion.div custom={0.5} variants={heroImageVariants}>
            <Image
              src="/icons/import2/vector.svg"
              width={78}
              height={88}
              className="absolute top-[156px] left-[216px]"
              alt="Decorative vector"
            />
          </motion.div> */}

          <motion.div
            custom={1.5}
            variants={heroImageVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src="/icons/import2/Read.svg"
              width={277}
              height={115}
              className="absolute top-[50px] left-[720px]"
              alt="Read text"
            />
          </motion.div>

          <motion.div
            custom={2}
            variants={heroImageVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src="/icons/import2/Borrow.svg"
              width={255}
              height={80}
              className="absolute top-[150px] left-[814px]"
              alt="Borrow text"
            />
          </motion.div>

          <motion.div
            custom={2.5}
            variants={heroImageVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src="/icons/import2/Buy.svg"
              width={103}
              height={67}
              className="absolute top-[220px] left-[762px]"
              alt="Buy text"
            />
          </motion.div>
{/* 
          <motion.div custom={0.8} variants={heroImageVariants}>
            <Image
              src="/icons/import2/vector 3.svg"
              width={229}
              height={296}
              className="absolute top-[10px] left-[1287px]"
              alt="Decorative vector"
            />
          </motion.div> */}

          <motion.div
            custom={1.2}
            variants={heroImageVariants}
            animate={{
              rotate: [0, 15, 0],
              transition: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            <Image
              src="/icons/import2/Polygon 16.svg"
              width={36.68}
              height={41.84}
              className="absolute top-[44.15px] left-[252px]"
              alt="Decorative polygon"
            />
          </motion.div>

          <motion.div
            custom={1.3}
            variants={heroImageVariants}
            animate={{
              rotate: [15, 30, 15],
              transition: {
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            <Image
              src="/icons/import2/Polygon 16.svg"
              width={36.68}
              height={41.84}
              className="absolute top-[44.15px] left-[1147px]"
              alt="Decorative polygon"
            />
          </motion.div>

          <motion.div
            custom={1.7}
            variants={heroImageVariants}
            animate={{
              scale: [1, 1.1, 1],
              transition: {
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            <Image
              src="/icons/import2/Polygon 6.svg"
              width={133.34}
              height={133.34}
              className="absolute top-[138px] left-[1397.51px]"
              alt="Decorative polygon"
            />
          </motion.div>

          <motion.div
            custom={0.9}
            variants={heroImageVariants}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            <Image
              src="/icons/import2/Polygon 11.svg"
              width={43.91}
              height={60.21}
              className="absolute top-[266px] left-[82.58px]"
              alt="Decorative polygon"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Book Sections */}
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{
                rotate: 360,
                transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            {/* New Arrivals Section */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-12">
              <motion.div variants={sectionHeaderVariants} className="flex items-center mb-6">
                <div className="h-1 w-8 bg-primary rounded mr-3"></div>
                <h2 className="text-2xl font-bold text-[#515151]">New Arrivals</h2>
              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list
                  .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="relative">
                      <motion.div
                        variants={itemVariants}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.2 },
                        }}
                        className="transform transition-all duration-300 w-fit  rounded-xl"
                      >
                        <BookModal isAdmin={false} section={item} />
                      </motion.div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>

            {/* All Books Section */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-12">
              <motion.div variants={sectionHeaderVariants} className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-1 w-8 bg-primary rounded mr-3"></div>
                <h2 className="text-2xl font-bold text-[#515151]">All Books</h2>
                </div>
                <Link href="/user/allbooks" className="text-sm text-blue-700 pr-4 justify-center flex items-center">
                  View All
                  <ArrowUpRight className="ml-1 inline " size={16} />
                </Link>
              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="relative">
                      <motion.div
                        variants={itemVariants}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.2 },
                        }}
                        className="transform transition-all duration-300 rounded-xl"
                      >
                        <BookModal isAdmin={false} section={item} />
                      </motion.div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>

            {/* Trending Section */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={sectionHeaderVariants} className="flex items-center  mb-6">

                <div className="h-1 w-8 bg-primary rounded mr-3"></div>
                <h2 className="text-2xl font-bold text-[#515151]">Trending</h2>

              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="relative">
                      <motion.div
                        variants={itemVariants}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.2 },
                        }}
                        className="transform transition-all duration-300  rounded-xl"
                      >
                        <BookModal isAdmin={false} section={item} />
                      </motion.div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page


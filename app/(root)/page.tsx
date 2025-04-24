'use client';

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Book, BookOpen, ChevronRight, Library } from 'lucide-react';

export default function LandingPage() {
  const words = [
    {
      text: "Discover",
    },
    {
      text: "Your",
    },
    {
      text: "Next",
    },
    {
      text: "Great",
    },
    {
      text: "Read.   ",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bookRef.current) {
        const scrollY = window.scrollY;
        bookRef.current.style.transform = `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 opacity-70"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 opacity-70"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-700/30 opacity-70"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-blue-500 rounded-lg text-white">
              <Library className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              LibraryHub
            </span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href='/admin' 
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                Admin
              </Link>
            </motion.div>
            
            <SignedOut>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href='/user' 
                  className="px-5 py-2 border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                >
                  Login
                </Link>
              </motion.div>
            </SignedOut>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left column - Text content */}
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <TypewriterEffectSmooth words={words} />
            </div>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-lg max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Uncover captivating stories, enriching knowledge and endless
              inspiration in our curated collection of books.
            </motion.p>
            
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => { window.location.href='/user' }}
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-8 py-3 rounded-lg overflow-hidden shadow-xl shadow-blue-500/20"
              >
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity: 0.2 }}
                />
              </button>
            </motion.div>

            {/* Book categories */}
            <motion.div 
              className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              {['Fiction', 'Science', 'History'].map((category, index) => (
                <motion.div 
                  key={category}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  whileHover={{ scale: 1.05, color: "#3b82f6" }}
                >
                  <Book className="w-4 h-4" />
                  <span>{category}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right column - Image */}
          <div className="relative flex justify-center">
            <motion.div
              ref={bookRef}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1,
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              <Image
                src="/icons/import/Reading book 1.png"
                width={500}
                height={500}
                alt="Person reading a book"
                className="rounded-lg shadow-2xl"
                priority
              />
              
              {/* Floating book elements */}
              <motion.div 
                className="absolute -top-10 -right-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                <BookOpen className="w-10 h-10 text-blue-500" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-5 -left-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              >
                <div className="text-sm font-medium">Over 10,000+ Books</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Stats section */}
      <motion.section 
        className="bg-white dark:bg-gray-800 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Books" },
              { value: "5K+", label: "Members" },
              { value: "500+", label: "Authors" },
              { value: "50+", label: "Categories" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl font-bold text-blue-500">{stat.value}</span>
                <span className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

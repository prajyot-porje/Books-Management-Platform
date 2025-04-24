"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        },
      )
    }
  }, [isInView])

  const renderWords = () => {
    return (
      <div className={cn("inline", className)}>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{
                    opacity: 0,
                    display: "none",
                  }}
                  key={`char-${index}`}
                  className={cn("", word.className)}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={scope} className="inline">
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500", cursorClassName)}
      ></motion.span>
    </div>
  )
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      let delay = 0
      wordsArray.forEach((word, wordIndex) => {
        word.text.forEach((_, charIndex) => {
          animate(
            `#word-${wordIndex}-char-${charIndex}`,
            {
              opacity: 1,
              y: 0,
            },
            {
              duration: 0.2,
              delay: delay,
              ease: "easeInOut",
            },
          )
          delay += 0.05
        })
        delay += 0.1
      })
    }
  }, [isInView])

  const renderWords = () => {
    return (
      <div className={cn("inline", className)}>
        {wordsArray.map((word, wordIndex) => {
          return (
            <div key={`word-${wordIndex}`} className="inline-block mr-2.5">
              {word.text.map((char, charIndex) => (
                <motion.span
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  id={`word-${wordIndex}-char-${charIndex}`}
                  key={`word-${wordIndex}-char-${charIndex}`}
                  className={cn("inline-block", word.className)}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={scope} className="inline-flex">
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("inline-block ml-1 rounded-sm w-[6px] h-12 bg-blue-500", cursorClassName)}
      ></motion.span>
    </div>
  )
}


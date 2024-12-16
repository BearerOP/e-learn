import { useState, useEffect, useCallback } from 'react'

export function useCarousel(itemsCount: number, autoScrollInterval = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount)
  }, [itemsCount])

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemsCount) % itemsCount)
  }, [itemsCount])

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoScroll = useCallback(() => {
    setIsAutoScrolling((prev) => !prev)
  }, [])

  useEffect(() => {
    if (isAutoScrolling) {
      const interval = setInterval(next, autoScrollInterval)
      return () => clearInterval(interval)
    }
  }, [isAutoScrolling, next, autoScrollInterval])

  return { currentIndex, next, prev, goTo, isAutoScrolling, toggleAutoScroll }
}


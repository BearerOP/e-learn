// src/contexts/TabContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react'

type CourseCategory = 'purchased' | 'wishlist' | 'cart' | 'archived' | 'learning-tools'

interface TabContextType {
  activeTab: CourseCategory
  setActiveTab: (tab: CourseCategory) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<CourseCategory>('purchased')

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}

export const useTabContext = (): TabContextType => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider')
  }
  return context
}

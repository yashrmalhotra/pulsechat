"use client"
import React, { ReactNode } from 'react'
import SocketContextProvider from '../context/SocketContextProvider'

const SocketWrapper:React.FC<{children:ReactNode}> = ({children}) => {
  return (
    <SocketContextProvider>
        {children}
    </SocketContextProvider>
  )
}

export default SocketWrapper
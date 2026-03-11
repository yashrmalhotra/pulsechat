import React from 'react'
import ProtectedRouter from '../Components/ProtectedRouter'
import Settings from '../Components/Settings'
import { Metadata } from 'next'

const page = () => {
  return (
    <ProtectedRouter>
        <Settings/>
    </ProtectedRouter>
  )
}
export const metadata:Metadata = {
    title:"PulseChat - Settings"
}

export default page
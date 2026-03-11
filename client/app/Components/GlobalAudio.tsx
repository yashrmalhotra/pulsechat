"use client"
import { useEffect, useRef } from 'react'
import { useSocket } from '../context/SocketContextProvider'

const GlobalAudio = () => {
    const remoteAudioRef = useRef<HTMLAudioElement | null>(null)
    const {remoteStream, localStream} = useSocket()!
    useEffect(()=>{
      if(!remoteStream) return
      if(remoteAudioRef.current){
        remoteAudioRef.current.srcObject = remoteStream
      }
    },[remoteStream])

  return (
    
       <audio ref={remoteAudioRef} autoPlay></audio>
  )
}

export default GlobalAudio
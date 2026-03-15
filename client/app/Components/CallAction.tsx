"use client"
import { useRef, useState, useEffect } from "react"
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { BsMicMuteFill } from "react-icons/bs"
import { BsMicFill } from "react-icons/bs"
import { FaVideo, FaVideoSlash } from "react-icons/fa"
import "../Call.css"
import { ImPhoneHangUp } from "react-icons/im"
import { IoCall } from "react-icons/io5"

import { useSocket } from "../context/SocketContextProvider"
import { CallActionProps } from "@/Types/type"
const CallAction: React.FC<CallActionProps> = ({
  isVideoCallDial,
  setIsVideoCall,
}) => {
  const buttonRef = useRef<HTMLElement>(null)

  const [isUnMute, setIsUnMute] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const remoteVideoAudioRef = useRef<HTMLVideoElement | null>(null)

  const {
    socket,
    recipientDetails,
    callDuration,
    room,
    endCall,
    callerDetails,
    isDialed,
    isCallAccepted,
    localStream,
    remoteStream,
    handleIncomingCallAccept,
    currentCallId,
    handleIncomingCallReject,
    callRoom
  } = useSocket()!
  const localAudioRef = useRef<HTMLVideoElement | null>(null)!
  const localVideoRef = useRef<HTMLVideoElement | null>(null)!

  useEffect(() => {
    if (callerDetails?.callType === "video" || isVideoCallDial) {
      setIsCameraOn(true)
    }
  }, [isVideoCallDial])
  useEffect(() => {
    if (!localStream) return

    const videoTrack = localStream.getVideoTracks()[0]
    if (!videoTrack) return

    videoTrack.enabled = isCameraOn
  }, [isCameraOn, localStream]) 
  useEffect(() => {
    if (!localStream) return

    const audioTrack = localStream.getAudioTracks()[0]
    if (!audioTrack) return

    audioTrack.enabled = isUnMute
  }, [isUnMute, localStream])

  useEffect(() => {
    if (localAudioRef.current && localStream) {
      localAudioRef.current.srcObject = localStream
    }

    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])
  useEffect(() => {
    const videoEl = remoteVideoAudioRef.current
    if (!videoEl || !remoteStream) return

    videoEl.srcObject = remoteStream

    videoEl.onloadedmetadata = () => {
      videoEl.play().catch(console.error)
    }
  }, [remoteStream])

  const handleHangUp = () => {
    socket.current.emit("hang-up", { room: callRoom.current, callDuration, callId:currentCallId })
    endCall()

  }
  const formatTimer = () => {
    const min = Math.floor(callDuration / 60)
    const sec = Math.floor(callDuration % 60)
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }
  const isVideoCall =
  callerDetails?.callType === "video" || isVideoCallDial ;

const isVoiceCall =
  callerDetails?.callType === "voice" || !isVideoCall || !isCallAccepted;

  return (
    <>
      
      <Box
        sx={{
          height: "100%",
          bgcolor: "#0b0010",
          display: "flex",
          position: "absolute",
          top: "0",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        { 
        (
            <div className="absolute w-full h-full top-0">
            <video
              ref={remoteVideoAudioRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <audio ref={localAudioRef} autoPlay playsInline muted></audio>
        <div className="fixed bottom-5 right-5 w-20 h-20 z-30">
          <video
            ref={localVideoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full object-cover"
          ></video>
        </div>

        {/* Caller name */}
        <Box
          sx={{
            width: {
              xs: "80%",
              sm: "20%",
            },
            position: "absolute",
            top: 5,
            height: 30,
            borderRadius: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.08)",
            textAlign: "center",
            color: "white",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {callerDetails?.callType === "video" || isVideoCallDial ? (
              <FaVideo size={18} color="#3b8132" />
            ) : (
              <IoCall size={15} color="#3b8132" />
            )}
            &nbsp;&nbsp;
            <Typography>
              {callerDetails?.callerName || recipientDetails?.name}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "80%",
              sm: "20%",
            },
            position: "absolute",
            top: 38,
            height: 30,
            borderRadius: 40,
            textAlign: "center",
            color: "white",
            gap: "4px",
          }}
        >
          {isCallAccepted ? <div>{formatTimer()}</div> : <div>Ringing...</div>}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            transform: "TranslateY(-50%)",
          }}
        >
          {(isVoiceCall) && (
            <Avatar
              sx={{ width: 64, height: 64 }}
              src={
                callerDetails?.callerAvatar ||
                recipientDetails?.avatar ||
                undefined
              }
            />
          )}
        </Box>

        {/* Call Actions */}
        <Box
          sx={{
            position: "absolute",
            width: {
              xs: "90%",
              sm: "40%",
              md: "30%",
            },
            bottom: "5px",
          }}
        >
          {isDialed || isCallAccepted ? (
            <Box
              sx={{
                width: "100%",
                height: 64,
                borderRadius: 40,
                bgcolor: "rgba(255,255,255,0.08)",
                position: "relative",
                overflow: "hidden",
                textTransform: "none",
                display: "flex",
                gap: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                justifyContent: "center",
                padding: "4px",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => setIsUnMute(!isUnMute)}
                sx={{
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  padding: 0,
                  borderRadius: "50%",
                  lineHeight: 1,
                  background: isUnMute ? "rgba(255,255,255,0.08)" : "white",
                  color: isUnMute ? "white" : "black",
                }}
              >
                {!isUnMute ? <BsMicMuteFill size={18} /> : <BsMicFill size={18} />}
              </Button>
              {isVideoCall && (
                <Button
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  sx={{
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    padding: 0,
                    borderRadius: "50%",
                    lineHeight: 1,

                    background: isCameraOn ? "white" : "rgba(255,255,255,0.08)",
                    color: isCameraOn ? "black" : "white",
                  }}
                >
                  
                  {isCameraOn ? (
                    <FaVideo size={18} />
                  ) : (
                    <FaVideoSlash size={18} />
                  )}
                </Button>
              )}
              <Button
                onClick={handleHangUp}
                sx={{
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  padding: 0,
                  borderRadius: "50%",
                  lineHeight: 1,
                  background: "red",
                  color: "white",
                }}
              >
                <ImPhoneHangUp size={18} />
              </Button>
            </Box>
          ) : (
            <>
              <Typography className="hint-text">
                Click to accept or reject
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 64,
                  borderRadius: 40,
                  bgcolor: "rgba(255,255,255,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingInline: "5px",
                  textTransform: "none",
                }}
              >
                <IconButton
                  onClick={handleIncomingCallReject}
                  sx={{
                    bgcolor: "red",
                    width: "30px",
                    height: "30px",
                    color: "white",
                    "&:hover": {
                      bgcolor: "red",
                    },
                  }}
                >
                  <IoCall />
                </IconButton>
                <IconButton
                  onClick={handleIncomingCallAccept}
                  sx={{
                    bgcolor: "green",
                    width: "30px",
                    height: "30px",
                    color: "white",
                    "&:hover": {
                      bgcolor: "green",
                    },
                  }}
                >
                  <IoCall />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  )
}
export default CallAction

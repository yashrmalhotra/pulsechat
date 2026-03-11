"use client"

import { useEffect, useState } from "react"
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Switch,
} from "@mui/material"
import { FiEdit2, FiCheck, FiX } from "react-icons/fi"
import axios, { AxiosError } from "axios"
import { useAuth } from "../context/AuthContextProvider"
export default function Settings() {
  const [editName, setEditName] = useState(false)
  const { user, setUser } = useAuth()!
  const [name, setName] = useState(user?.name)
  const [tempName, setTempName] = useState(name)
  const [username, setUsername] = useState(user?.username)
  const [tempUsername, setTempUsername] = useState(username)
  const [profilePic, setProfilePic] = useState<string | undefined>(user?.avatar)
  const [editUsername, setEditUsername] = useState(false)
  const [usernameIsLoading, setUsernameIsLoading] = useState<boolean>(false)
  const [usernameError, setUsernameError] = useState<string>("")

  const [showLastSeen, setShowLastSeen] = useState(user?.showLastSeen)
  const [showReadStatus, setShowReadStatus] = useState(user?.showReadStatus)

  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    setProfilePic(URL.createObjectURL(file))
    const formdata = new FormData()
    formdata.append("avatar", file)
    await axios.put("/api/user/upload-avatar", formdata, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
  const updateValue = async (field: string, value: string | boolean) => {
    try {
      if (field === "username") {
        setUsernameIsLoading(true)
      }
      await axios.put(
        "/api/user/setting",
        {
          email: user?.email,
          field,
          value,
        },
        { withCredentials: true },
      )
      setUser((prev) => {
        if (!prev) return prev

        return {
          ...prev,
          [field]: value,
        }
      })
      if (field === "username") {
        setUsernameError("")
        setEditUsername(false)
      }
    } catch (error: AxiosError | any) {
      if (error.response.data.message) {
        if (field === "username") {
          setUsernameError(error.response.data.message)
        }
      }
    } finally {
      if (field === "username") {
        setUsernameIsLoading(false)
      }
    }
  }
  return (
    <>
      <div className="min-h-screen w-full bg-white px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <Avatar
              src={profilePic ?? undefined}
              sx={{ width: 88, height: 88 }}
            />
            <label>
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
              />
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#cc00ff",
                  color: "#cc00ff",
                  "&:hover": {
                    background: "#cc00ff20",
                  },
                  "& .MuiTouchRipple-child": {
                    backgroundColor: "#cc00ff",
                  },
                }}
                component="span"
              >
                Change Photo
              </Button>
            </label>
          </div>

          <Divider sx={{ my: 4 }} />

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Name</p>
              {editName ? (
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:border-[#cc00ff]"
                  style={{ borderColor: "#cc00ff" }}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
              ) : (
                <p className="text-base font-medium">{name}</p>
              )}
            </div>

            <div className="flex gap-2 items-center">
              {editName ? (
                <>
                  <IconButton
                    disabled={!tempName}
                    size="small"
                    onClick={() => {
                      setName(tempName)
                      setEditName(false)
                      updateValue("name", tempName as string)
                    }}
                    sx={{
                      "&:hover": {
                        background: "#cc00ff20",
                      },
                      "&:disabled": {
                        background: "gray",
                      },
                      "& .MuiTouchRipple-child": {
                        backgroundColor: "#cc00ff",
                      },
                    }}
                  >
                    <FiCheck color={"#cc00ff"} size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setTempName(name)
                      setEditName(false)
                    }}
                    sx={{
                      color: "#000fff",
                      "&:hover": {
                        bgcolor: "#000fff20",
                      },
                      "& .MuiTouchRipple-child": {
                        backgroundColor: "#cc00ff",
                      },
                    }}
                  >
                    <FiX size={18} />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  size="small"
                  onClick={() => setEditName(true)}
                  sx={{
                    "&:hover": {
                      background: "#cc00ff20",
                    },
                    "& .MuiTouchRipple-child": {
                      backgroundColor: "#cc00ff",
                    },
                  }}
                >
                  <FiEdit2 size={18} color="#cc00ff" />
                </IconButton>
              )}
            </div>
          </div>

          <Divider sx={{ my: 3 }} />

          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Username</p>
              {editUsername ? (
                <>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:border-[#cc00ff]]"
                    style={{ borderColor: "#cc00ff" }}
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                  />
                  {usernameError && (
                    <div className="text-red-500">{usernameError}</div>
                  )}
                </>
              ) : (
                <p className="text-base font-medium">{username}</p>
              )}
            </div>

            <div className="flex gap-2 items-center">
              {editUsername ? (
                <>
                  {usernameIsLoading ? (
                    <CircularProgress size={15} />
                  ) : (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setUsername(tempUsername)

                          updateValue("username", tempUsername as string)
                        }}
                        disabled={
                          !tempUsername || !tempUsername.startsWith("@")
                        }
                        sx={{
                          "&:hover": {
                            background: "#cc00ff20",
                          },
                          "&:disabled": {
                            background: "gray",
                          },
                          "& .MuiTouchRipple-child": {
                            backgroundColor: "#cc00ff",
                          },
                        }}
                      >
                        <FiCheck color={"#cc00ff"} size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setUsername(tempUsername)
                          updateValue("username", tempUsername as string)
                        }}
                        sx={{
                          color: "#000fff",
                          "&:hover": {
                            bgcolor: "#000fff20",
                          },
                          "& .MuiTouchRipple-child": {
                            backgroundColor: "#cc00ff",
                          },
                        }}
                      >
                        <FiX size={18} />
                      </IconButton>
                    </>
                  )}
                </>
              ) : (
                <IconButton
                  size="small"
                  sx={{
                    "&:hover": {
                      background: "#cc00ff20",
                    },
                  }}
                  onClick={() => setEditUsername(true)}
                >
                  <FiEdit2 size={18} color="#cc00ff" />
                </IconButton>
              )}
            </div>
          </div>

          <Divider sx={{ my: 4 }} />

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Show Last seen</p>
            <Switch
              checked={showLastSeen}
              onChange={(e) => {
                ;(setShowLastSeen(e.target.checked),
                  updateValue("showLastSeen", e.target.checked))
              }}
              sx={{
                "& .Mui-checked": { color: "#cc00ff" },
                "& .Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#cc00ff",
                },
              }}
            />
          </div>

          <Divider sx={{ my: 2 }} />

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Show read status</p>
            <Switch
              checked={showReadStatus}
              onChange={(e) => {
                setShowReadStatus(e.target.checked)

                updateValue("showReadStatus", e.target.checked)
              }}
              sx={{
                "& .Mui-checked": { color: "#cc00ff" },
                "& .Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#cc00ff",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

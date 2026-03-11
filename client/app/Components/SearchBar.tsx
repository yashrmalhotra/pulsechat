"use client"
import React, { useState, useRef } from "react"
import {
  CircularProgress,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { SearchBarProps, UserList } from "@/Types/type"
import { IoSearch, IoClose } from "react-icons/io5"
import { BsThreeDotsVertical } from "react-icons/bs"
import Link from "next/link"
import axios from "axios"
import { useAuth } from "../context/AuthContextProvider"
const SearchBar: React.FC<SearchBarProps> = ({
  showInput,
  setShowInput,
  setIsSearchLoading,
  setUsers
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isLogoutError, setIsLogOutError] = useState<boolean>(false)
  const { setUser, setIsAuthenticated } = useAuth()!

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
     if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(async () => {
          try {
            setIsSearchLoading(true)
           const res = await axios.post(
              `/api/user/search`,
              { query: e.target.value },
              { withCredentials: true },
            )
            setUsers(res.data.users as UserList[])
            console.log(res.data)
          } catch (error:any) {
            console.log(error)
            
          }finally{
            setIsSearchLoading(false)
          }
        }, 500)
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logOut = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/auth/logout`, { withCredentials: true })
      setUser(undefined)
      setIsAuthenticated(false)
    } catch (error) {
      setIsLogOutError(true)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Dialog
        open={isLogoutError}
        onClose={() => setIsLogOutError(false)}
        slotProps={{
          paper: {
            sx: {
              width: "90%",
              padding: "30px",
            },
          },
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>
          Something went wrong!
        </Typography>
      </Dialog>
      
      {showInput ? (
        <div className="border border-[#cc00ff] rounded-xl mt-2 flex w-full">
          <input
            onChange={handleChange}
            type="text"
            className="w-full focus:outline-none px-1"
          />
         
          <IconButton
            onClick={() => setShowInput(false)}
            sx={{
              "&:hover": {
                background: "#cc00ff20",
              },
              "& .MuiTouchRipple-child": {
                            backgroundColor: "#cc00ff",
                          }
            }}
          >
            <IoClose size={25} />
          </IconButton>
        </div>
      ) : (
        <div className="flex justify-between ">
          <IconButton
            onClick={() => setShowInput(true)}
            sx={{
              "&:hover": {
                background: "#cc00ff20",
              },
              "& .MuiTouchRipple-child": {
                            backgroundColor: "#cc00ff",
                          }
              
            }}
          >
            <IoSearch size={25} />
          </IconButton>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <BsThreeDotsVertical size={25} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    width: "20ch",
                  },
                },
                list: {
                  "aria-labelledby": "long-button",
                },
              }}
            >
              <Link href="/settings">
                <MenuItem>Settings</MenuItem>
              </Link>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBar

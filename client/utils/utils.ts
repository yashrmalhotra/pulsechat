import { Chat } from "@/Types/type"
import { SetStateAction } from "react"

export const dateFormatter = (lastSeenISO: string) => {
  const lastSeen = new Date(lastSeenISO)
  const now = new Date()
  const isToday = lastSeen.toDateString() === now.toDateString()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday = lastSeen.toDateString() === yesterday.toDateString()
  const diffTime = now.getTime() - lastSeen.getTime()
  const diffDays = diffTime / (1000 * 3600 * 24)

  const time = lastSeen.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  if (isToday) {
    return `last seen today at ${time}`
  }
  if (isYesterday) {
    return `last seen yesterday at ${time}`
  }
  if (diffDays < 7) {
    const weekday = lastSeen.toLocaleDateString([], {
      weekday: "long",
    })
    return `last seen ${weekday} at ${time}`
  }
  const date = lastSeen.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  return `last seen ${date} at ${time}`
}
export const generateDateLabel = (date:string)=>{
  const messageDate = new Date(date)
  const today = new Date(Date.now())
  const isToday = messageDate.toDateString() === today.toDateString()
  if(isToday){
    return "Today"
  }
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday = yesterday.toDateString() === messageDate.toDateString()
  if(isYesterday){
    return "Yesterday"
  }
  const diffTime = today.getTime() - messageDate.getTime()
  const diffDays = diffTime / (1000*3600*24)
  if(diffDays<7){
    const weekDay = messageDate.toLocaleDateString([],{
      weekday:"long"
    })
    return weekDay
  }
  const formateDate = messageDate.toLocaleDateString([],{
    day:"2-digit",
    month:"short",
    year:"numeric"
  })
  return formateDate
}
export const groupMessageByDate = (message:any)=>{
   return message.reduce((group:Record<string,Chat[]>,msg:Chat)=>{
    const label = generateDateLabel(msg.date)
    if(!group[label]){
      group[label] = []
    }
    group[label].push(msg)
    return group

   },{})
}
import { Skeleton, Box, Button } from "@mui/material";

const  ChatListLoader = ()=> {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="flex w-full">
          <Button
            sx={{
              width: "100%",
              paddingLeft: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
            disabled
          >
            {/* Left side */}
            <Box
              sx={{
                flexShrink: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* Avatar */}
              <Skeleton variant="circular" width={40} height={40} />

              {/* Name */}
              <Skeleton variant="text" sx={{
                width:"100%"
              }} height={24} />
            </Box>

           
          </Button>
        </li>
      ))}
    </>
  );
}
export default ChatListLoader
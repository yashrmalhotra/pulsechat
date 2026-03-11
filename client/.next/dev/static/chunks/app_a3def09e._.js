(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/context/AuthContextProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const AuthContextProvider = ({ children })=>{
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [isAuthLoading, setIsAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthContextProvider.useEffect": ()=>{
            if (isAuthLoading) {
                return;
            }
            ;
            ({
                "AuthContextProvider.useEffect": async ()=>{
                    try {
                        setIsAuthLoading(true);
                        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/auth/getUser", {
                            withCredentials: true
                        });
                        setUser(res.data);
                        setIsAuthenticated(true);
                    } catch (error) {
                        setIsAuthenticated(false);
                    } finally{
                        setIsAuthLoading(false);
                    }
                }
            })["AuthContextProvider.useEffect"]();
        }
    }["AuthContextProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            setUser,
            isAuthLoading,
            setIsAuthLoading,
            isAuthenticated,
            setIsAuthenticated
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AuthContextProvider.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthContextProvider, "P/eOdq+dhd6OTEMACi1Ooi/popk=");
_c = AuthContextProvider;
const useAuth = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
};
_s1(useAuth, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const __TURBOPACK__default__export__ = AuthContextProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthContextProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/SessionWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContextProvider.tsx [app-client] (ecmascript)");
"use client";
;
;
const SessionWrapper = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/app/Components/SessionWrapper.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SessionWrapper;
const __TURBOPACK__default__export__ = SessionWrapper;
var _c;
__turbopack_context__.k.register(_c, "SessionWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/context/SocketContextProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContextProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const SocketCaontext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const SocketContextProvider = ({ children })=>{
    _s();
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const callRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const [callerDetails, setCallerDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCalling, setIsCalling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCallAccepted, setIsCallAccepted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDialed, setIsDialed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recipientDetails, setRecipientDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [callDuration, setCallDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [localStream, setLocalStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [remoteStream, setRemoteStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chatList, setChatList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recentCallList, setRecentCallList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentCallId, setCurrentCallId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isVideoCallDial, setIsVideoCallDial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [totalUnreadCount, setTotalUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalMissedCall, setTotalMissedCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const callerDetailsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const peerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isCallLogsLoading, setIsCallLogsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocketContextProvider.useEffect": ()=>{
            if (user) {
                const handleReceiveMessageMarkAsDelivered = {
                    "SocketContextProvider.useEffect.handleReceiveMessageMarkAsDelivered": (senderEmail)=>{
                        socket.current.emit("markAsDelivered", {
                            recipientEmail: user?.email,
                            senderEmail
                        });
                    }
                }["SocketContextProvider.useEffect.handleReceiveMessageMarkAsDelivered"];
                const handleNewMessageReceived = {
                    "SocketContextProvider.useEffect.handleNewMessageReceived": (newMessage)=>{
                        setChatList({
                            "SocketContextProvider.useEffect.handleNewMessageReceived": (prev)=>{
                                const idx = prev.findIndex({
                                    "SocketContextProvider.useEffect.handleNewMessageReceived.idx": (c)=>c.email === newMessage?.email
                                }["SocketContextProvider.useEffect.handleNewMessageReceived.idx"]);
                                setTotalUnreadCount({
                                    "SocketContextProvider.useEffect.handleNewMessageReceived": (prev)=>prev + 1
                                }["SocketContextProvider.useEffect.handleNewMessageReceived"]);
                                if (idx !== -1) {
                                    const updated = [
                                        ...prev
                                    ];
                                    const chat = {
                                        ...updated[idx]
                                    };
                                    chat.lastMessage = newMessage.lastMessage;
                                    chat.lastDate = newMessage.lastDate;
                                    chat.lastTime = newMessage.lastTime;
                                    chat.unreadCount = (chat.unreadCount || 0) + 1;
                                    updated.splice(idx, 1);
                                    return [
                                        chat,
                                        ...updated
                                    ];
                                }
                                const updateNewMessage = {
                                    ...newMessage,
                                    unreadCount: 1
                                };
                                return [
                                    updateNewMessage,
                                    ...prev
                                ];
                            }
                        }["SocketContextProvider.useEffect.handleNewMessageReceived"]);
                    }
                }["SocketContextProvider.useEffect.handleNewMessageReceived"];
                if (!socket.current) {
                    socket.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])("http://localhost:3001");
                }
                socket.current.emit("user-online", {
                    user: user?.username,
                    email: user?.email
                });
                socket.current.emit("bulkMarkAsDelivered", {
                    recipientEmail: user?.email
                });
                const handleIncomingCall = {
                    "SocketContextProvider.useEffect.handleIncomingCall": (callerdetails)=>{
                        socket.current.emit("join-room", {
                            room: callerdetails?.callRoom
                        });
                        callRoom.current = callerdetails.callRoom;
                        setIsCalling(true);
                        setCallerDetails(callerdetails);
                        setCurrentCallId(callerdetails.callId);
                        setRecentCallList({
                            "SocketContextProvider.useEffect.handleIncomingCall": (prev)=>{
                                const temp = [
                                    ...prev
                                ];
                                const idx = temp.findIndex({
                                    "SocketContextProvider.useEffect.handleIncomingCall.idx": (call)=>call.email === callerdetails?.callerEmail
                                }["SocketContextProvider.useEffect.handleIncomingCall.idx"]);
                                if (idx !== -1) {
                                    const updateCall = {
                                        ...temp[idx]
                                    };
                                    updateCall.latestCall.callType = callerdetails.callType;
                                    updateCall.latestCall.dateTime = callerdetails.dateTime;
                                    updateCall.latestCall.direction = updateCall.latestCall.direction !== "missed" ? "incoming" : "missed";
                                    temp.splice(idx, 1);
                                    return [
                                        updateCall,
                                        ...temp
                                    ];
                                }
                                const newCall = {
                                    _id: callerdetails?.callerId,
                                    email: callerdetails?.callerEmail,
                                    name: callerdetails?.callerName,
                                    username: callerdetails?.callerUsername,
                                    verificationStatus: callerdetails?.callerVeificationStatus,
                                    avatar: callerdetails?.callerAvatar,
                                    latestCall: {
                                        callType: callerdetails.callType,
                                        dateTime: callerdetails.dateTime,
                                        direction: "incoming"
                                    },
                                    missedCount: 0
                                };
                                return [
                                    newCall,
                                    ...prev
                                ];
                            }
                        }["SocketContextProvider.useEffect.handleIncomingCall"]);
                    }
                }["SocketContextProvider.useEffect.handleIncomingCall"];
                const handleIncomingCallAccept = {
                    "SocketContextProvider.useEffect.handleIncomingCallAccept": (answer)=>{
                        setIsCallAccepted(true);
                        if (!peerRef.current) return;
                        peerRef.current.setRemoteDescription(answer);
                        intervalRef.current = setInterval({
                            "SocketContextProvider.useEffect.handleIncomingCallAccept": ()=>{
                                setCallDuration({
                                    "SocketContextProvider.useEffect.handleIncomingCallAccept": (prev)=>prev + 1
                                }["SocketContextProvider.useEffect.handleIncomingCallAccept"]);
                            }
                        }["SocketContextProvider.useEffect.handleIncomingCallAccept"], 1000);
                    }
                }["SocketContextProvider.useEffect.handleIncomingCallAccept"];
                const handleAddIceCandidate = {
                    "SocketContextProvider.useEffect.handleAddIceCandidate": async (candidate)=>{
                        try {
                            if (!peerRef.current) return;
                            await peerRef.current.addIceCandidate(candidate);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }["SocketContextProvider.useEffect.handleAddIceCandidate"];
                const handleHangup = {
                    "SocketContextProvider.useEffect.handleHangup": ()=>{
                        if (callerDetailsRef.current?.callerEmail) {
                            setRecentCallList({
                                "SocketContextProvider.useEffect.handleHangup": (prev)=>{
                                    const temp = [
                                        ...prev
                                    ];
                                    const idx = temp.findIndex({
                                        "SocketContextProvider.useEffect.handleHangup.idx": (call)=>call.email === callerDetailsRef.current.callerEmail
                                    }["SocketContextProvider.useEffect.handleHangup.idx"]);
                                    const updateCall = {
                                        ...temp[idx]
                                    };
                                    if (callDuration <= 0) {
                                        updateCall.latestCall.direction = "missed";
                                        updateCall.missedCount = updateCall.missedCount + 1;
                                        setTotalMissedCall({
                                            "SocketContextProvider.useEffect.handleHangup": (prev)=>prev + 1
                                        }["SocketContextProvider.useEffect.handleHangup"]);
                                        temp[idx] = updateCall;
                                    }
                                    return [
                                        ...temp
                                    ];
                                }
                            }["SocketContextProvider.useEffect.handleHangup"]);
                        }
                        endCall();
                        if (intervalRef.current) {
                            clearInterval(intervalRef?.current);
                            intervalRef.current = null;
                        }
                    }
                }["SocketContextProvider.useEffect.handleHangup"];
                socket.current.on("new-message", handleNewMessageReceived);
                socket.current.on("isDelivered", handleReceiveMessageMarkAsDelivered);
                socket.current.on("incoming-call", handleIncomingCall);
                socket.current.on("accept-call", handleIncomingCallAccept);
                socket.current.on("reject-call", endCall);
                socket.current.on("ice-candidate", handleAddIceCandidate);
                socket.current.on("hang-up", handleHangup);
                return ({
                    "SocketContextProvider.useEffect": ()=>{
                        if (socket.current) {
                            socket.current.off("new-message", handleNewMessageReceived);
                            socket.current.off("isDelivered", handleReceiveMessageMarkAsDelivered);
                            socket.current.off("accept-call", handleIncomingCallAccept);
                            socket.current.off("reject-call", endCall);
                            socket.current.off("ice-candidate", handleAddIceCandidate);
                            socket.current.off("hang-up", handleHangup);
                            socket.current.off("incoming-call", handleIncomingCall);
                        }
                        if (intervalRef.current) {
                            clearInterval(intervalRef?.current);
                            intervalRef.current = null;
                        }
                        peerRef.current = null;
                    }
                })["SocketContextProvider.useEffect"];
            }
        }
    }["SocketContextProvider.useEffect"], [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocketContextProvider.useEffect": ()=>{
            callerDetailsRef.current = callerDetails;
        }
    }["SocketContextProvider.useEffect"], [
        callerDetails
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocketContextProvider.useEffect": ()=>{
            const total = recentCallList.reduce({
                "SocketContextProvider.useEffect.total": (sum, call)=>sum + (call.missedCount || 0)
            }["SocketContextProvider.useEffect.total"], 0);
            setTotalMissedCall(total);
        }
    }["SocketContextProvider.useEffect"], [
        recentCallList
    ]);
    const handleIncomingCallReject = (e)=>{
        e.stopPropagation();
        socket.current.emit("reject-call", callRoom.current, callerDetails?.callId);
        endCall();
    };
    const handleIncomingCallAccept = async ()=>{
        peerRef.current = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                }
            ]
        });
        setRecentCallList((prev)=>{
            const temp = [
                ...prev
            ];
            const idx = temp.findIndex((call)=>call.email === callerDetails?.callerEmail);
            if (idx !== -1) {
                const updateCall = {
                    ...temp[idx]
                };
                updateCall.latestCall.direction = "incoming";
                updateCall.missedCount = 0;
                temp.splice(idx, 1);
                return [
                    updateCall,
                    ...temp
                ];
            }
            return prev;
        });
        peerRef.current.ontrack = (event)=>{
            setRemoteStream(event.streams[0]);
        };
        peerRef.current.onicecandidate = (event)=>{
            if (event.candidate) {
                socket.current.emit("ice-candidate", {
                    room: callRoom.current,
                    candidate: event.candidate
                });
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: callerDetails?.callType === "video"
        });
        setLocalStream(stream);
        stream.getTracks().forEach((track)=>{
            peerRef.current.addTrack(track, stream);
        });
        await peerRef.current.setRemoteDescription(callerDetails.offer);
        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);
        socket.current.emit("accept-call", {
            room: callRoom.current,
            answer,
            callId: callerDetails?.callId
        });
        setIsCallAccepted(true);
    };
    const endCall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SocketContextProvider.useCallback[endCall]": ()=>{
            if (peerRef.current) {
                peerRef.current.getSenders().forEach({
                    "SocketContextProvider.useCallback[endCall]": (sender)=>{
                        if (sender.track) {
                            sender.track.stop();
                        }
                    }
                }["SocketContextProvider.useCallback[endCall]"]);
                peerRef.current.ontrack = null;
                peerRef.current.onicecandidate = null;
                peerRef.current.close();
                peerRef.current = null;
                setRemoteStream(null);
                setLocalStream(null);
                setCurrentCallId("");
            }
            setIsCalling(false);
            setIsCallAccepted(false);
            setIsDialed(false);
            setCallDuration(0);
            setCallerDetails(null);
        }
    }["SocketContextProvider.useCallback[endCall]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocketCaontext.Provider, {
        value: {
            socket,
            callDuration,
            isDialed,
            callerDetails,
            isCalling,
            room,
            callRoom,
            recipientDetails,
            setIsDialed,
            setRecipientDetails,
            setIsCalling,
            isCallAccepted,
            handleIncomingCallAccept,
            handleIncomingCallReject,
            localStream,
            setLocalStream,
            remoteStream,
            setRemoteStream,
            chatList,
            totalUnreadCount,
            setTotalUnreadCount,
            setChatList,
            recentCallList,
            isVideoCallDial,
            setIsVideoCallDial,
            setRecentCallList,
            peerRef,
            currentCallId,
            setCurrentCallId,
            endCall,
            totalMissedCall,
            setTotalMissedCall,
            isCallLogsLoading,
            setIsCallLogsLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/SocketContextProvider.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SocketContextProvider, "SAGbCiK/cMcGoe2R8D7MYf3ZuvI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = SocketContextProvider;
const useSocket = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SocketCaontext);
};
_s1(useSocket, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const __TURBOPACK__default__export__ = SocketContextProvider;
var _c;
__turbopack_context__.k.register(_c, "SocketContextProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/SocketWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/SocketContextProvider.tsx [app-client] (ecmascript)");
"use client";
;
;
const SocketWrapper = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/app/Components/SocketWrapper.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SocketWrapper;
const __TURBOPACK__default__export__ = SocketWrapper;
var _c;
__turbopack_context__.k.register(_c, "SocketWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/IncomingCallPopup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/SocketContextProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io5/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const IncomingCallPopup = ()=>{
    _s();
    const { isCalling, recipientDetails, callRoom, isDialed, currentCallId, isCallAccepted, callerDetails, room, callDuration, endCall, socket, handleIncomingCallAccept, handleIncomingCallReject } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const formatTimer = ()=>{
        const min = Math.floor(callDuration / 60);
        const sec = Math.floor(callDuration % 60);
        return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };
    const handleHangUp = ()=>{
        socket.current.emit("hang-up", {
            room: callRoom.current,
            callDuration,
            callId: currentCallId
        });
        endCall();
    };
    return isCalling && !pathname.startsWith("/chat") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>router.push(`chat/${callerDetails?.callerUsername || recipientDetails?.username}`),
        className: "fixed z-10 top-0 bg-green-500 w-full min-h-7 p-1 text-white flex justify-around items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: isCallAccepted ? handleHangUp : handleIncomingCallReject,
                sx: {
                    background: "red",
                    width: "30px",
                    color: "white",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                        bgcolor: "red"
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoCall"], {}, void 0, false, {
                    fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center",
                children: [
                    callerDetails?.callType === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaVideo"], {}, void 0, false, {
                        fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                        lineNumber: 70,
                        columnNumber: 50
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaMicrophone"], {}, void 0, false, {
                        fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                        lineNumber: 70,
                        columnNumber: 64
                    }, ("TURBOPACK compile-time value", void 0)),
                    "  ",
                    callerDetails?.callerName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            callerDetails?.callerName,
                            " ",
                            !isCallAccepted ? "is calling..." : formatTimer()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                        lineNumber: 73,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            !isCallAccepted && "Dialing to",
                            " ",
                            recipientDetails?.name,
                            " ",
                            isCallAccepted && formatTimer()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                        lineNumber: 78,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !isDialed && !isCallAccepted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: handleIncomingCallAccept,
                sx: {
                    background: "green",
                    width: "30px",
                    color: "white",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                        bgcolor: "green"
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IoCall"], {}, void 0, false, {
                    fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                    lineNumber: 100,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/Components/IncomingCallPopup.tsx",
                lineNumber: 85,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/Components/IncomingCallPopup.tsx",
        lineNumber: 44,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
_s(IncomingCallPopup, "C45ExlwkNMs9GvS0aeG5BcYXJp4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = IncomingCallPopup;
const __TURBOPACK__default__export__ = IncomingCallPopup;
var _c;
__turbopack_context__.k.register(_c, "IncomingCallPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/Components/GlobalAudio.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/SocketContextProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const GlobalAudio = ()=>{
    _s();
    const remoteAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { remoteStream, localStream } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalAudio.useEffect": ()=>{
            if (!remoteStream) return;
            if (remoteAudioRef.current) {
                remoteAudioRef.current.srcObject = remoteStream;
            }
        }
    }["GlobalAudio.useEffect"], [
        remoteStream
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
        ref: remoteAudioRef,
        autoPlay: true
    }, void 0, false, {
        fileName: "[project]/app/Components/GlobalAudio.tsx",
        lineNumber: 17,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GlobalAudio, "2nANKXil9zXoGPHg/kK0b5PRhj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$SocketContextProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = GlobalAudio;
const __TURBOPACK__default__export__ = GlobalAudio;
var _c;
__turbopack_context__.k.register(_c, "GlobalAudio");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_a3def09e._.js.map
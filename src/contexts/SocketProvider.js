import React, { useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider(userId) {
    const [socket, setSocket] = useState();
    useEffect(() => {
        const newSocket = io('ws://localhost:3000',
            { query: { userId } })
        setSocket(newSocket);
        return () => newSocket.close();
    }, [userId])

    return (
        <SocketContext.Provider value={socket}>

        </SocketContext.Provider>
    )
}
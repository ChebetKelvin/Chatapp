import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Use environment variable for backend URL
    const socketClient = io(import.meta.env.VITE_API_URL, {
      transports: ["websocket"], // ensures stable connection on Render
    });

    setSocket(socketClient);

    return () => socketClient.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

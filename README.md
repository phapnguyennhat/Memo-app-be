# Hướng dẫn dùng socket cho tính năng nhắn tin ở phía FE (react)

- hiện tài swagger không hỗ trợ viết docs cho socket, nên docs socket cho tính năng nhắn tin sẽ được hướng dẫn tại đây

## 1. Tạo socket state ở scope global cho dễ quản lí

```
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketMessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.BACKEND_URL}/message`, { withCredentials: true });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketMessage = () => {
  return useContext(SocketContext);
};
```

- chú ý các thư viện manage state (Redux) không hỗ trợ lưu dữ liệu có kiểu Socket nên recommend dùng context

## 2 Sử dụng socketMessage ở các component khác

```
const socketMessage = useSocketMessage
```

### 2.1 Gửi tin nhắn

- Cần truyền body {receiverId: string, content: string}

```
const sendMessage(body: {receiverId: string, content: stringg}) =>{
  if(socketMessage){
    socketMessage.emit('send-message', body)
  }
}
```

### 2.2 Nhận tin nhắn (listen message từ người dùng khác gửi đến)

    useEffect(() => {
    	if (!socketMessage) return;
    	socket.on('receive-message', handleReceiveMessage);
    	return () => {
    		socket.off('receive-message', handleReceiveActionUser);

    	};
    }, [socket]);

    const handleReceiveMessage(message: Message) =>{
      // handle message  - notify receiver
    }

- message nhận về có thông tin của người gửi, người nhận và content luôn

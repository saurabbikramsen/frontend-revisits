import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function Chat() {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const bottomRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const getTargetUser = async () => {
    if (targetUser) return;
    try {
      const response = await axios.get(
        `${BASE_URL}/connection/user/${targetUserId}`,
        {
          withCredentials: true,
        },
      );
      setTargetUser(response.data.data);
      console.log("response: ", response);
    } catch (err) {
      console.log(err);
    }
  };

  const getChats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      console.log("chat response: ", response.data.data.messages);
      const chatMessages = response.data.data.messages.map((chat) => {
        return {
          name: chat.senderId.firstName + " " + chat.senderId.lastName,
          text: chat.text,
          userIdentifier: chat.senderId._id,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTargetUser();
    getChats();
  }, []);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    // create socket once
    socketRef.current = createSocketConnection();

    // join chat room
    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // receive message
    socketRef.current.on(
      "messageReceived",
      ({ firstName, text, userIdentifier }) => {
        setMessages((prev) => [
          ...prev,
          { name: `${user.firstName} ${user.lastName}`, text, userIdentifier },
        ]);
      },
    );

    // cleanup
    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId, user?.firstName]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      <div className="flex flex-col border border-gray-300 w-3/4">
        <h1 className="text-2xl font-bold text-center p-5">
          Chat with {targetUser?.firstName + " " + targetUser?.lastName}
        </h1>

        {/* messages */}
        <div className="flex flex-col gap-4 overflow-y-scroll h-150 p-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.userIdentifier === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header">
                {message.name}
                <time className="text-xs opacity-50 ml-2">just now</time>
              </div>

              <div
                className={`chat-bubble ${
                  message.userIdentifier === userId ? "chat-bubble-primary" : ""
                } max-w-xs`}
              >
                {message.text}
              </div>

              <div className="chat-footer opacity-50">Seen</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div className="flex gap-3 p-5 border-t">
          <input
            className="input input-bordered w-full"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

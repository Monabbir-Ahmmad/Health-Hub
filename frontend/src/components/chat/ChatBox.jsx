import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import ChatItem from "./ChatItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  height: 70vh;
  padding: 1rem 2rem;

  ::-webkit-scrollbar {
    background-color: transparent;
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-track:hover {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #f4f4f4;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
`;

function ChatBox({ messageList, user, chatWith }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Container>
      {messageList.map((msg, index) => (
        <ChatItem
          message={{
            ...msg,
            isReceived: msg.senderId !== user.id,
            sender: msg.senderId !== user.id ? chatWith.name : "Me",
            senderPic:
              msg.senderId !== user.id
                ? chatWith.profileImage
                : user.profileImage,
          }}
          key={index}
        />
      ))}

      <div ref={messagesEndRef} />
    </Container>
  );
}

export default ChatBox;

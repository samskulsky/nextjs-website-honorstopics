"use client";

import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, signOut as signOutFromFirebase } from "firebase/auth";
import { db, auth, googleAuthProvider } from "./firebaseClient";

export default function Home() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  const [lastSentMessage, setLastSentMessage] = useState("");
  const [lastSentMessageTime, setLastSentMessageTime] = useState(0);
  const [messageSending, setMessageSending] = useState(false); // Add a state variable to control message sending

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const chatInputRef = useRef(null);

  // Declare scrollToBottom function here
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Use the scrollToBottom function
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (chatInputRef.current) {
        const windowHeight = window.innerHeight;
        const inputBottom = chatInputRef.current.getBoundingClientRect().bottom;
        const heightDiff = windowHeight - inputBottom;

        setIsKeyboardOpen(heightDiff < 0);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (messages.length > prevMessageCount) {
      scrollToBottom();
      setPrevMessageCount(messages.length);
    }
  }, [messages, prevMessageCount]);

  useEffect(() => {
    const handleResize = () => {
      if (chatInputRef.current) {
        const windowHeight = window.innerHeight;
        const inputBottom = chatInputRef.current.getBoundingClientRect().bottom;
        const heightDiff = windowHeight - inputBottom;

        setIsKeyboardOpen(heightDiff < 0);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signOut = () => {
    signOutFromFirebase(auth);
  };

  const sendJoinMessage = async () => {
    const displayName = user.displayName;
    const joinMessage = `${displayName} has joined.`;

    const messagesCollection = collection(db, "messages");

    await addDoc(messagesCollection, {
      text: joinMessage,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: "System",
    });
  };

  const sendSystemMessage = async (text) => {
    // Get the last message
    const lastMessage = messages[messages.length - 1];

    // Check if the last message has the same text as the new system message
    if (lastMessage && lastMessage.text === text) {
      return; // Do not send the system message if it's the same as the last one
    }

    const messagesCollection = collection(db, "messages");
    const messageId = uuidv4();
    const messageDocRef = doc(messagesCollection, messageId);

    try {
      await setDoc(messageDocRef, {
        text,
        createdAt: serverTimestamp(),
        id: messageId,
        uid: null,
        displayName: "System",
        heartUsers: [],
      });
    } catch (error) {
      console.error("Error adding system message document:", error);
    }
  };

  const sendMessage = async () => {
    if (message.trim().length === 0 || messageSending) return; // Check if a message is already being sent

    setMessageSending(true); // Set messageSending to true

    const messagesCollection = collection(db, "messages");
    const messageId = uuidv4();
    const messageDocRef = doc(messagesCollection, messageId);

    try {
      await setDoc(messageDocRef, {
        text: message,
        createdAt: serverTimestamp(),
        id: messageId,
        uid: user.uid,
        displayName: user.displayName,
      });
    } catch (error) {
      console.error("Error adding message document:", error);
    }

    setMessage("");
    setTimeout(() => {
      setMessageSending(false); // After 500 milliseconds, set messageSending back to false
    }, 500);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const toggleReaction = async (reactionType, index) => {
    if (!user) {
      return;
    }

    const message = messages[index];

    if (!message || !message.id) {
      console.error("Invalid message or message ID:", message);
      return;
    }

    const messageId = message.id;
    const userId = user.uid;

    const reactionUsers = message[`${reactionType}Users`] || [];

    if (reactionUsers.includes(userId)) {
      const updatedReactionUsers = reactionUsers.filter((id) => id !== userId);

      try {
        await updateDoc(doc(db, "messages", messageId), {
          [`${reactionType}Users`]: updatedReactionUsers,
        });
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      const updatedReactionUsers = [...reactionUsers, userId];

      try {
        await updateDoc(doc(db, "messages", messageId), {
          [`${reactionType}Users`]: updatedReactionUsers,
        });
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={signOut} className="signout-button">
            Sign out
          </button>

          <div className="messages">
            {messages.map((msg, index) => {
              if (msg.text.startsWith(":") || msg.uid === null) {
                return (
                  <div
                    className={`message ${msg.uid ? "" : "system-message"}`}
                    key={msg.id}
                  >
                    {" "}
                    <div className="timestamp">{msg.createdAt}</div>
                    <div className="text2">{msg.text}</div>
                  </div>
                );
              }
              return (
                <div
                  className={`message ${msg.uid ? "" : "system-message"}`}
                  key={msg.id}
                >
                  {" "}
                  <div className="timestamp">{msg.createdAt}</div>
                  <div className="username">{msg.displayName}</div>
                  <div className="text">{msg.text}</div>
                  <div className="reactions">
                    <button
                      className={`reaction-button heart-button ${
                        msg.heartUsers && msg.heartUsers.includes(user.uid)
                          ? "clicked"
                          : ""
                      }`}
                      onClick={() => toggleReaction("heart", index)}
                    >
                      ❤️ {msg.heartUsers ? msg.heartUsers.length : 0}
                    </button>
                    <button
                      className={`reaction-button like-button ${
                        msg.likeUsers && msg.likeUsers.includes(user.uid)
                          ? "clicked"
                          : ""
                      }`}
                      onClick={() => toggleReaction("like", index)}
                    >
                      👍 {msg.likeUsers ? msg.likeUsers.length : 0}
                    </button>
                    <button
                      className={`reaction-button dislike-button ${
                        msg.dislikeUsers && msg.dislikeUsers.includes(user.uid)
                          ? "clicked"
                          : ""
                      }`}
                      onClick={() => toggleReaction("dislike", index)}
                    >
                      👎 {msg.dislikeUsers ? msg.dislikeUsers.length : 0}
                    </button>
                    <button
                      className={`reaction-button laugh-button ${
                        msg.laughUsers && msg.laughUsers.includes(user.uid)
                          ? "clicked"
                          : ""
                      }`}
                      onClick={() => toggleReaction("laugh", index)}
                    >
                      😂 {msg.laughUsers ? msg.laughUsers.length : 0}
                    </button>
                    <button
                      className={`reaction-button shit-button ${
                        msg.shitUsers && msg.shitUsers.includes(user.uid)
                          ? "clicked"
                          : ""
                      }`}
                      onClick={() => toggleReaction("shit", index)}
                    >
                      💩 {msg.shitUsers ? msg.shitUsers.length : 0}
                    </button>
                    <button
                      className={`reaction-button potato-button ${
                        msg.potatoUsers && msg.potatoUsers.includes(user.uid)
                          ? "clicked"
                          : ""
                      }`}
                      onClick={() => toggleReaction("potato", index)}
                    >
                      🥔 {msg.potatoUsers ? msg.potatoUsers.length : 0}
                    </button>
                    <button
                      className={`reaction-button stonehenge-button ${
                        msg.stoneHengeUsers &&
                        msg.stoneHengeUsers.includes(user.uid)
                          ? "clicked"
                          : ""
                      }`}
                      onClick={() => toggleReaction("stoneHenge", index)}
                    >
                      🗿 {msg.stoneHengeUsers ? msg.stoneHengeUsers.length : 0}
                    </button>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="input-container">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

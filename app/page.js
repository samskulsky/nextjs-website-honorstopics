"use client";

import { useEffect, useState, useRef } from "react";
import { db, auth, googleAuthProvider } from "./firebaseClient";
import { signInWithPopup, signOut as signOutFromFirebase } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (auth) {
      // Authentication listener
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);

          const messagesCollection = collection(db, "messages");
          const q = query(messagesCollection, orderBy("createdAt"));

          // Listen for new messages
          const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(
              snapshot.docs.map((doc) => {
                const data = doc.data();
                // Format the timestamp
                const createdAt = data.createdAt
                  ? data.createdAt.toDate().toLocaleString()
                  : "";
                return { ...data, createdAt };
              })
            );
          });

          // Cleanup the listener on component unmount
          return () => unsubscribe();
        } else {
          setUser(null);
        }
      });
    }
  }, [auth]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

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

  const sendMessage = async () => {
    if (message.trim().length === 0) return;

    const messagesCollection = collection(db, "messages");

    await addDoc(messagesCollection, {
      text: message,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
    });

    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
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
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <div className="timestamp">{msg.createdAt}</div>
                <div className="username">{msg.displayName}</div>
                <div className="text">{msg.text}</div>
              </div>
            ))}
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

import { Avatar, IconButton } from "@material-ui/core";
import {
    AttachFile,
    EmojiEmotionsOutlined,
    MicOutlined,
    MoreVert,
    SearchOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./Chat.css";
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            message: input,
            name: "Kamrul",
            timestamp: "just now",
            received: false,
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h2>Room name</h2>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p
                        className={`chat__message ${
                            message.received && "chat__receiver"
                        }`}
                    >
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <EmojiEmotionsOutlined />
                <form action="">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a msg"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send
                    </button>
                </form>
                <MicOutlined />
            </div>
        </div>
    );
}

export default Chat;

import { Avatar, IconButton } from "@material-ui/core";
import {
    AttachFile,
    EmojiEmotionsOutlined,
    MicOutlined,
    MoreVert,
    SearchOutlined,
} from "@material-ui/icons";
import React from "react";
import "./Chat.css";

function Chat({ messages }) {
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
                    <input type="text" placeholder="Type a msg" />
                    <button type="submit">Send</button>
                </form>
                <MicOutlined />
            </div>
        </div>
    );
}

export default Chat;

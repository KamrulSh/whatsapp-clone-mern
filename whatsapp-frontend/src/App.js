import { useEffect } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";

function App() {
    useEffect(() => {
        const pusher = new Pusher("ff330c23b99e82b5fc06", {
            cluster: "mt1",
        });

        const channel = pusher.subscribe("messages");
        channel.bind("inserted", function (data) {
            alert(JSON.stringify(data));
        });
    }, []);

    return (
        <div className="app">
            <div className="app__body">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default App;

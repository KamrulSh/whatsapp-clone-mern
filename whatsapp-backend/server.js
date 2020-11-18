import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1109074",
    key: "ff330c23b99e82b5fc06",
    secret: "a3ca1c1809c2aa1aa432",
    cluster: "mt1",
    useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors());
/* replaced with cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "*");
    next();
});
*/
// DB config
const connection_url =
    "mongodb+srv://admin:3CPOWZJKipvfKalV@cluster0.uyzdt.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change) => {
        console.log(change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});

// ????

// api routes
app.get("/", (req, res) => {
    res.status(200).send("hello");
});
// post messages to monogodb
app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});
// get messages from monogodb
app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// listen
app.listen(port, () => console.log(`Listening ${port}`));

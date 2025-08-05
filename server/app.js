const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");


const app = express();
const PORT = 1857;

app.use(cors());
app.use(express.json())

// MongoDB
const DB_URL = "mongodb+srv://ahmedHussain:5yqcJnjXzdBZKfSM@practicecluster.0sztwfi.mongodb.net/?retryWrites=true&w=majority&appName=practiceCluster"

const client = new MongoClient(DB_URL);
let database;
let complains;
let users;

async function connect() {
    try {
        await client.connect();
        database = client.db("complaint_mangement");
        complaints = database.collection("complaints");
        users = database.collection("users");
        console.log("Connected to MongodDB");
    } catch (err) {
        console.log("Error connecting: ", err);
    }
    // finally {
    //     await client.close();
    // }
}

connect();

// // create new book
// async function createBook(book) {
//     try {
//         const insertResult = await booksCollection.insertOne(book);
//         console.log("Inserted book: ", insertResult);
//     } catch (err) {
//         console.log("Error creating book: ", err);
//     }
// }

// async function getAllBooks() {
//     try {
//         const books = await booksCollection.find({}).toArray();
//         console.log("All books: ", books);
//         return books;
//     } catch (err) {
//         console.error(err);
//     }
// }
// // Read specific book
// async function getBookByTitle(title) {
//     try {
//         const book = await booksCollection.findOne({ title });
//         console.log("Found specific book:", book);
//         return book;
//     } catch (error) {
//         console.error("Error finding book:", error);
//     }
// }



app.get("/", async (req, res) => {
    const comp = await complaints.find({}).toArray();

    res.send(comp);
});

app.post("/", async (req, res) => {
    const body = req.body;
    console.log(body);

    const insertResult = await complaints.insertOne(body);
    console.log("Inserted book: ", insertResult);

    res.send("got it");
});

app.post("/login", async (req, res) => {
    const { userId, pass } = req.body;
    console.log(userId, pass);
    let user; 

    try {
         user = await users.findOne({
            userId: userId,
            password: pass
        })

        console.log(user);
    } catch (error) {
        user = null; 
    }




    
    if (user) {
        res.send(user);
    }
    else {
        user = {role: null}
        res.status(401).send(user)
    }



});

// app.get("/asb/:id", (req, res) => {
// {id} = req.params});   






app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);

})
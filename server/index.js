var express = require("express");
const db = require("./initial_data/initialData.json");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
    origin: "http://localhost:3004",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let userToken = "";

let contacts = [
    {
        id: 1,
        name: "Alex",
        lastname: "Smith",
    },
    {
        id: 2,
        name: "John",
        lastname: "Doe",
    },
];
let countId = 2;

const generateId = () => {
    return (countId += 1);
};

app.post("/api/user1", (req, res) => {
    const { user1 } = db;

    const { email, password } = req.body;
    if (user1.email === email) {
        if (user1.password === password) {
            const userProps = user1.email + user1.password;
            const token = generateToken(userProps);
            userToken = token;
            res.cookie("user_token", token).status(200).json(token);
        } else {
            res.status(403).json("Wrong password. Try again.");
        }
    } else {
        res.status(403).json("Email not found. Try again.");
    }
});

app.post("/api/user/auth", (req, res) => {
    const { token } = req.body;
    token === userToken && res.status(200).json("isAuth");
});

app.get("/api/user1/contacts", (req, res) => {
    res.status(200).json(contacts);
});

app.post("/api/user1/editContact", (req, res) => {
    const { id, name, lastname } = req.body;
    const newContacts = contacts.map((contact) => {
        if (contact.id === id) {
            return (contact = {
                id,
                name,
                lastname,
            });
        } else {
            return contact;
        }
    });
    contacts = newContacts;
    res.status(200).json(contacts);
});

app.post("/api/user1/deleteContact", (req, res) => {
    const { id } = req.body;
    const filteredContact = contacts.filter((contact) => {
        if (contact.id !== parseInt(id)) {
            return contact;
        }
    });
    contacts = filteredContact;
    res.status(200).json(contacts);
});

app.post("/api/user1/addContact", (req, res) => {
    const { name, lastname } = req.body.contact;
    const id = generateId();
    const newContact = {
        id,
        name,
        lastname,
    };
    contacts.push(newContact);
    if (contacts.length) {
        res.status(200).json(contacts);
    } else {
        res.status(403).json("You have no any contacts.");
    }
});

const generateToken = (userProps) => {
    return jwt.sign(userProps, process.env.SECRET);
};

const port = 3006;
app.listen(port, () => {
    console.log(`Server runnig at ${port}`);
});

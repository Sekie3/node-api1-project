const express = require('express');
const usersDb = require('./users/model');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

// POST - Create a new user
server.post('/api/users', async (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        return res.status(400).json({ message: "Please provide name and bio for the user" });
    }

    try {
        const newUser = await usersDb.insert({ name, bio });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "There was an error while saving the user to the database" });
    }
});

// GET - Return all users
server.get('/api/users', async (req, res) => {
    try {
        const users = await usersDb.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "The users information could not be retrieved" });
    }
});

// GET - Return a single user by id
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await usersDb.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: "The user information could not be retrieved" });
    }
});

// DELETE - Remove a user by id
server.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await usersDb.remove(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: "The user could not be removed" });
    }
});

// PUT - Update a user by id
server.put('/api/users/:id', async (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        return res.status(400).json({ message: "Please provide name and bio for the user" });
    }

    try {
        const updatedUser = await usersDb.update(req.params.id, { name, bio });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: "The user information could not be modified" });
    }
});

module.exports = server;

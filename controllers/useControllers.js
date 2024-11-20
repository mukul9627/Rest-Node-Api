const users = require('../MOCK_DATA.json')
const fs = require('fs')

// controllers/userController.js
// let users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
// ];

// GET: Retrieve all users
const getUsers = (req, res) => {
    res.json(users);
};


// GET: Retrieve a specific user by ID
const getUsersId = (req, res) => {
    const userId = parseInt(req.params.id); // Parse the `id` from the URL

    const user = users.find(u => u.id === userId); // Find the user in the array
    if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Handle user not found
    }
    res.json(user); // Return the user
};


// POST: Add a new user
// const createUser =  (req, res) => {
//     const { first_name, last_name, email, gender, job_title } = req.body;

//     // Validate the request body
//     if (!first_name || !last_name || !email || !gender || !job_title) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     const newUser = {
//         id: users.length + 1, // Generate a new ID
//         first_name,
//         last_name,
//         email,
//         gender,
//         job_title
//     };

//     users.push(newUser); // Add the new user to the array

//     // Write to the MOCK_DATA.json file
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             console.error('Error writing to file:', err);
//             return res.status(500).json({ error: 'Failed to save user' });
//         }

//         // Respond with the newly created user
//         res.status(201).json(newUser);
//     });
// };

const createOrUpdateUser = (req, res) => {
    const { id, first_name, last_name, email, gender, job_title } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !gender || !job_title) {
        return res.status(400).json({ error: "All fields are required except 'id' for new users" });
    }

    if (id) {
        // Handle PUT (Update) logic
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ error: 'User not found for update' });
        }

        // Update only the provided fields
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;
        if (gender) user.gender = gender;
        if (job_title) user.job_title = job_title;

        // Save the updated users array to the file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ error: 'Failed to update user' });
            }

            res.status(200).json({ message: 'User updated successfully', user });
        });
    } else {
        // Handle POST (Create) logic
        const newUser = {
            id: users.length + 1, // Generate a new ID
            first_name,
            last_name,
            email,
            gender,
            job_title
        };

        users.push(newUser); // Add the new user to the array

        // Write to the MOCK_DATA.json file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ error: 'Failed to save user' });
            }

            res.status(201).json({ message: 'User created successfully', user: newUser });
        });
    }
};


// DELETE: Remove a user
// const deleteUser = (req, res) => {
//     const userId = parseInt(req.params.id);
//     users = users.filter(u => u.id !== userId);
//     res.status(204).send();
// };
const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);

    // Check if the user exists
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Remove the user from the array
    const deletedUser = users.splice(userIndex, 1);

    // Save the updated array to MOCK_DATA.json
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        }

        // Respond with the deleted user
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser[0] });
    });
};


// Export the functions
module.exports = { getUsers,getUsersId ,createOrUpdateUser, deleteUser };

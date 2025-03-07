const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt
const User = require('../models/User.model'); // Import your User model
const { sendNewPasswordEmail } = require('./sendPassword'); // Import the Brevo email function

const handleCreate = (Model, req, res) => {
    const newData = { ...req.body, user: req.payload._id };
    Model.create(newData)
        .then(newItem => {
            res.status(201).json(newItem);
        })
        .catch(err => {
            console.error(`Error creating ${Model.modelName}:`, err);
            res.status(500).json({ message: `Error creating ${Model.modelName}`, error: err.message });
        });
};

const handleGetAll = (Model, req, res, populateOptions = '') => {
    const isAdmin = req.payload.roles.includes("admin");

    const query = isAdmin ? Model.find({ user: req.payload._id }) : Model.find({ user: req.payload._id });

    if (populateOptions) {
        query.populate(populateOptions);
    }

    query.then(items => {
        res.status(200).json(items);
    })
        .catch(err => {
            console.error(`Error retrieving ${Model.modelName}s:`, err);
            res.status(500).json({ message: `Error retrieving ${Model.modelName}s`, error: err.message });
        });
};

const handleGetAllUserAdmin = (Model, req, res, populateOptions = '') => {
    const isAdmin = req.payload.roles.includes("admin") || req.payload.roles.includes("user");
    const query = isAdmin ? Model.find() : Model.find({ _id: req.payload._id });

    if (populateOptions) {
        query.populate(populateOptions);
    }

    query.then(items => {
        res.status(200).json(items);
    })
        .catch(err => {
            console.error(`Error retrieving ${Model.modelName}s:`, err);
            res.status(500).json({ message: `Error retrieving ${Model.modelName}s`, error: err.message });
        });
};
const handleGetOne = (Model, req, res, populateOptions = '') => {
    Model.findById(req.params.id)
        .populate(populateOptions)
        .then(item => {
            if (!item) return res.status(404).json({ message: `${Model.modelName} not found` });

            if (item.user && item.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
                return res.status(403).json({ message: "Forbidden" });
            }

            res.status(200).json(item);
        })
        .catch(err => {
            console.error(`Error retrieving ${Model.modelName}:`, err);
            res.status(500).json({ message: `Error retrieving ${Model.modelName}`, error: err.message });
        });
};

const handleUpdate = (Model, req, res) => {
    console.log("Updating user with ID:", req.params.id);
    console.log("Update data:", req.body);

    Model.findById(req.params.id)
        .then(async item => { // Make sure the callback function is async
            if (!item) return res.status(404).json({ message: `${Model.modelName} not found` });

            if (item.user && item.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
                return res.status(403).json({ message: "Forbidden" });
            }

            let updateData = req.body; // Copy the request body

            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    updateData.password = hashedPassword; // Replace the plain text password with the hashed password
                } catch (hashError) {
                    console.error("Error hashing password:", hashError);
                    return res.status(500).json({ message: "Error hashing password", error: hashError.message });
                }
            }

            return Model.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }); // Added runValidators
        })
        .then(updatedItem => {
            console.log("User updated successfully:", updatedItem);
            res.status(200).json(updatedItem);
        })
        .catch(err => {
            console.error(`Error updating ${Model.modelName}:`, err);
            res.status(500).json({ message: `Error updating ${Model.modelName}`, error: err.message });
        });
};

const handleResetPassword = async (req, res) => {
    console.log("handleResetPassword called!");
    const userId = req.params.id;
    console.log("userId:", userId);

    try {
        // 1. Generate a random password
        const newPassword = Math.random().toString(36).slice(-8); // Example
        console.log("newPassword:", newPassword);

        // 2. Hash the new password
        const salt = await bcrypt.genSalt(10);
        console.log("salt:", salt);

        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log("hashedPassword:", hashedPassword);

        // 3. Find the user and update the password
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true, runValidators: true }
        );
        console.log("updatedUser:", updatedUser); // Log what comes back!

        if (!updatedUser) {
            console.log("User not found!");
            return res.status(404).json({ message: "User not found" });
        }

        // 4. Send an email to the user (replace with your email logic)
        try {
            await sendNewPasswordEmail(updatedUser.email, newPassword); // Await the email sending
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // It's important to decide how to handle email sending failures.
            // You might want to log the error, retry sending the email later,
            // or inform the admin.
            return res.status(500).json({ message: "Password reset, but failed to send email.", error: emailError.message });
        }

        // 5. Respond to the client
        res.status(200).json({ message: "Password reset successfully.  Email sent to user." });

    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Error resetting password", error: error.message });
    }
};

const handleDelete = (Model, req, res) => {
    Model.findById(req.params.id)
        .then(item => {
            if (!item) return res.status(404).json({ message: `${Model.modelName} not found` });

            if (item.user && item.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
                return res.status(403).json({ message: "Forbidden" });
            }

            return Model.findByIdAndDelete(req.params.id);
        })
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            console.error(`Error deleting ${Model.modelName}:`, err);
            res.status(500).json({ message: `Error deleting ${Model.modelName}`, error: err.message });
        });
};

module.exports = { handleCreate, handleGetAll, handleGetOne, handleUpdate, handleDelete, handleGetAllUserAdmin, handleResetPassword };
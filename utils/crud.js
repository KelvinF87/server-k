// utils/crud.js  (Create a new file for these utility functions)
const mongoose = require('mongoose');

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

  const query = isAdmin ? Model.find() : Model.find({ user: req.payload._id });

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
  const isUser = req.payload.roles.includes("user") || req.payload.roles.includes("admin");

  const query = isUser ? Model.find() : Model.find({ user: req.payload._id });

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
  Model.findById(req.params.id)
    .then(item => {
      if (!item) return res.status(404).json({ message: `${Model.modelName} not found` });

      if (item.user && item.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Added runValidators
    })
    .then(updatedItem => {
      res.status(200).json(updatedItem);
    })
    .catch(err => {
      console.error(`Error updating ${Model.modelName}:`, err);
      res.status(500).json({ message: `Error updating ${Model.modelName}`, error: err.message });
    });
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

module.exports = { handleCreate, handleGetAll, handleGetOne, handleUpdate, handleDelete,handleGetAllUserAdmin };
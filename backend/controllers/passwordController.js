const Password = require('../models/passwordModel');


const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ isDeleted: false });
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getByType = async (req, res) => {
  try {
    const { type } = req.params;
    const entries = await Password.find({ type, isDeleted: false });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createPassword = async (req, res) => {
  try {
    const newPassword = await Password.create(req.body);
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updatePassword = async (req, res) => {
  try {
    const updated = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deletePassword = async (req, res) => {
  try {
    await Password.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.status(200).json({ message: 'Password deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDeletedPasswords = async (req, res) => {
  try {
    const deletedPasswords = await Password.find({ isDeleted: true });
    res.status(200).json(deletedPasswords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const restorePassword = async (req, res) => {
  try {
    const restored = await Password.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    res.status(200).json(restored);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const permanentlyDeletePassword = async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Password permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPasswords, getByType, createPassword, updatePassword, deletePassword, getDeletedPasswords, restorePassword, permanentlyDeletePassword };
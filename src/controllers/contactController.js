import asyncHandler from "express-async-handler";
import Contact from "../models/contacts.models.js";

// @access Public
// Get All Contacts
// GET method
const getContacts = asyncHandler(async (req, res) => {
    const allContacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(allContacts); // Use status 200 for successful retrieval
});

// @access Public
// Get Contact by ID
// GET method
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact); // Use status 200 for successful retrieval
});

// @access Public
// Create Contact
// POST method
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email) {
        res.status(400);
        throw new Error("Name and email are required fields");
    }

    const newContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(newContact); // Return the created contact
});

// @access Public
// Update Contact
// PUT method
const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("User doesn't have access to update another record");
    };
    
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
        { new: true } // Return the updated document
    );

    res.status(200).json(updatedContact); // Use status 200 for successful update
});

// @access Public
// Delete Contact
// DELETE method
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("deleting");
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("User doesn't have access to delete another record");
    };
    console.log("deleting1");
    await Contact.findByIdAndDelete(id); // Delete the contact
    console.log("deleting2");
    
    res.status(200).json({ message: `Contact with ID ${id} deleted successfully` });
    console.log("deleting3");
});

export { getContacts, getContact, createContact, updateContact, deleteContact };

import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => {
  return ContactCollection.find();
};

export const getContactById = (id) => {
  return ContactCollection.findById(id);
};
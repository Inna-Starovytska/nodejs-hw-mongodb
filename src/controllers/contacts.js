import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';
// import mongoose from "mongoose";


export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
 const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const { _id: userId } = req.user;
  const filter = parseFilterParams(req.query);
  filter.userId = userId;

  const contacts = await contactServices.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    // userId: req.user._id,
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await contactServices.getContactById(contactId, userId);

  if (!contact) {
    return next(createHttpError(404, "Contact not found"));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
export const createContactsController = async (req, res) => {
  
  const { _id: userId } = req.user;
  let photo = null;

  if (req.file) {
     photo = await saveFileToCloudinary(req.file, 'photo');
  }
  const contact = await contactServices.createContact({ ...req.body, photo, userId });
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
   const { contactId } = req.params;
  const userId = req.user._id;

  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updatedContact(contactId, {
    ...req.body,
    photo: photoUrl,
    userId
  });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });


  const updatedContact = await contactServices.updateContact(contactId, req.body);

  if (!updatedContact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id: _id } = req.params;
  const contact = await contactServices.deleteContact({ _id });
  if (!contact) {
    next(createHttpError(404, "Contact not found"));
  }
  res.status(204).send();
};
import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';


export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const filter = parseFilterParams(req.query);
    const { _id: userId } = req.user;
      filter.userId = userId;
   

    const contacts = await contactServices.getContacts({ page, perPage, sortBy, sortOrder, filter }); 
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });  
};


export const getContactsByIdController = async (req, res) => {
    const { contactId  } = req.params;
    const userId = req.user._id;
    const contact = await contactServices.getContactById(contactId, userId );

        if (!contact) {
            throw createHttpError(404, `Contact not found`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
    

};

export const addContactsController = async (req, res) => {
         const { _id: userId } = req.user;
    const contact = await contactServices.addContact({ ...req.body, userId });

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data:contact,
    });
};

export const upsertContactsController = async (req, res,next) => {
    const { contactId } = req.params;
  const userId = req.user._id;

    const updatedContact = await contactServices.updateContact(contactId, req.body, userId);
     if (!updatedContact) {
    return next(createHttpError(404, "Contact not found"));
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
    
    // const status = result.isNew ? 201 : 200;
    // res.status(status).json({
    //     status,
    //     message: "Successfully created a contact!",
    //     data:result.data,
    // });
};


export const deleteContactsController = async (req, res) => {
     const { contactId } = req.params;
    const contact = await contactServices.deleteContact(contactId, req.user.id);
    if (!contact) {
        throw createHttpError(404, `Contact not found`);
    };
    res.status(204).send();
};


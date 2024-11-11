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
    console.log(filter);

    const data = await contactServices.getContacts({ page, perPage, sortBy, sortOrder, filter });
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });  
};


export const getContactsByIdController = async (req, res) => {
        const { id } = req.params;
    const data = await contactServices.getContactById(id);

        if (!data) {
            throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data,
    });
    

};

export const addContactsController = async (req, res) => {
    const data = await contactServices.addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const upsertContactsController = async (req, res) => {
    const { id: _id } = req.params;

    const result  = await contactServices.updateContact({
        _id, payload: req.body, options: {
            upsert: true
        }
    });
    const status = result.isNew ? 201 : 200;
    res.status(status).json({
        status,
        message: "Successfully created a contact!",
        data:result.data,
    });
};
export const patchContactsController = async (req, res) => {
    const { id: _id } = req.params;
    const result = await contactServices.updateContact({ _id, payload: req.body });
    
    if (!result) {
       throw createHttpError(404, 'Contact not found');
    }
    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.data,
    });
};

export const deleteContactsController = async (req, res) => {
    const { id: _id } = req.params;
    const data = await contactServices.deleteContact({ _id });
    if (!data) {
        throw createHttpError(404, `Contact not found`);
    };
    res.status(204).send();
};


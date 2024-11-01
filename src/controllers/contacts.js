import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';


export const getContactsController = async (req, res, next) => {
  
        const data = await contactServices.getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });  
};


export const getContactsByIdController = async (req, res,) => {
   
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
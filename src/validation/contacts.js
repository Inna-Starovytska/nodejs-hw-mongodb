import Joi from "joi";
import { typeList } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required(),
    contactType: Joi.string().valid(...typeList),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    contactType: Joi.string().valid(...typeList),
});
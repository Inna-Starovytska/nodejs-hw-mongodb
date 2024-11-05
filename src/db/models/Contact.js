import { Schema, model } from 'mongoose';

import { typeList } from '../../constants/contacts.js';


const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      required: true,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
      required: true,
    },
  },
  {
    versionKey: false, timestamps: true,
  },
);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
import ContactCollection from '../db/models/Contact.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", filter ={} }) => {
  const skip = (page - 1) * perPage;
  const query = ContactCollection.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
if (filter.contactType) query.where("contactType").equals(filter.contactType);
if (filter.isFavourite) query.where("isFavourite").equals(filter.isFavourite);
  
  const data = await query;
  const totalItems = await ContactCollection.find().merge(query).countDocuments();
  const paginationData = calculatePaginationData({ totalItems, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (id) => {  return ContactCollection.findById(id);
};

export const addContact = payload => {  return ContactCollection.create(payload);
};
export const updateContact = async ({ _id, payload, options = {} }) => {
  const rawResult = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    includeResultMetadata: true,

  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted)
  };
};

export const deleteContact = async filter => ContactCollection.findOneAndDelete(filter);
  
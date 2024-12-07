import ContactCollection from '../db/models/Contact.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 1,
  sortBy = "_id",
  sortOrder = "asc",
  filter = {}
}) => {

  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  
  if (filter.contactType) {
    contactsQuery.where("contactType").equals(filter.contactType);
  };
  if (filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  };
  if (filter.userId) {
    contactsQuery.where("userId").equals(filter.userId);
  };
  
  const [totalItems, data] = await Promise.all([
    ContactCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  
  const paginationData = calculatePaginationData({ totalItems, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};


// export const updateContact = async (contactId, contact, userId) => {
//   return await ContactCollection.findOneAndUpdate({ _id: contactId, userId },
//     contact,
//     { new: true },);
// };

export const updateContact = async ({ _id, photo, payload, options = {} }) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: _id },
    {
      $set: { ...payload, photo },
    },
    {
      ...options,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};


export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
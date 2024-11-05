import { Router } from "express";
import * as contactsControllers from "../controllers/contacts.js";

import ctrlWrapper  from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema } from "../validation/contacts.js";
import { contactUpdateSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController ));
    
contactsRouter.get('/:id', ctrlWrapper(contactsControllers.getContactsByIdController));

contactsRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(contactsControllers.addContactsController));

contactsRouter.put("/:id", validateBody(contactAddSchema), ctrlWrapper(contactsControllers.upsertContactsController));

contactsRouter.patch("/:id", validateBody(contactUpdateSchema), ctrlWrapper(contactsControllers.patchContactsController));

contactsRouter.delete("/:id", ctrlWrapper(contactsControllers.deleteContactsController));



export default contactsRouter;
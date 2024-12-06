import { Router } from "express";
import * as contactsControllers from "../controllers/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

import { ctrlWrapper }  from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { contactAddSchema } from "../validation/contacts.js";
import { contactUpdateSchema } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

import { upload } from '../middlewares/upload.js';

const contactsRouter = Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController ));
    
contactsRouter.get('/:contactId', isValidId, ctrlWrapper(contactsControllers.getContactsByIdController));

contactsRouter.post("/", upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactsControllers.addContactsController));

contactsRouter.put("/:contactId", upload.single('photo'), isValidId, validateBody(contactAddSchema), ctrlWrapper(contactsControllers.upsertContactsController));

contactsRouter.patch("/:contactId", upload.single('photo'), isValidId, validateBody(contactUpdateSchema), ctrlWrapper(contactsControllers.patchContactController));

contactsRouter.delete("/:contactId",  isValidId, ctrlWrapper(contactsControllers.deleteContactsController));



export default contactsRouter;
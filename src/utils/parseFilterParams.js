const parseContactType = (type) => {
  
    if (typeof type !== "string") {
        return undefined;
    };
    const contactTypes = ["work", "home", "personal"];

    const isContactType = contactTypes.includes(type);
    return isContactType ? type : undefined;
};

const parseIsFavourite = (value) => {
 if (typeof value !== "string") {
    return undefined;
    };
    if (value === 'true') {
        return true;
    };
    if (value === 'false') {
        return false;
    };

  return undefined;
};


export const parseFilterParams = ({ type, isFavourite }) => {
    const parsedContactType = parseContactType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        ContactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
    
};
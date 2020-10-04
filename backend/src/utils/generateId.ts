import storage from "../storage";

/**
 * Simple function to generate unique number id for a entry in storage
 */
const generateId = (storageKey: keyof typeof storage): number => {
  const storageAttr = storage[storageKey];
  if (Array.isArray(storageAttr)) {
    if (storageAttr.length) {
      return (storageAttr[storageAttr.length - 1].id as number) + 1;
    } else {
      return 1;
    }
  }
  // Is object
  else {
    let id = 1;
    for (const val of Object.values(storageAttr)) {
      if (val.id >= id) {
        id = val.id + 1;
      }
    }
    return id;
  }
};

export default generateId;

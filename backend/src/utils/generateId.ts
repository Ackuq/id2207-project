import storage from "../storage";

const generateId = (storageKey: keyof typeof storage): number => {
  if (storage[storageKey].length) {
    return (
      (storage[storageKey][storage[storageKey].length - 1].id as number) + 1
    );
  } else {
    return 1;
  }
};

export default generateId;

// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");


import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = (fieldName) => {
  return multer({ storage }).single(fieldName);
};
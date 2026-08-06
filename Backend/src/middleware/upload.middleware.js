// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/users");
//   },

//   filename(req, file, cb) {
//     const ext = path.extname(file.originalname);

//     cb(
//       null,
//       `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
//     );
//   },
// });

// export const uploadUserPhoto = multer({
//   storage,
// });

import multer from "multer";
import path from "path";
import fs from "fs";


const uploadDir = path.join(process.cwd(), "uploads", "users");
console.log("Upload directory:", uploadDir);
console.log("Exists:", fs.existsSync(uploadDir));

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    );
  },
});

export const uploadUserPhoto = multer({ storage });
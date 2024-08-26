const express = require("express");
const authMiddelware = require("../middlewares/authMiddleware");
const {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteRecordController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router object
const router = express.Router();

//Routes

//GET - DONAR LIST
router.get(
  "/donar-list",
  authMiddelware,
  adminMiddleware,
  getDonarsListController
);
//GET - HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);
//GET - ORG LIST
router.get("/org-list", authMiddelware, adminMiddleware, getOrgListController);

/* ------------------------------------------------------------------------------- */

//  GET - DELETE RECORD
router.delete(
  "/delete-record/:id",
  authMiddelware,
  adminMiddleware,
  deleteRecordController
);

//EXPORT
module.exports = router;

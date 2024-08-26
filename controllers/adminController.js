const User = require("../models/userModels");

//GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await User.find({ role: "donar" }).sort({
      createdAt: -1,
    });

    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In DOnar List API",
      error,
    });
  }
};

//GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await User.find({ role: "hospital" }).sort({
      createdAt: -1,
    });

    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};

//GET ORG LIST
const getOrgListController = async (req, res) => {
  try {
    const orgData = await User.find({ role: "organisation" }).sort({
      createdAt: -1,
    });

    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};

/* ------------------------------------------------------------------------------- */

// DELETE RECORD BY ADMIN
const deleteRecordController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

//EXPORT
module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteRecordController,
};

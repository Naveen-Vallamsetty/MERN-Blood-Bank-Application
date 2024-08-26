const User = require("../models/userModels");
const Inventory = require("../models/inventoryModel");
const mongoose = require("mongoose");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    // validation
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar accounr");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // calculate Blood Quantity
      const totalInOfRequestedBlood = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      // calculate Out Blood Quantity
      const totalOutOfRequestedBlood = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total Out", totalOutOfRequestedBlood);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

      // in & out calculation
      const availableQuantityofBloogGroup = totalIn - totalOut;

      // quantity validation
      if (availableQuantityofBloogGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    // save record
    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      organisation: req.body.userId,
    })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get all inventory",
      error,
    });
  }
};

// GET Hospital BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await Inventory.find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get consumer inventory",
      error,
    });
  }
};

// Get Recent 3 Blood Records
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      organisation: req.body.userId,
    })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// Get Donar Records

const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    // find donars
    const donarId = await Inventory.distinct("donar", {
      organisation,
    });
    // console.log(donarId);
    const donars = await User.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

// Get Hospital records
const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    // Get Hospital ID
    const hospitalId = await Inventory.distinct("hospital", { organisation });
    // Find Hospital
    const hospitals = await User.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting Hospital API",
    });
  }
};

// Get Org records
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const organisationId = await Inventory.distinct("organisation", { donar });
    // find org
    const organisations = await User.find({ _id: { $in: organisationId } });
    return res.status(200).send({
      success: true,
      message: "Organisation Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Org. API",
      error,
    });
  }
};

// Get Org for Hospitals
const getOrganisationForHospitalsController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const organisationId = await Inventory.distinct("organisation", {
      hospital,
    });
    // find org
    const organisations = await User.find({ _id: { $in: organisationId } });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital - Org. API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getInventoryHospitalController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalsController,
  getRecentInventoryController,
};

const createError = require("http-errors");
const mongoose = require("mongoose");

const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res) => {
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
      throw createError(400, `No data found. Wilders not created...`);
    }

    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();

    if (!result) throw createError(404, `Wilder not created...`);
    res.json({ success: true, result });
  },

  readAll: async (req, res) => {
    const result = await WilderModel.find();
    if (!result) throw createError(404, `Wilders not found...`);
    res.json({ success: true, result: result });
  },

  read: async (req, res) => {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw createError(400, `Wilder not found, wrong id...`);

    const result = await WilderModel.findById(id);
    if (!result) throw createError(404, `Wilder not found, wrong id...`);
    res.json({ success: true, result: result });
  },

  update: async (req, res) => {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw createError(400, `Wilder not updated, wrong id...`);
    
    const result = await WilderModel.findByIdAndUpdate(id, req.body);
    if (!result) throw createError(404, `Wilder not updated, wrong id...`);

    res.json({ success: true, result: result });
  },

  delete: async (req, res) => {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw createError(400, `Wilder not deleted, wrong id...`);

    const result = await WilderModel.findByIdAndDelete(id);
    if (!result) throw createError(404, `Wilder not deleted, wrong id...`);

    res.json({ success: true, result: result });
  },
};

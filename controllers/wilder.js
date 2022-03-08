const WilderModel = require("../models/Wilder");

module.exports = {
  create: (req, res) => {
    WilderModel.init().then(() => {
      const wilder = new WilderModel(req.body);
      wilder
        .save()
        .then((result) => {
          res.json({ success: true, result: result });
        })
        .catch((err) => {
          res.json({ success: false, result: err });
        });
    });
  },

  readAll: (req, res) => {
    WilderModel.find()
      .then((result) => {
        if (!result) {
          res.json({ success: false, result: "No wilders found" });
        }
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },

  read: (req, res) => {
    WilderModel.findById(req.params.id)
      .then((result) => {
        if (!result) {
          res.json({ success: false, result: "No wilders found" });
        }
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
  update: (req, res) => {
    WilderModel.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
      WilderModel.updateOne()
  },

  delete: (req, res) => {
    WilderModel.findByIdAndDelete(req.params.id)
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
};

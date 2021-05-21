const express = require('express');

const router = express.Router();

const { uploadImageFile } = require("../middlewares/uploadImage");

const {
    getAllSchedules,
    addSchedule
} = require("../controller/schedule");

router.get("/schedules", getAllSchedules);
router.post("/schedule", uploadImageFile("image", false), addSchedule )

module.exports = router;
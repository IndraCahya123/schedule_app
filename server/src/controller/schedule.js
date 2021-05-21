const Joi = require('joi');

const { Schedule } = require('../../models');

exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        let modifiedResponse = [];

        for (let i = 0; i < schedules.length; i++) {
            modifiedResponse.push({
                ...schedules[i].dataValues,
                image: process.env.IMG_URL + schedules[i].image
            })
        }

        res.send({
            status: "Success",
            message: "Success to get schedule data",
            schedules : modifiedResponse
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Server Error",
            message: "Sorry, there's error in our server",
            error: error
        });
    }
}

exports.addSchedule = async (req, res) => {
    try {
        if (!req.files) 
            return res.status(400).send({
                status: "Failed to add new product",
                message: "Please choose an image for your product",
            });
        
        //validate user input
        const schemaProductInput = Joi.object({
            title: Joi.string().min(4).max(100).required(),
            location: Joi.string().min(4).required(),
            participants: Joi.string().min(3).required(),
            date: Joi.date().required(),
            note: Joi.string().min(50).required(),
            image: Joi.binary()
        });

        const { error } = schemaProductInput.validate(req.body);

        if (error)
        return res.status(400).send({
            status: "There's error in your data input",
            message: error.details[0].message,
        });

        const addSchedule = await Schedule.create({
            ...req.body,
            image: req.files.image[0].filename
        });

        res.send({
            status: "success",
            message: "New Schedule Added",
            data: {
                schedule: {
                    ...addSchedule.dataValues
                }
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Server Error",
            message: "Sorry, there's error in our server",
            error: error
        });
    }
}
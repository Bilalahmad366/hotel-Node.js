const express = require('express');
const router = express.Router();
const Person = require('../models/person');

//add record
router.post('/', async (req, res) => {
    const data = req.body;

    try {
        const newPerson = new Person(data);
        // Save the person to MongoDB
        const response = await newPerson.save();
        console.log("data saved")
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" });
    }
});

//get data
router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log("data fetched")
        res.status(200).json(data)

    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" });
    }
});

//update record
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatepersondata = req.body;
        const response = await Person.findByIdAndUpdate(personId,updatepersondata,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.json(404).json({ err: "person not found" })
        }
        console.log("data updated")
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" });
    }
});


//delete record
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)

        if(!response){
            return res.json(404).json({ err: "person not found" })
        }
        console.log("data deleted")
        res.status(200).json({message: 'person deleted successfully'})

    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" });
    }
});

module.exports=router
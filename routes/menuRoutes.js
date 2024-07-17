const express = require('express');
const router = express.Router();
const menu = require('../models/menu');


//add record
router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const newmenu = new menu(data);
        // Save the person to MongoDB
        const response = await newmenu.save();
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
        const data = await menu.find()
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
        const menuId = req.params.id;
        const updatemenudata = req.body;
        const response = await menu.findByIdAndUpdate(menuId,updatemenudata,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.json(404).json({ err: "menu not found" })
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
        const menuId = req.params.id;
        const response = await menu.findByIdAndDelete(menuId)

        if(!response){
            return res.json(404).json({ err: "menu not found" })
        }
        console.log("data deleted")
        res.status(200).json({message: 'menu deleted successfully'})

    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" });
    }
});

module.exports=router
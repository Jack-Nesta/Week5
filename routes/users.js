const express = require('express');
const userModel = require ('./../models/users');
const router = express.Router();
module.exports = router;

//CRUD operations
//Create
router.post('/', async function (req, res) {
    //console.log(req.body);
    const data = new userModel({
        email:req.body.email,//email is an object
        password:req.body.password,
        firstName:req.body.firstName,
        secondName:req.body.secondName,
    });
    try {
        const savedData = await data.save();//. gives access to Mongodb methods, equivalent to db.users.insertOne
        res.status(200).json(savedData);

    } catch (error) {

    res.status(400).json({message: error.message});//error is an object, and in that object is an error key
    }
});
//Read
router.get('/', async function (req, res) {
    try {
        const data = await userModel.find();
        res.status(200).json(data)

    } catch (error) {

    res.status(400).json({message: error.message});
    }
});
//Update crud operations
router.patch('/:id', async function (req, res) { //takes an id
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedData = await userModel.findByIdAndUpdate(id, data);
        res.status(200).json(updatedData)

    } catch (error) {

    res.status(400).json({message: error.message});
    }
});
//Delete
router.delete('/:id', async function (req, res) { 
    try {
        const id = req.params.id;
       //const data = req.body; we don't need the data
        const deletedData = await userModel.findByIdAndDelete(id);
        res.status(200).json(deletedData)

    } catch (error) {

    res.status(400).json({message: error.message});
    }
});

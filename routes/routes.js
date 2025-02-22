const express = require('express');
const router = express.Router();
const { users, news, projects, messages } = require('../models/model');

function randomString() {
    const randomStringOneLiner = Math.random().toString(36).substr(2, 10);
    console.log(randomStringOneLiner);
    return randomStringOneLiner
}
function randomDecision(probability) {
    // Ensure probability is between 0 and 100
    if (probability < 0 || probability > 100) {
        throw new Error("Probability must be a number between 0 and 100.");
    }
    
    // Generate a random number between 0 and 100
    const randomNum = Math.random() * 100;
    
    // Return "Accepted" if the random number is less than the probability, otherwise "Rejected"
    return randomNum < probability ? "Accepted" : "Rejected";
}

// endpoint for logging in
router.post('/checkUser', async (req, res) => {
    console.log("userdetails: ", req.body)
    let usernamelog = req.body.username
    let passwordlog = req.body.password
    // let typelog = req.body.type //type indicates whether it is student or counsellor logging in 

    // let log = login(usernamelog, passwordlog, typelog)
    // console.log("login is", log)
    // res.send(log) //frontend will check if it's a valid cookie
    // // res.send("done")
    console.log("user data is",await users.find()) //debugging
    selectedUser = await users.findOne({
        email:usernamelog,
        password:passwordlog
    })
    // add selectedUser.id later. It may cause server errors if null
    console.log("user selected", await selectedUser)

    if (selectedUser != null) {
        let cookie = randomString()
        // update the document with the cookie
        selectedUser.usercookie = cookie
        console.log("selected user", selectedUser)
        selectedUser.save()
        let userdetails = {
            valid: true,
            admin: selectedUser.admin,
            usercookie: cookie
        }
        res.status(200).send(userdetails)
    }
    else {
        let userdetails = {
            valid: false
        }
        res.status(200).send(userdetails)
    } 

})

// endpoint for registering a new user
router.post('/post', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await users.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new users({
            id: newId,
            email: req.body.email,
            password: req.body.password,
            fullname: req.body.fullname,
            admin: false,
            usercookie: "None"
        });

        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// endpoint for adding a new news
router.post('/postNews', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await news.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new news({
            id: newId,
            image: req.body.image,
            headlines: req.body.headlines,
            body: req.body.body
        });

        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all news, every single one
router.get('/getNews', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await news.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// endpoint for adding a new project
router.post('/postProjects', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await projects.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new projects({
            id: newId,
            image: req.body.image,
            headlines: req.body.headlines,
            body: req.body.body,
            author: req.body.author,
            projectLink: req.body.projectLink
        });

        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all projects, every single one
router.get('/getProjects', async (req, res) => {
    // res.send('Get All API')
    try{
        const data = await projects.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// endpoint for sending a message
router.post('/sendMessage', async (req, res) => {
    try {
        // Fetch the last document
        const lastRecord = await messages.findOne().sort({ id: -1 });

        // Determine the new id
        const newId = lastRecord ? lastRecord.id + 1 : 1;

        // Create a new document
        const data = new messages({
            id: newId,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            message: req.body.message
        });

        // Save the new document
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





module.exports = router;
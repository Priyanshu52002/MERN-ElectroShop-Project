const express =require("express");
const Subscriber=require("../models/subscriberModel.js");

const router = express.Router();

router.post('/', async (req, res) => {
    const email = req.body.email;

    try {
        const newSubscriber = await new Subscriber({email});
        if(newSubscriber){
            return res.status(201).send(newSubscriber);
        }
        else{
            return  res.status(500).send("Failed to save the Subscriber");
        }
    } catch (error) {
        res.status(400).send('Error subscribing: ' + error.message);
    }

});



module.exports=router;
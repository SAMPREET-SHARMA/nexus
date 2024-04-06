import mongoose from "mongoose";
import express from "express";
import { Retail,Quantity, CurLogOrders, Logistics } from "../db";
import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/auth"
import { authenticateJwt } from "../middleware/auth";
const router = express.Router();

router.post("/request", authenticateJwt, async (req, res) => {
    const orderDetails = {
        Macbook:req.body.macPrice,
        HpOmen:req.body.omenPrice,
        AsusROG:req.body.rogPrice,
        Predator:req.body.predator,
        MSITitan:req.body.titanprice,        
    }

    const orderQuantity = new Quantity(orderDetails)
    orderQuantity.save()
    
    const updateRetail = await Retail.findOneAndUpdate({username:req.body.username},{order:orderDetails},{new:true});

    updateRetail.History.push(orderDetails);
    updateRetail.save()

    CurLogOrders.orders.push(orderQuantity)
    Logistics.History.push(orderQuantity)

    res.send("Request sent successfully")
});


router.get("/orders",authenticateJwt,async (req,res)=>{
    const order = await Retail.findOne({username:req.username})
    if(!order){
        res.status(403).send("User not found")
        return
    }
    res.json({
        username:order.username,
        order:order.receivedQuantity
    })
})

router.post("/pastOrders",authenticateJwt,async(req,res)=>{
    const orders = await Retail.findOne({username:req.username})
    res.json({orders : orders.History})
})

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(retail) {

        if (retail) {
            res.status(403).json({ message: 'Admin already exists' });
        }
        else {
            const obj = { username: username, password: password };
            const newLogistics = new retail(obj);
            newLogistics.save();

            const token = jwt.sign({ username, retail }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Retail created successfully', token });
        }

    }
    Retail.findOne({ username }).then(callback);
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.headers;
    const Retail = await Retail.findOne({ username, password });
    if (Retail) {
        const token = jwt.sign({ username, Retail }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});


export { router };
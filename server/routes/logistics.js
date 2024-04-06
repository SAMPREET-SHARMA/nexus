import mongoose from "mongoose";
import express from "express";
import { Logistics,CurLogOrders, Quantity } from "../db";
import jwt  from "jsonwebtoken";
import { SECRET } from "../middleware/auth"
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

const total = CurLogOrders[0].totalQuantity  + CurLogOrders[1].totalQuantity;
const capa = CurLogOrders[0].capacity;

const mac1 = CurLogOrders[0].Macbook;
const pred1 = CurLogOrders[0].Predator;
const asus1 = CurLogOrders[0].AsusROG;
const hp1 = CurLogOrders[0].HpOmen;
const titan1 = CurLogOrders[0].MSITitan;

const mac2 = CurLogOrders[1].Macbook;
const pred2 = CurLogOrders[1].Predator;
const asus2 = CurLogOrders[1].AsusROG;
const hp2 = CurLogOrders[1].HpOmen;
const titan2 = CurLogOrders[1].MSITitan;

const r0 = (CurLogOrders[0].totalQuantity / total);
const r1 = (CurLogOrders[1].totalQuantity / total);
const ra0 = Math.floor(r0*capa).floor();
const ra1 = Math.floor(r1*capa)

const ma1 = Math.floor(((CurLogOrders[0].Macbook / CurLogOrders[0].capacity))*ra0)
const pre1 = Math.floor (((CurLogOrders[0].Predator / CurLogOrders[0].capacity))*ra0)
const asu1 = Math.floor (((CurLogOrders[0].AsusROG / CurLogOrders[0].capacity))*ra0)
const h1 = Math.floor(((CurLogOrders[0].HpOmen / CurLogOrders[0].capacity))*ra0)
const tita1 = Math.floor(((CurLogOrders[0].MSITitan / CurLogOrders[0].capacity))*ra0)

const ma2 = ((CurLogOrders[1].Macbook / CurLogOrders[1].capacity))*ra1;
const pre2 = ((CurLogOrders[1].Predator / CurLogOrders[1].capacity))*ra1;
const asu2 = ((CurLogOrders[1].AsusROG / CurLogOrders[1].capacity))*ra1;
const h2 = ((CurLogOrders[1].HpOmen / CurLogOrders[1].capacity))*ra1;
const tita2 = ((CurLogOrders[1].MSITitan / CurLogOrders[1].capacity))*ra1;

const suppliedOrder1 = new Quantity({
  Macbook : ma1,
  HpOmen : pre1,
  Predator : asu1,
  MSITitan : h1,
  AsusROG : tita1
})

const suppliedOrder2 = new Quantity({
  Macbook : ma2,
  HpOmen : pre2,
  Predator : asu2,
  MSITitan : h2,
  AsusROG : tita2
})


router.get("/currentLog", authenticateJwt, (req, res) => {
    res.json({
      retailer1 : suppliedOrder1,
      retailer2 : suppliedOrder2
    })
})

router.get("/history",authenticateJwt,(req,res)=>{
  const pastOrders = Logistics.History
  if(!pastOrders){
    res.status(403).json({msg: "No Past order exists"})
      return
  }
  res.json({orderHistory:pastOrders})
})


router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(logistics) {     
    
      if(logistics){
        res.status(403).json({ message: 'Admin already exists' });
      } 
      else 
      {
        const obj = { username: username, password: password };
        const newlogistics = new Logistics(obj);
        newlogistics.save();

        const token = jwt.sign({ username, logistics }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'logistics created successfully', token });
      }
  
    }
    Logistics.findOne({ username }).then(callback);
  });
  
router.post('/signin', async (req, res) => {
    const { username, password } = req.headers;
    const logistics = await Logistics.findOne({ username, password }); 
    if(logistics){
      const token = jwt.sign({ username, logistics }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } 
    else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
 

export {router};
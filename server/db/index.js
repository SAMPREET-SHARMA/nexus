import mongoose from "mongoose";

const costSchema = new mongoose.Schema({
        Macbook:  {type: Number,default: 2000},
        HpOmen:   {type: Number,default: 2500},
        Predator: {type: Number,default: 3000},
        MSITitan: {type: Number,default: 2800},
        AsusROG:  {type: Number,default: 2200}
})
const quantitySchema = new mongoose.Schema({
        Macbook:  {type: Number,default:0},
        HpOmen:   {type: Number,default:0},
        Predator: {type: Number,default:0},
        MSITitan: {type: Number,default:0},
        AsusROG:  {type: Number,default:0},
        
})

quantitySchema.virtual('totalQuantity').get(function() {
    return this.Macbook + this.HpOmen + this.Predator + this.MSITitan + this.AsusROG;
});

quantitySchema.set('toObject', { virtuals: true });
quantitySchema.set('toJSON', { virtuals: true });

const retailSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    History: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quantitySchema'
    }],
    received: { type: Boolean },
    
    order : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'quantitySchema'
    },

    receivedQuantity : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'quantitySchema'
    }
});

const currentLogisticOrdersSchema = new mongoose.Schema({
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quantitySchema'
    }],
    dispatched: { type: Boolean },
    capacity : { type : Number , default : 20 }
})

const logisticsSchema = new mongoose.Schema({
    History: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quantitySchema'
    }],    
    Total: {type:Number}
});

const Retail = mongoose.model('Retail', retailSchema);
const Logistics = mongoose.model('Logistics', logisticsSchema);
const Quantity = mongoose.model('Quantity', quantitySchema);
const Price = mongoose.model('Price', costSchema);
const CurLogOrders = mongoose.model('CurLogOrders',currentLogisticOrdersSchema);

export { Retail, Logistics,Quantity,Price,CurLogOrders };
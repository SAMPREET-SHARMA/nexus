import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logistics from "./routes/logistics.js";
import retail from "./routes/retail.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/logistics", logistics);
app.use("/retail", retail);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "supplyChain" });

app.listen(3000, () => console.log('Server running on port 3000'));

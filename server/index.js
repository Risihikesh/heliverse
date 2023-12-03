/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const express= require('express');
const dotenv = require('dotenv');
const mongoose =require ('mongoose');
const cors =require ('cors');
const morgan =require ('morgan');
const userRoutes =require( './routes/user.js');
const teamRoutes =require ('./routes/team.js');

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(morgan("tiny"));


const port = process.env.PORT || 8800;

const connect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use(express.json());

app.listen(port, () => {
  console.log(`server is running on ${port}`);
  connect();
});

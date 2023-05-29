import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./src/routers/Users.js";
import AuthRoute from "./src/routers/Auth.js";
import BusRoute from "./src/routers/Bus.js";
import BusDetailsRoute from "./src/routers/BusDetails.js";
import SeatRoute from "./src/routers/Seats.js";
import TicketRoute from "./src/routers/Tickets.js";
import TransactionRoute from "./src/routers/Transaction.js";
dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(UserRoute);
app.use(AuthRoute);
app.use(BusRoute);
app.use(BusDetailsRoute);
app.use(SeatRoute);
app.use(TicketRoute);
app.use(TransactionRoute);

app.listen(port, () => {
  console.log(`server running perfectly at port ${port}`);
});

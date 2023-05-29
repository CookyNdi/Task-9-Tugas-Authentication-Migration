import Bus from "../models/Bus.js";
import BusDetails from "../models/BusDetails.js";
import Seats from "../models/Seats.js";
import Users from "../models/Users.js";
import Tickets from "../models/Tickets.js";
import Transactions from "../models/Transaction.js";

(async () => {
  await Users.sync();
  await Bus.sync();
  await BusDetails.sync();
  await Tickets.sync();
  await Seats.sync();
  await Transactions.sync();
  console.log("Table Created Successfully");
})();

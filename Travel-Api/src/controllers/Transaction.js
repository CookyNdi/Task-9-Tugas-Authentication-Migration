// import Tickets from "../models/Tickets.js";
import Transactions from "../models/Transaction.js";

export const getTransactionByTicketId = async (req, res) => {
  try {
    const response = await Transactions.findOne({
      where: {
        ticketId: req.body.ticketId,
      },
    });
    if (!response) return res.status(404).json({ msg: "Transaction Tidak Di Temukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const payment = async (req, res) => {
  const { ticketId, payment_method } = req.body;
  const status = "Waiting";

  const now = new Date();
  const padZero = (number) => {
    return number.toString().padStart(2, "0");
  };
  const no_order = `${now.getFullYear()}${padZero(now.getMonth() + 1)}${padZero(now.getDate())}${padZero(
    now.getHours()
  )}${padZero(now.getMinutes())}${padZero(now.getSeconds())}`;

  try {
    await Transactions.create({
      no_order: no_order,
      ticketId: ticketId,
      status: status,
      payment_method: payment_method,
    });
    res.status(201).json({ msg: "Transaction Telah Berhasil, Menunggu Pembayaran" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const confPayment = async (req, res) => {
  try {
    const status = req.body.status;
    const transaction = await Transactions.findOne({
      where: {
        no_order: req.params.id,
      },
    });
    if (!transaction) return res.status(404).json({ msg: "Transaksi Tidak Ada" });
    await Transactions.update(
      {
        status: status,
      },
      {
        where: {
          no_order: transaction.no_order,
        },
      }
    );
    res.status(200).json({ msg: "Pembayaran Telah Berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

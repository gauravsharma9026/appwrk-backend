var express = require('express');
const TransactionControllers = require("../controllers/transaction");
var router = express.Router();


//router.post("/", multer({ storage : storage}).single('image'), (req, res, next) => {
router.post("/create",  TransactionControllers.createTransaction);
  
router.get("/", TransactionControllers.getTransactions);

module.exports = router;
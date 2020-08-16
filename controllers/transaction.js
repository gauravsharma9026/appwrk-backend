import Transaction from '../models/transaction';

exports.createTransaction = async (req, res, next) => {
try{
  const transaction =  new Transaction({
    type: req.body.type,
    amount: req.body.amount,
    description: req.body.description
});

const result = await transaction.save();

res.status(200).json({
  message: "transaction created successfully",
  transaction: {
    id: result._id,
    type: result.title,
    amount: result.content,
    description: result.description
  }
});

}catch(e){
  res.status(500).json({
    message: "Creating a transaction failed"
  });
}
    
}


  exports.getTransactions = (req, res, next) => {
    const pageSize = +req.query.pagesize; //+is used to read string as numbers in query pARAM
    const currPage = +req.query.page;
    let fetchedDocument;
    const transactionQuery = Transaction.find().sort({id: -1});
    if(pageSize && currPage)
    {
      transactionQuery
      .skip(pageSize * (currPage - 1))
      .limit(pageSize);
    }
    transactionQuery
    .then(documents => {
      fetchedDocument = documents;
      return Transaction.count();
    }).then(count => {
      res.status(200).json({
        message: "transaction get successfully",
        transactions: fetchedDocument,
        maxtransaction: count,
      });
    }).catch(error =>{
      res.status(500).json({
        message: "Fteching transaction failed"
      });
    });    
  }

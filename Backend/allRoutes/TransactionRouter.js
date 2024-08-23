const router = require("express").Router();
const companyTransactionController = require("../controller/companyTransaction");
const { authenticateToken } = require("../middleware/authMiddleWare");

const api = process.env.API_URL;

router.get(
  `${api}/getCompanyTransaction`,
  //   authenticateToken,
  companyTransactionController.getCompanyTransaction
);
router.get(
  `${api}/transactions/:companyId`,
  //   authenticateToken,
  companyTransactionController.getTransactions
);
router.post(
  `${api}/addCompanyTransaction`,
  //   authenticateToken,
  companyTransactionController.addCompanyTransaction
);
router.post(
  `${api}/paytax`,
  //   authenticateToken,
  companyTransactionController.payTax
)

module.exports = router;

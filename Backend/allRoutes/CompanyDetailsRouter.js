const router = require("express").Router();
const CompanyDetailController = require("../controller/companyDetails");
const { authenticateToken } = require("../middleware/authMiddleWare");

const api = process.env.API_URL;

router.post(
  `${api}/addCompanyDetails`,
  //   authenticateToken,
  CompanyDetailController.addCompanyDetails
);
router.get(
  `${api}/getCompanyDetails`,
  //   authenticateToken,
  CompanyDetailController.getCompanyDetails
);
router.put(
  `${api}/updateCompanyDetails/:id`,
  authenticateToken,
  CompanyDetailController.updateCompanyDetails
);
router.delete(
  `${api}/deleteproject/:id`,
  authenticateToken,
  CompanyDetailController.deleteCompanyDetails
);
router.get(
  `${api}/getCompanyDetailsById/:id`,
  CompanyDetailController.getCompanyDetailsById
);

router.get(
  `${api}/getCompanyDetailsByName/:id`,
  CompanyDetailController.getCompanyDetailsByName
);

module.exports = router;

const router = require("express").Router();
const IndividualController = require("../controller/individualDetails");
const { authenticateToken } = require("../middleware/authMiddleWare");

const api = process.env.API_URL;

router.post(
  `${api}/addCompanyDetails`,
  //   authenticateToken,
  IndividualController.addIndividualDetails
);
router.get(
  `${api}/getCompanyDetails`,
  //   authenticateToken,
  IndividualController.getIndividualDetails
);
router.put(
  `${api}/updateCompanyDetails/:id`,
  //   authenticateToken,
  IndividualController.updateIndividualDetails
);
router.delete(
  `${api}/deleteproject/:id`,
  //   authenticateToken,
  IndividualController.deleteIndividualDetails
);

module.exports = router;

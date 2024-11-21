const router = require("express").Router();
const controller = require("../controllers/paymentController");

// 클라이언트가 결제 정보를 백엔드로 보내서 Toss Payments API를 통해 결제 확인을 처리하는 역할
router.post("/confirm", controller.confirmPayment);

// 새로운 store 경로 추가
router.route("/store").post(controller.storePayment);

module.exports = router;

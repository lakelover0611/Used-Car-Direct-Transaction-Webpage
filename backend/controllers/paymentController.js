const service = require("./paymentService");

async function confirmPayment(req, res, next) {
  try {
    const confirmResponse = await service.confirmPayment(req.body); // req.body 사용
    return res.json({ data: confirmResponse });
  } catch (error) {
    console.error("Error confirming payment:", error);
    return res.status(500).json({ message: "Error confirming payment", error });
  }
}

// 새로운 storePayment 컨트롤러 추가
async function storePayment(req, res, next) {
  try {
    const paymentData = req.body;
    const storeResponse = await service.storePayment(paymentData); // 서비스 호출
    return res
      .status(200)
      .json({ message: "Payment stored successfully", data: storeResponse });
  } catch (error) {
    console.error("Error storing payment:", error);
    return res.status(500).json({ message: "Error storing payment", error });
  }
}

module.exports = {
  confirmPayment,
  storePayment,
};

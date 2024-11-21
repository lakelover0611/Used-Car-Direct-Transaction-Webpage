const fetch = require("node-fetch");
const pool = require("../config/dbpools");

// Toss Payments Secret Key
const widgetsecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

// Helper function to convert ISO8601 string to MySQL DATETIME format
function formatDateTime(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Toss Payments API와 통신하여 결제 정보 확인
async function confirmPayment(paymentInfo = {}) {
  const { paymentKey, orderId, amount, userId } = paymentInfo;
  const encryptedSecretKey =
    "Basic " + Buffer.from(widgetsecretKey + ":").toString("base64");

  try {
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount,
          paymentKey,
        }),
      }
    );

    // 응답이 JSON인지 확인
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Toss Payments API 응답 데이터:", data);

      // 데이터 저장 로직 호출
      await storePayment({
        userId,
        paymentKey,
        method: data.method || "unknown",
        lastTransactionKey: data.lastTransactionKey || "N/A",
        status: data.status || "unknown",
        amount: data.totalAmount || null,
        number: data.card?.number || null,
        orderId: data.orderId || null,
        orderName: data.orderName || null,
        requestedAt: formatDateTime(data.requestedAt) || null,
        approvedAt: formatDateTime(data.approvedAt) || null,
      });

      // JSON 형식으로 클라이언트에 응답
      return {
        success: true,
        data,
      };
    } else {
      // JSON이 아닌 경우 응답 차단 또는 에러 처리
      console.error("JSON이 아닌 응답이 수신되었습니다.");
      return {
        success: false,
        message: "JSON이 아닌 응답은 허용되지 않습니다.",
      };
    }
  } catch (error) {
    console.error("결제 확인 중 에러 발생:", error.message);

    // JSON 형식으로 에러 응답
    return {
      success: false,
      message: error.message,
    };
  }
}

// storePayment 함수: 데이터베이스에 결제 정보 저장
async function storePayment(paymentData) {
  const {
    userId,
    paymentKey,
    method,
    lastTransactionKey,
    status,
    amount,
    number,
    orderId,
    orderName,
    requestedAt,
    approvedAt,
  } = paymentData;

  const sql = `
    INSERT INTO credit (
      userId,
      paymentKey,
      method,
      lastTransactionKey,
      status,
      amount,
      number,
      orderId,
      orderName,
      requestedAt,
      approvedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.query(sql, [
      userId,
      paymentKey,
      method,
      lastTransactionKey,
      status,
      amount,
      number || null,
      orderId || null,
      orderName || null,
      requestedAt || null,
      approvedAt || null,
    ]);
    console.log("결제 데이터 저장 성공:", result);
  } catch (error) {
    console.error("결제 데이터 저장 중 에러:", error);
    throw new Error("결제 데이터 저장 실패");
  }
}

module.exports = { confirmPayment, storePayment };

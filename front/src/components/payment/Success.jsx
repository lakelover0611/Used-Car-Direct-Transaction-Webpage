import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState({}); // 결제 데이터를 관리하는 상태

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    console.log("SuccessPage loaded");
    confirmPayment();
  }, []); // 빈 배열로 의존성 설정하여 컴포넌트 마운트 시 한 번 실행

  // 결제 승인 API 요청
  async function confirmPayment() {
    try {
      // userId 가져오기
      const userId = localStorage.getItem("uNo");
      if (!userId) {
        console.error("User ID가 제공되지 않았습니다.");
        return;
      }

      // API 호출
      const response = await fetch(
        "http://localhost:4444/sandbox-dev/api/v1/payments/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount,
            userId, // 필요한 경우 추가 전달
          }),
        }
      );

      console.log("응답 상태 코드:", response.status);
      const contentType = response.headers.get("content-type");
      console.log("Content-Type 헤더:", contentType);

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("결제 승인 데이터:", data);
          setIsConfirmed(true);

          // 백엔드에서 받은 데이터를 상태에 저장
          setPaymentData(data);
        } else {
          // JSON이 아닌 경우 텍스트로 처리
          const rawData = await response.text();
          console.log("JSON이 아닌 응답 데이터:", rawData);
          if (rawData === "Payment confirmed") {
            setIsConfirmed(true);
          } else {
            console.error("예상하지 못한 응답:", rawData);
          }
        }
      } else {
        console.error(
          "결제 승인 중 오류가 발생했습니다.:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("네트워크 또는 서버 에러 발생:", error);
    }
  }

  return (
    <div className="wrapper w-100">
      {isConfirmed ? (
        <div
          className="flex-column align-center confirm-success w-100 max-w-540"
          style={{
            display: "flex",
          }}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
          />
          <h2 className="title">결제를 완료했어요</h2>
          <div className="response-section w-100">
            <div className="flex justify-between">
              <span className="response-label">결제 금액</span>
              <span id="amount" className="response-text">
                {amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">주문번호</span>
              <span id="orderId" className="response-text">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">Payment Key</span>
              <span id="paymentKey" className="response-text">
                {paymentKey}
              </span>
            </div>

            {/* 추가된 데이터 확인 섹션 */}
            <div
              className="response-section w-100"
              style={{ marginTop: "20px" }}
            >
              <h3>저장하려는 데이터 확인</h3>
              <div className="flex-column">
                <span className="response-label">User ID</span>
                <span className="response-text">{paymentData.userId}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Payment Key</span>
                <span className="response-text">{paymentData.paymentKey}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Method</span>
                <span className="response-text">{paymentData.method}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Last Transaction Key</span>
                <span className="response-text">
                  {paymentData.lastTransactionKey}
                </span>
              </div>
              <div className="flex-column">
                <span className="response-label">Status</span>
                <span className="response-text">{paymentData.status}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Amount</span>
                <span className="response-text">{paymentData.amount}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Card Number</span>
                <span className="response-text">{paymentData.number}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Order ID</span>
                <span className="response-text">{paymentData.orderId}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Order Name</span>
                <span className="response-text">{paymentData.orderName}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Requested At</span>
                <span className="response-text">{paymentData.requestedAt}</span>
              </div>
              <div className="flex-column">
                <span className="response-label">Approved At</span>
                <span className="response-text">{paymentData.approvedAt}</span>
              </div>
            </div>
          </div>

          <div className="w-100 button-group">
            <div className="flex" style={{ gap: "16px" }}>
              <a
                className="btn w-100"
                href="https://developers.tosspayments.com/sandbox"
              >
                다시 테스트하기
              </a>
              <a
                className="btn w-100"
                href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
                target="_blank"
                rel="noopner noreferer"
              >
                결제 연동 문서가기
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-column align-center confirm-loading w-100 max-w-540">
          <div className="flex-column align-center">
            <img
              src="https://static.toss.im/lotties/loading-spot-apng.png"
              width="120"
              height="120"
            />
            <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
            <h4 className="text-center description">
              결제 승인하고 완료해보세요.
            </h4>
          </div>
          <div className="w-100">
            <button className="btn primary w-100" onClick={confirmPayment}>
              결제 승인하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default SuccessPage;

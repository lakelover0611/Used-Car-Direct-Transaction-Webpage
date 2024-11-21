//사용자가 결제 성공 후 리디렉션되면 confirmPayment 함수에서 fetch를 사용해 /sandbox-dev/api/v1/payments/confirm으로 POST 요청을 보냅니다.
//이 요청은 백엔드에서 결제를 검증하고 완료하는 프로세스를 처리하는 부분입니다.

import { useSearchParams } from "react-router-dom";

export function FailPage() {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");

  return (
    <div className="wrapper w-100">
      <div className="flex-column align-center w-100 max-w-540">
        <img
          src="https://static.toss.im/lotties/error-spot-apng.png"
          width="120"
          height="120"
        />
        <h2 className="title">결제를 실패했어요</h2>
        <div className="response-section w-100">
          <div className="flex justify-between">
            <span className="response-label">code</span>
            <span id="error-code" className="response-text">
              {errorCode}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="response-label">message</span>
            <span id="error-message" className="response-text">
              {errorMessage}
            </span>
          </div>
        </div>

        <div className="w-100 button-group">
          <a
            className="btn"
            href="https://developers.tosspayments.com/sandbox"
            target="_blank"
            rel="noreferrer noopener"
          >
            다시 테스트하기
          </a>
          <div className="flex" style={{ gap: "16px" }}>
            <a
              className="btn w-100"
              href="https://docs.tosspayments.com/reference/error-codes"
              target="_blank"
              rel="noreferrer noopener"
            >
              에러코드 문서보기
            </a>
            <a
              className="btn w-100"
              href="https://techchat.tosspayments.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              실시간 문의하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FailPage;

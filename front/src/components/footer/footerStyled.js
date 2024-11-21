import styled from "styled-components";

export const FooterWrap = styled.div`
  border-top: 1px solid #999;
  footer {
    background-color: #e3f2fd;
    padding: 60px 20px;
  }

  footer .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  footer .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap; /* 한 줄에 강제 배치 */
    gap: 20px; /* 요소 간 간격 */
  }

  footer .row > div {
    flex: 1; /* 각 요소가 동일한 비율로 너비 차지 */
    min-width: 150px; /* 최소 너비 설정 */
  }

  footer h6 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  footer ul {
    list-style-type: none;
    padding: 0;
  }

  footer ul li {
    margin-bottom: 5px;
  }

  footer ul li a {
    text-decoration: none;
    color: #6c757d;
    font-size: 0.9rem;
    display: inline-block;
    transition: color 0.3s ease;
  }

  footer ul li a:hover {
    color: #007bff;
  }

  .app-download {
    margin-top: 30px;
    text-align: center;
    h3 {
      font-size: 25px;
      font-family: 900;
      margin-bottom: 10px;
    }
  }

  .app-download form {
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      background: #007bff;
      width: 100px;
      height: 30px;
      border-radius: 4px;
      color: #fff;
      &:hover {
        background: #0056b3;
      }
    }
  }

  .bottom-info {
    color: #6c757d;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 20px;
    .bottomP1 {
      margin-top: 5px;
    }
    .bottomP2 {
      margin: 5px 0 10px;
    }
  }

  .bottom-info ul {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  /* 반응형 레이아웃 */
  @media (max-width: 768px) {
    footer .row {
      flex-direction: column;
      align-items: center;
    }

    footer .row > div {
      width: 100%; /* 모바일에서는 전체 너비 사용 */
      text-align: center;
    }

    .app-download form {
      flex-direction: column;
      width: 100%;
    }
  }
`;

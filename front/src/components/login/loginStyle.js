import styled from "styled-components";

export const LoginStyle = styled.div`
  margin: 200px 0 200px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  /* main */
  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }

  .form-control {
    border-radius: 5px;
    height: 45px;
  }
  .login-btn {
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    height: 50px;
    font-size: 1.2rem;
  }
  .login-btn:hover {
    background-color: #0056b3;
  }
  .save-id {
    font-size: 0.9rem;
    color: #6c757d;
  }
  .login-options a {
    font-size: 0.9rem;
    color: #6c757d;
    text-decoration: none;
  }
  .login-options a:hover {
    color: black;
  }
  .sns-login img {
    width: 40px;
    height: 40px;
    margin: 0 10px;
  }
  .sns-login p {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 10px;
  }
  .divider {
    text-align: center;
    margin: 20px 0;
  }
  .divider hr {
    margin: 0;
  }
  .divider span {
    position: relative;
    top: -13px;
    background-color: white;
    padding: 0 15px;
    color: #6c757d;
    font-size: 0.9rem;
  }
  .back-btn {
    color: #6c757d;
    font-size: 1.5rem;
  }
  .back-btn:hover {
    color: #000000; /* 화살표 아이콘의 색상을 변경 */
  }
`;

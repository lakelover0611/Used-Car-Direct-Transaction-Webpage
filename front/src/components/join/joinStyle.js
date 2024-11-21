import styled from "styled-components";

export const JoinStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면의 높이를 100%로 설정 */
  margin: 0;

  .signup-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 15px 0;
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

  .signup-btn {
    background-color: #007bff;
    border: none;
    color: #fff;
    border-radius: 5px;
    height: 50px;
    font-size: 1.2rem;
  }

  .signup-btn:hover {
    background-color: #0056b3;
  }

  .form-label {
    font-size: 0.9rem;
    color: #6c757d;
    font-weight: 600;
  }

  .required-label {
    color: red;
  }

  .form-text {
    font-size: 0.8rem;
    color: #6c757d;
  }

  .back-btn {
    color: #6c757d;
    font-size: 1.5rem;
  }

  .back-btn:hover {
    color: #000000;
  }
`;

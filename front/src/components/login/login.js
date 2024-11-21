import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginStyle } from "./loginStyle";

function Login() {
  const [formData, setFormData] = useState({
    userid: "",
    passwd: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4444/login/loginUser",
        formData
      );
      if (response.data.success) {
        const uNo = response.data.uNo;
        localStorage.setItem("uNo", uNo);

        await alert("로그인 되었습니다.");
        navigate("/");
        window.location.reload();
      } else {
        alert(`${response.data.message}`);
      }
    } catch (error) {
      console.error("로그인 중 오류:", error);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginStyle>
      <div className="login-container shadow-lg">
        <Link to="/">
          <i className="fas fa-arrow-left back-btn"></i>
        </Link>
        <h1>로그인</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="userid"
            value={formData.userid}
            onChange={handleChange}
            placeholder="아이디 입력"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="passwd"
            value={formData.passwd}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="form-check mb-3 save-id">
          <input className="form-check-input" type="checkbox" id="save-id" />
          <label className="form-check-label" htmlFor="save-id">
            아이디 저장
          </label>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button
          className="btn btn-danger w-100 login-btn mb-3"
          type="submit"
          onClick={handleSubmit}
        >
          로그인
        </button>
        <div className="text-center login-options mb-3">
          <Link to="/join">회원가입</Link> |{" "}
          <Link to="/findId">아이디찾기</Link> |{" "}
          <Link to="/findPw">비밀번호 찾기</Link>
        </div>
        <div className="divider">
          <hr />
        </div>
      </div>
    </LoginStyle>
  );
}

export default Login;

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FindIdStyle } from "./findIdStyle";

function FindId() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4444/login/findId",
        formData
      );
      if (response.data.userid) {
        alert(`${formData.name}님의 아이디는 ${response.data.userid}`);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("해당하는 사용자가 없습니다");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <FindIdStyle>
      <div className="login-container shadow-lg">
        {/* 화살표 아이콘 */}
        <Link to="/login">
          <i className="fas fa-arrow-left back-btn"></i>
        </Link>
        <h1>아이디 찾기</h1>
        {/* 아이디 입력 */}
        <div className="mb-3">
          <input
            type="text"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름 입력"
          />
        </div>
        {/* 이메일 입력 */}
        <div className="mb-3">
          <input
            type="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일 입력"
          />
        </div>
        {/* 로그인 버튼 */}
        <button
          className="btn btn-danger w-100 login-btn mb-3"
          id="loginBtn"
          onClick={handleSubmit}
        >
          아이디 찾기
        </button>
        {/* 기타 로그인 옵션 */}
        {/* <div className="text-center login-options mb-3">
                <a href="#">아이디찾기</a> |
                <a href="#">비밀번호 찾기</a>
            </div> */}
      </div>
    </FindIdStyle>
  );
}

export default FindId;

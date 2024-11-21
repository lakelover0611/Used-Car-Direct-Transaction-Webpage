import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { JoinStyle } from "./joinStyle";

function Join() {
  const [formData, setFormData] = useState({
    name: "",
    userid: "",
    passwd: "",
    passwdConfirm: "",
    tel: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [formCheck, setFormCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const navigate = useNavigate();
  const btnRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "email") {
      setEmailCheck(false); // 이메일이 변경되면 인증 상태 초기화
    }
  };

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(formData.email)) {
      btnRef.current.style.display = "block"; // 이메일 유효할 경우 버튼 표시
    } else {
      btnRef.current.style.display = "none"; // 이메일 유효하지 않을 경우 버튼 숨기기
    }
    const formFull = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setFormCheck(formFull);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.passwd !== formData.passwdConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4444/user/saveUser",
        formData
      );
      console.log(response.data);
      await alert("회원가입 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    try {
      const response = await axios.post(
        "http://localhost:4444/user/verifyEmail",
        { email: formData.email }
      );
      if (response.data.exists) {
        setError("이메일이 중복됩니다.");
        setEmailCheck(false); // 이메일이 중복되면 인증 상태 false
      } else {
        setError("이메일이 확인되었습니다.");
        setEmailCheck(true); // 이메일이 확인되면 인증 상태 true
      }
    } catch (error) {
      console.error(error);
      setEmailCheck(false); // 오류 발생 시 인증 상태 false
    }
  };

  return (
    <JoinStyle>
      <div className="signup-container shadow-lg">
        <Link to="/login">
          <i className="fas fa-arrow-left back-btn"></i>
        </Link>
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              이름 <span className="required-label">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="이름 입력"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userid" className="form-label">
              아이디 <span className="required-label">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="userid"
              placeholder="영문과 숫자 포함 4-12자리"
              value={formData.userid}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwd" className="form-label">
              비밀번호 <span className="required-label">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="passwd"
              placeholder="비밀번호 입력"
              value={formData.passwd}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwdConfirm" className="form-label">
              비밀번호 확인 <span className="required-label">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="passwdConfirm"
              placeholder="비밀번호 확인"
              value={formData.passwdConfirm}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              휴대전화번호 <span className="required-label">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="tel"
              placeholder="'-' 제외하고 숫자만 입력"
              value={formData.tel}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="example@encar.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleEmail}
            ref={btnRef}
            className="btn btn-success w-100 email-verify-btn"
            style={{ display: "none", marginBottom: "15px" }}
          >
            이메일 인증하기
          </button>
          <button
            type="submit"
            className="btn btn-danger w-100 signup-btn mb-3"
            disabled={!formCheck || !emailCheck}
          >
            완료
          </button>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
    </JoinStyle>
  );
}

export default Join;

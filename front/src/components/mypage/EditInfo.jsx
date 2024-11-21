//EditInfo.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EditInfoStyle } from "./EditInfoStyle";
import bcrypt from "bcryptjs";

const EditInfo = () => {
  const uNo = localStorage.getItem("uNo");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    userid: "",
    tel: "",
    email: "",
    passwd: "",
  });

  const [inputData, setInputData] = useState({
    tel: "",
    email: "",
    passwd: "",
    newpasswd: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // 기존 비밀번호 비교
  const checkPassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isMatch = await checkPassword(inputData.passwd, formData.passwd);
    if (!isMatch) {
      setError("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (inputData.passwd === inputData.newpasswd) {
      setError("비밀번호를 다르게 설정하세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4444/editUser/editUser",
        {
          uNo,
          currentPasswd: inputData.passwd,
          newpassword: inputData.newpasswd,
          tel: inputData.tel,
          email: inputData.email,
        }
      );
      console.log(response.data);
      navigate("/mypage"); // 성공적으로 저장된 후 마이 페이지로 이동
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (uNo) {
        try {
          const response = await axios.get(
            `http://localhost:3333/edituser/${uNo}`
          );
          const userData = response.data;
          setFormData({
            name: userData.name,
            userid: userData.userid,
            tel: userData.tel,
            email: userData.email,
            passwd: userData.passwd,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUser();
  }, [uNo]);

  return (
    <EditInfoStyle>
      {/* <!-- 내 정보 섹션 --> */}
      <div className="container shadow-lg">
        {/* <!-- 화살표 아이콘 --> */}
        <Link to="/mypage">
          <i className="fas fa-arrow-left back-btn"></i>
        </Link>
        <h1>내 정보</h1>
        <form onSubmit={handleSubmit}>
          {/* <!-- 이름 입력 --> */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              이름
            </label>
            <span id="nameDisplay" className="data-display">
              : {formData.name}
            </span>
          </div>
          {/* <!-- 아이디 입력 --> */}
          <div className="mb-3">
            <label htmlFor="userid" className="form-label">
              아이디
            </label>
            <span id="idDisplay" className="data-display">
              : {formData.userid}
            </span>
          </div>
          {/* <!-- 휴대전화번호 입력 --> */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              휴대폰 번호
            </label>
            <input
              type="text"
              className="form-control"
              id="tel"
              value={inputData.tel}
              placeholder={formData.tel}
              onChange={handleChange}
            />
          </div>
          {/* <!-- 이메일 입력 --> */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={inputData.email}
              placeholder={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* <!-- 현재 비밀번호 --> */}
          <div className="mb-3">
            <label htmlFor="current-password" className="form-label">
              현재 비밀번호
            </label>
            <input
              type="password"
              className="form-control"
              id="passwd"
              value={inputData.passwd}
              onChange={handleChange}
              placeholder="현재 비밀번호를 입력해 주세요."
            />
          </div>
          {/* <!-- 새 비밀번호 --> */}
          <div className="mb-3">
            <label htmlFor="new-password" className="form-label">
              새 비밀번호
            </label>
            <input
              type="password"
              className="form-control"
              id="newpasswd"
              value={inputData.newpasswd}
              onChange={handleChange}
              placeholder="새로운 비밀번호를 입력해 주세요."
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          {/* <!-- 버튼들 --> */}
          <div className="d-flex justify-content-between">
            <button
              className="modify btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#confirmationModal"
            >
              변경하기
            </button>
          </div>
        </form>
      </div>
      {/* <!-- 모달 --> */}
      <div
        className="modal fade"
        id="confirmationModal"
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                확인
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>변경하시겠습니까?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                취소
              </button>
              <button type="button" className="confirm btn btn-primary">
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </EditInfoStyle>
  );
};

export default EditInfo;

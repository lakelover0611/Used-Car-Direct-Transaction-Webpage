import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FindPwStyle } from "./findPwStyle";
import axios from 'axios';
import Modal from './Modal';
import bcrypt from 'bcryptjs';

function FindPw() {
    const [formData, setFormData] = useState({
        name: '',
        userid: '',
        email: '',
        newpasswd: '',
        checkpasswd: ''
    });

    const navigate = useNavigate();
    const [passWd, setPassWd] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4444/login/findPw', formData);
            console.log('Response data:', response);
            if (response.data.passwd) {
                setPassWd(response.data.passwd);
                setShowModal(true);
            }
        } catch (error) {
            alert('사용자를 찾을 수 없습니다');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };



    const changePasswd = async (e) => {
        e.preventDefault();

        if (!formData.newpasswd || formData.newpasswd.trim() === '') {
            alert('비밀번호를 입력해 주세요.');
            return;
        }

        if (formData.newpasswd !== formData.checkpasswd) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        }

        try {
            const hashednewpw = await bcrypt.hash(formData.newpasswd, 10);
            console.log(`${hashednewpw}`);

            const isMatch = await bcrypt.compare(passWd, hashednewpw);
            if (isMatch) {
                alert('새 비밀번호는 기존 비밀번호와 다르게 설정해야 합니다.');
                return;
            }

            await axios.post('http://localhost:4444/login/changePw', formData);
            alert('비밀번호가 변경되었습니다');
            setShowModal(false);
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('비밀번호 변경에 실패했습니다');
        }
    };



    return (
        <FindPwStyle>
            <div className="login-container shadow-lg">
                <Link to="/login"><i className="fas fa-arrow-left back-btn"></i></Link>
                <h1>비밀번호 찾기</h1>
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
                <div className="mb-3">
                    <input
                        type="text"
                        id="userid"
                        className="form-control"
                        value={formData.userid}
                        onChange={handleChange}
                        placeholder="아이디 입력"
                    />
                </div>
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
                <button className="btn btn-danger w-100 login-btn mb-3" id="searchBtn"
                    onClick={handleSubmit}>
                    비밀번호 찾기
                </button>
            </div>

            <Modal show={showModal} handleClose={() => setShowModal(false)}>
                <div className="modal-body text-center" id="modalBody">
                    <div className="mb-3">
                        <input
                            type="password"
                            id="newpasswd"
                            className="form-control"
                            value={formData.newpasswd}
                            onChange={handleChange}
                            placeholder="새 비밀번호"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="checkpasswd"
                            className="form-control"
                            value={formData.checkpasswd}
                            onChange={handleChange}
                            placeholder="비밀번호 확인"
                        />
                    </div>
                    <button className="btn btn-danger w-100 login-btn mb-3" id="searchBtn"
                        onClick={changePasswd}>
                        비밀번호 변경
                    </button>
                </div>

            </Modal>
        </FindPwStyle>
    );
}

export default FindPw;

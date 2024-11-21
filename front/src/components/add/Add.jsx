import React, { useState } from "react";
import axios from "axios";
// import './add.js';

import {
  FormContainer,
  Title,
  Label,
  Input,
  Select,
  ButtonGroup,
  Button,
} from "./addStyle.js";

// 모달 스타일링
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  zIndex: 1000,
  width: "400px",
};
const modalButtonStyle = {
  marginTop: "10px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

// 모달 컴포넌트
const Modal = ({ showModal, handleClose, message }) => {
  if (!showModal) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
      style={modalOverlayStyle}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={modalContentStyle}
      >
        <h2>오류 발생</h2>
        <p>{message}</p>
        <button onClick={handleClose} style={modalButtonStyle}>
          닫기
        </button>
      </div>
    </div>
  );
};

const SellForm = () => {
  // 모델명 상태 관리
  const [carModel, setCarModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [carImage, setCarImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  // 유효성 검사 함수
  const validateForm = () => {
    if (carModel.trim() === "") {
      setErrorMessage("모델명을 입력하세요.");
      setShowModal(true); // 유효성 검사 실패 시 모달 표시
      return false;
    }
    if (carModel.length < 2) {
      setErrorMessage("모델명은 최소 2자 이상이어야 합니다.");
      setShowModal(true); // 유효성 검사 실패 시 모달 표시
      return false;
    }
    if (!manufacturer) {
      setErrorMessage("브랜드를 선택하세요.");
      return false;
    }
    if (!year) {
      setErrorMessage("연식을 선택하세요.");
      return false;
    }
    if (!mileage) {
      setErrorMessage("주행거리를 선택하세요.");
      return false;
    }
    if (!fuel) {
      setErrorMessage("연료를 선택하세요.");
      return false;
    }
    if (!price) {
      setErrorMessage("판매 가격을 선택하세요.");
      return false;
    }
    if (!color) {
      setErrorMessage("차량 색상을 선택하세요.");
      return false;
    }
    if (!carImage) {
      setErrorMessage("차량 사진을 업로드하세요.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 방지

    if (validateForm()) {
      // 유효성 검사가 통과되면 백엔드로 데이터를 전송, FormData로 파일과 데이터를 함께 전송
      const formData = new FormData();
      formData.append("name", carModel);
      formData.append("brand", manufacturer);
      formData.append("year", year);
      formData.append("mileage", mileage);
      formData.append("fueltype", fuel);
      formData.append("price", price);
      formData.append("color", color);
      formData.append("carImage", carImage); // 파일 업로드
      // 로컬스토리지에서 user_uno 가져오기
      const user_uno = localStorage.getItem("uNo");
      formData.append("user_uno", user_uno); // user_uno 값 추가

      // formData 내용을 로그로 출력
      // console.log([...formData.entries()]);

      //FormData 전송
      axios
        .post("http://localhost:4444/addCar", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 파일 업로드를 위한 multipart/form-data 설정
          },
        })
        .then((response) => {
          console.log(response);
          alert("차량이 성공적으로 등록되었습니다.");
          console.log(user_uno);
          window.history.back();
        })
        .catch((error) => {
          console.error("차량 등록 오류:", error);
          console.dir(error);
          alert("등록 실패");
        });
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <FormContainer>
      <Title>내 차 팔기</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="carModel">모델명</Label>
          <Input
            type="text"
            id="carModel"
            placeholder="ex) 기아 K5"
            value={carModel}
            // onChange={(e) => setCarModel(e.target.value)} 이전버전
            onChange={(e) => {
              const value = e.target.value;
              setCarModel(value.charAt(0).toUpperCase() + value.slice(1));
            }}
            //첫글자 무조건 대문자로 입력받게함 소문자로 입력해도 첫글자는 대문자시작
          />
          {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
        </div>

        <div>
          <Label htmlFor="manufacturer">브랜드</Label>
          <Select
            id="manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          >
            <option selected>브랜드 선택</option>
            <option value="현대">현대</option>
            <option value="제네시스">제네시스</option>
            <option value="기아">기아</option>
            <option value="쉐보레(GM대우)">쉐보레(GM대우)</option>
            <option value="르노코리아(삼성)">르노코리아(삼성)</option>
            <option value="KG모빌리티(쌍용)">KG모빌리티(쌍용)</option>
            <option value="벤츠">벤츠</option>
            <option value="BMW">BMW</option>
            <option value="아우디">아우디</option>
            <option value="포르쉐">포르쉐</option>
            <option value="미니">미니</option>
            <option value="랜드로버">랜드로버</option>
            <option value="폭스바겐">폭스바겐</option>
            <option value="기타">기타</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="year">연식(제조년도)</Label>
          <Select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option selected>년도 선택</option>

            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            {/* 연도 선택 항목들 */}
          </Select>
        </div>

        <div>
          <Label htmlFor="mileage">주행거리</Label>
          <Select
            id="mileage"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
          >
            <option selected>km 선택</option>
            <option value="10000">10,000km</option>
            <option value="20000">20,000km</option>
            <option value="30000">30,000km</option>
            <option value="40000">40,000km</option>
            <option value="50000">50,000km</option>
            <option value="60000">60,000km</option>
            <option value="70000">70,000km</option>
            <option value="80000">80,000km</option>
            <option value="90000">90,000km</option>
            <option value="100000">100,000km</option>
            <option value="110000">110,000km</option>
            <option value="120000">120,000km</option>
            <option value="130000">130,000km</option>
            <option value="140000">140,000km</option>
            <option value="150000">150,000km</option>
            <option value="160000">160,000km</option>
            <option value="170000">170,000km</option>
            <option value="180000">180,000km</option>
            <option value="190000">190,000km</option>
            <option value="200000">200,000km</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="fuel">연료</Label>
          <Select
            id="fuel"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option selected>연료 선택</option>
            <option value="가솔린">가솔린</option>
            <option value="디젤">디젤</option>
            <option value="LPG">LPG</option>
            <option value="가솔린+전기">가솔린+전기</option>
            <option value="디젤+전기">디젤+전기</option>
            <option value="가솔린+LPG">가솔린+LPG</option>
            <option value="가솔린+CNG">가솔린+CNG</option>
            <option value="전기">전기</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="price">차량 판매 가격</Label>
          <Select
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option selected>판매가격 선택</option>
            <option value="100">100만원</option>
            <option value="200">200만원</option>
            <option value="300">300만원</option>
            <option value="400">400만원</option>
            <option value="500">500만원</option>
            <option value="600">600만원</option>
            <option value="700">700만원</option>
            <option value="800">800만원</option>
            <option value="900">900만원</option>
            <option value="1000">1,000만원</option>
            <option value="1100">1,100만원</option>
            <option value="1200">1,200만원</option>
            <option value="1300">1,300만원</option>
            <option value="1400">1,400만원</option>
            <option value="1500">1,500만원</option>
            <option value="1600">1,600만원</option>
            <option value="1700">1,700만원</option>
            <option value="1800">1,800만원</option>
            <option value="1900">1,900만원</option>
            <option value="2000">2,000만원</option>
            <option value="3000">3,000만원</option>
            <option value="4000">4,000만원</option>
            <option value="5000">5,000만원</option>
            <option value="6000">6,000만원</option>
            <option value="7000">7,000만원</option>
            <option value="8000">8,000만원</option>
            <option value="9000">9,000만원</option>
            <option value="10000">1억 이상</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="color">차량 색깔</Label>
          <Select
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option selected>색깔 선택</option>
            <option value="흰색">흰색</option>
            <option value="검정색">검정색</option>
            <option value="쥐색">쥐색</option>
            <option value="은색">은색</option>
            <option value="청색">청색</option>
            <option value="기타">기타</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="carImage">차량 사진</Label>
          <Input
            type="file"
            id="carImage"
            onChange={(e) => setCarImage(e.target.files[0])}
          />
        </div>

        <ButtonGroup>
          <Button type="submit" className="save">
            저장
          </Button>
          <Button type="reset" className="cancel">
            취소
          </Button>
        </ButtonGroup>
      </form>
      {/* 모달 컴포넌트 */}
      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        message={errorMessage}
      />
    </FormContainer>
  );
};

export default SellForm;

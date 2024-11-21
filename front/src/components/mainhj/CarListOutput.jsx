// 정연
import React, { useState, useEffect, useRef } from "react";
import { CarListOutputWrap } from "./carListStyle";
import { GoHeartFill } from "react-icons/go";
import { IoCarSport } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { formatPrice } from "../../utils/formPrice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CarListOutput = ({ carList, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("최신순");
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const user_uno = localStorage.getItem("uNo"); // 로컬 스토리지에서 유저 번호 가져오기

  const [modalOn, setModalOn] = useState(false);
  const [favoriteStates, setFavoriteStates] = useState({});
  const modalRef = useRef();

  console.log(user_uno);
  console.log(carList);
  console.log(favoriteStates);

  const [popMsg, setPopMsg] = useState(""); // 팝업 메시지
  const [show, setShow] = useState(false); // 팝업 보여주기 토글
  const navi = useNavigate();

  // useEffect를 사용하여 carList가 업데이트되었을 때 favoriteStates 초기화

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedCarList = [...carList].sort((a, b) => {
    switch (sortOption) {
      case "최신순":
        return new Date(b.date) - new Date(a.date);
      case "낮은가격순":
        return a.price - b.price;
      case "높은가격순":
        return b.price - a.price;
      case "주행거리":
        return a.mileage - b.mileage;
      default:
        return 0;
    }
  });

  // //클릭시 favorite 상태 변경
  // const toggleFavorite = (cNo) => {
  //   setFavoriteStates((prev) => ({
  //     ...prev,
  //     [cNo]: !prev[cNo],
  //     //현재 찜 상태 반전
  //   }));
  // };

  const toggleFavorite = async (cNo) => {
    const newFavoriteStatus = !favoriteStates[cNo];
    try {
      //서버에 favorite 상태 업데이트
      await updateFavoriteStatus(user_uno, cNo, newFavoriteStatus ? 1 : 0);
      //상태 업데이트
      setFavoriteStates((prev) => ({
        ...prev,
        [cNo]: newFavoriteStatus,
      }));
      //필요한 경우 서버에서 최신 데이터를 다시 가져오기
      //주의: 너무 자주 호출되지 않도록 최적화 필요
      // const response = await axios.get(
      //   `http://localhost:4444/car?user_uno=${user_uno}`
      // );
      // const updatedCarList = response.data.carList;
    } catch (error) {
      console.error("Favorite 상태 업데이트 실패:", error);
    }
  };

  //상태 초기화: favoritestates 상태를 useEffect를 사용해 초기화해야 함. carlist가 변경될 때마다 찜상태를 초기화
  useEffect(() => {
    const initialFavoriteStates = {};
    carList.forEach((car) => {
      initialFavoriteStates[car.cNo] = car.favorite; // or whatever your initial value is
    });
    setFavoriteStates(initialFavoriteStates);
  }, [carList]);

  //찜하기 정보를 서버에 보내주기
  const updateFavoriteStatus = async (user_uno, cNo, favorite) => {
    console.log("sending data:", { user_uno, cNo, favorite });
    try {
      const response = await axios.put(
        `http://localhost:4444/car/favorite/${cNo}`,
        {
          user_uno: user_uno,
          favorite: favorite,
        }
      );
      console.log("favorite updated", response.data);
    } catch (err) {
      console.error("error updating favorite", err);
    }
  };

  //현재 페이지에 해당하는 차량리스트
  const indexofLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexofLastItem - itemsPerPage;
  const currentItems = sortedCarList.slice(indexofFirstItem, indexofLastItem);

  //페이지네이션 버튼 클릭 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedCarList.length / itemsPerPage);

  // 찜하기 기능: favorite 값 토글

  function modal() {}

  const showPop = (message) => {
    setPopMsg(message);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  return (
    <CarListOutputWrap>
      {show && <div className="popup">{popMsg}</div>}

      <div className="outTop">
        <strong>전체 {carList.length}</strong>

        <select value={sortOption} onChange={handleSortChange}>
          <option value="전체">전체</option>
          <option value="최신순">최신순</option>
          <option value="낮은가격순">낮은가격순</option>
          <option value="높은가격순">높은가격순</option>
          <option value="주행거리">주행거리짧은순</option>
        </select>
      </div>
      <ul>
        {currentItems.map((car) => (
          <li
            key={car.cNo}
            onClick={() => {
              navigate(`/detailmain/${car.cNo}`, { state: car });
            }}
          >
            <div className="img">
              <img
                src={`http://localhost:4444${car.image}`}
                alt=""
                // onError={(e) => (e.target.src = "/images/placeholder.png")}
                // 깜빡이~
              />
            </div>
            <p className="carName">{car.name}</p>
            <p>{car.year}년식</p>
            <p>
              {car.fueltype} <IoCarSport /> {car.mileage}km
            </p>
            <p className="price">{formatPrice(car.price)}</p>

            <button
              className="ZimBtn"
              onClick={(e) => {
                e.stopPropagation();
                //favorite 상태를 먼저 토글하고, 그 결과를 newstatus에 저장
                // const newstatus = !favoriteStates[car.cNo];
                toggleFavorite(car.cNo); //favorite 상태를 토글함
                // 찜 상태를 서버에 업데이트
                //updateFavoriteStatus(user_uno, car.cNo, newstatus ? 1 : 0);
              }}
            >
              {favoriteStates[car.cNo] ? (
                <AiFillHeart color="red" />
              ) : (
                <AiOutlineHeart />
              )}
            </button>

            {modalOn && (
              <div
                className="modal-container"
                ref={modalRef}
                onClick={(e) => {
                  if (e.target === modalRef.current) {
                    e.stopPropagation();
                    setModalOn(false);
                  }
                }}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>로그인 후 사용해 주시길 바랍니다.</p>
                  <div className="modal-buttons">
                    <button
                      className="modal-close-btn"
                      onClick={() => {
                        setModalOn(false);
                        navi("/login");
                      }}
                    >
                      로그인 이동
                    </button>
                    <button
                      className="modal-close-btn"
                      onClick={() => setModalOn(false)}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </CarListOutputWrap>
  );
};

export default CarListOutput;

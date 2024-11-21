import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ListGroupItem,
  CollapseContent,
  StyledWishList,
  WishListItem,
  WishListContainer,
  PopUp,
} from "./mypageStyle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formPrice";

import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const WishList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [wishlist, setWishlist] = useState([]); // wishlist 데이터를 저장할 상태
  const user_uno = localStorage.getItem("uNo"); // localStorage에서 uNo로 가져오기

  const [popMsg, setPopMsg] = useState("");
  const [show, setShow] = useState(false);

  const location = useLocation();
  const car = location.state;
  console.log(car);

  // const navigate= useNavigate();

  const toggleCollapse = () => {
    setIsOpen((prev) => {
      console.log("isOpen 상태 변경:", !prev); // 상태 변경 확인
      return !prev;
    });
  };

  // useEffect로 데이터 가져오기
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4444/car?user_uno=${user_uno}`
          // {
          //   // 백엔드에서 만든 API 호출(프론트랑 서버 주소 다르니깐 명시)
          //   params: { user_uno },
          // }
        );
        const { wishList } = response.data;
        setWishlist(wishList || []); // 데이터를 상태에 저장
        console.log("위시리스트 데이터 상태에 저장 성공");
        console.log(wishList); // 데이터를 콘솔에 출력
        console.log("위시리스트의 user_uno", user_uno);
      } catch (error) {
        // console.error('Failed to fetch wishlist:', error);
        console.log("위시리스트 데이터 가져오기 실패 : " + error);
      }
    };
    fetchWishlist();
    console.log("fetchWishlist 함수 호출 성공");
  }, [user_uno]);

  // 하트를 눌렀을 때 리스트에서 제거하지 않고 favorite 값을 0으로만 설정
  const toggleFavorite = async (cNo, currentFavorite) => {
    // 1. favorite 값을 토글 (0 또는 1로 설정)
    const newFavorite = currentFavorite === 1 ? 0 : 1; // 현재 값에 따라 0과 1로 토글

    try {
      // 1. 클릭한 항목의 favorite 값을 0으로 설정하여 즉시 색상이 회색으로 바뀌도록 함
      setWishlist((prevWishlist) =>
        prevWishlist.map(
          (car) => (car.cNo === cNo ? { ...car, favorite: newFavorite } : car) // 해당 차량의 favorite 값을 새 값으로 변경
          // car.cNo === cNo ? { ...car, favorite: 0 } : car  // 클릭한 항목의 favorite 값만 0으로 바꿈
        )
      );
      console.log("favorite 값이 0으로 설정됨");

      // 2. favorite 값을 0으로 변경하는 요청을 백엔드에 보냄
      await axios.put(`http://localhost:4444/car/favorite/${cNo}`, {
        user_uno: user_uno,
        favorite: newFavorite,
      });
      console.log("백엔드에 favorite 값 업데이트 요청 성공");

      popshow(
        newFavorite === 0
          ? "찜 목록에서 삭제되었습니다!"
          : "찜 목록에 추가되었습니다!"
      );
    } catch (error) {
      console.log("favorite 값 업데이트 실패: " + error);
    }
  };

  const popshow = (message) => {
    setPopMsg(message);
    setShow(true);
    setTimeout(() => {
      setShow(false);
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <PopUp>{show && <div className="popup">{popMsg}</div>}</PopUp>
      {console.log(wishlist)} {/* 렌더링 전에 데이터를 출력 */}
      <ListGroupItem onClick={toggleCollapse}>
        찜한 차 {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </ListGroupItem>
      {isOpen && (
        <CollapseContent>
          <WishListContainer>
            <StyledWishList>
              {wishlist && wishlist.length === 0 ? (
                <p>찜한 차량이 없습니다.</p>
              ) : (
                wishlist.map((car) => (
                  <WishListItem key={car.cNo}>
                    <Link to={`/detailmain/${car.cNo}`} state={car}>
                      <img
                        src={`http://localhost:4444${car.image}`}
                        alt={car.name}
                      />{" "}
                      {/* 이 코드 의문.. */}
                    </Link>
                    {/* <a onClick ={() => navigate(`/detailmain/${car.cNo}`, { state: car })}> {car.name} </a> */}
                    <Link to={`/detailmain/${car.cNo}`} state={car}>
                      {car.name}
                    </Link>
                    <p>주행거리:{car.mileage}km</p>
                    <p>가격:{formatPrice(car.price)}</p>
                    {/* <a href={`/detailmain/${car.cNo}`}>{car.name}</a> */}
                    {/* () => navigate(`/detailuser/${car.cNo}`, { state: car }) */}

                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={() => toggleFavorite(car.cNo, car.favorite)} // 하트를 누르면 해당 차량의 favorite 값만 0으로 변경
                      style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: car.favorite === 1 ? "red" : "gray",
                      }}
                    />
                  </WishListItem>
                ))
              )}
            </StyledWishList>
          </WishListContainer>
        </CollapseContent>
      )}
    </>
    // <>
    //   <ListGroupItem onClick={toggleCollapse}>
    //     찜한 차 <i className="fas fa-chevron-down action-icon"></i>
    //   </ListGroupItem>
    //   {isOpen && (
    //     <CollapseContent>
    //       <WishListContainer>
    //         <WishList>
    //           <WishListItem>
    //             <img src="/src/assets/images/car.jpg" alt="기아 더 뉴 카니발" />
    //             <a href="/car-details/1.html">기아 더 뉴 카니발</a>
    //             <i className="fas fa-heart wish-icon"></i>
    //           </WishListItem>
    //           {/* 다른 항목들 */}
    //         </WishList>
    //       </WishListContainer>
    //     </CollapseContent>
    //   )}
    // </>
  );

  //이는 styled components css로 바꾸기 전 걍 div로 렌더링만 한거
  // return (
  //   <>
  //     <li className="list-group-item" onClick={toggleCollapse}>
  //       찜한 차 <i className="fas fa-chevron-down action-icon"></i>
  //     </li>
  //     {isOpen && (
  //       <div id="wishlist" className="collapse-content">
  //         <div className="wish-list-container">
  //           <ul className="wish-list">
  //             <li>
  //               <img src="/src/assets/images/car.jpg" alt="기아 더 뉴 카니발" />
  //               <a href="/car-details/1.html">기아 더 뉴 카니발</a>
  //               <i className="fas fa-heart wish-icon"></i>
  //             </li>
  //             <li>
  //               <img src="/src/assets/images/car.jpg" alt="현대 아반떼" />
  //               <a href="/car-details/2.html">현대 아반떼</a>
  //               <i className="fas fa-heart wish-icon"></i>
  //             </li>
  //             {/* 추가 리스트 항목들 */}
  //           </ul>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
};

export default WishList;

// MyPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileInfo from "./ProfileInfo";
import OrderHistory from "./OrderHistory";
import WishList from "./Wish";
import SoldItems from "./SoldItems";
import { Link } from "react-router-dom";
import { MyPageWrap } from "./mypageStyle";

const MyPage = () => {
  const [userData, setUserData] = useState({ wishList: [], soldItems: [] });
  const [loading, setLoading] = useState(true);
  const user_uno = localStorage.getItem("uNo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4444/car?user_uno=${user_uno}`
        );
        const { wishList, soldItems } = response.data;
        //가져온 데이터 상태에 저장

        setUserData({ wishList, soldItems });
        console.log("데이터 요청 성공", { wishList, soldItems });
      } catch (error) {
        console.error("데이터 요청 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); //데이터 가져오기 함수 실행
  }, [user_uno]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="mypage-container">
      {/*프로필 정보와 수정 버튼 */}
      <div className="profile-section">
        <ProfileInfo id={`user${user_uno}`} />
      </div>
      {/*찜한 목록과 판매한 목록 */}
      <div className="list-section">
        <WishList wishList={userData.wishList} />
        <SoldItems soldItems={userData.soldItems} />
        <Link to="/EditInfo">
          <button classname="modify">회원정보 수정</button>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;

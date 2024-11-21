import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MyPageContainer,
  MyPageHeader,
  ProfileInfo as StyledProfileInfo,
} from "./mypageStyle";

const ProfileInfo = () => {
  const [name, setName] = useState("");
  const uNo = localStorage.getItem("uNo");

  useEffect(() => {
    const fetchUserName = async () => {
      if (uNo) {
        try {
          const response = await axios.get(
            `http://localhost:4444/header/${uNo}`
          );
          const userName = response.data.name;
          setName(userName);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserName();
  }, [uNo]);
  return (
    <MyPageContainer>
      <div>
        <MyPageHeader>마이 페이지</MyPageHeader>
      </div>

      <StyledProfileInfo>
        <div>
          <p>{`${name}님, 안녕하세요`}</p>
        </div>
        <nav className="icons" aria-label="User actions">
          <a href="/">
            <i className="fas fa-home home"></i>
          </a>
          <i className="fas fa-bell bell"></i>
        </nav>
      </StyledProfileInfo>
    </MyPageContainer>
  );
};

//이는 styled components css로 바꾸기 전 걍 div로 렌더링만 한거
// const ProfileInfo = ({ id }) => {
//   return (
//     <main className="mypage-container">
//       <div>
//         <h1>마이 페이지</h1>
//       </div>

//       <section className="profile-info">
//         <div>
//           <p>{`${id}님, 안녕하세요`}</p>
//         </div>
//         <nav className="icons" aria-label="User actions">
//           <a href="/main.html"><i className="fas fa-home"></i></a>
//           <i className="fas fa-bell"></i>
//         </nav>
//       </section>
//     </main>
//   );
// };

export default ProfileInfo;

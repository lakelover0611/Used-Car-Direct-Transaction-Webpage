// mypageStyle.js
import styled from 'styled-components';

export const MyPageWrap = styled.div`
width: 100%;
  max-width: 1000px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .modify{margin-top:50px;
    border: 1px solid #007bff;
    color: #007bff;
    background: #fff;
    border-radius: 8px;
    width: 200px; height: 50px;
    &:hover{
      color: #fff;
      background: #007bff;
    }
  }
`
export const PopUp =styled.div`

.popup{
    position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  z-index: 1000;
  animation: fadein 0.3s, fadeout 0.3s 1.7s; /* 팝업 애니메이션 */
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
`

export const MyPageContainer = styled.main`
  margin: 0 auto;
  margin-top: 50px;
`;

export const MyPageHeader = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

export const ProfileInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;

  div {
    /* display: flex;
    flex-direction: column; */
    font-size: 1rem;
  }

  .icons {
    display: flex;
    gap: 15px;
    font-size: 1.5rem;
    
    i {
      &:hover {
        cursor: pointer;
        color: #007bff;
      }
    }
  }
  p {
  font-size: 1rem;
}

  p:hover {
    font-weight: bold;
  }
`;

export const ListGroupItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  padding: 15px 0;
  border: none;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  i {
    font-size: 1rem;
    color: #6c757d;
  }

  &:hover .action-icon {
    color: black;
  }
`;

export const CollapseContent = styled.div`
width: 100%;
max-width: 1000px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

export const WishListContainer = styled.div`
  max-height: 300px;
`;

export const AddIcon = styled.a`
  font-size: 20px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

export const StyledWishList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const WishListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;

  img {
    width: 120px;
    height: 80px;
    margin-right: 20px;
    border-radius: 8px;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column; /* 텍스트를 세로로 정렬 */
    justify-content: center;
    flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
    gap: 5px; /* 텍스트 간격 */
  }

  a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 부모 요소의 색상 상속 */
    font-weight: bold;

    &:hover {
      color: #007bff; /* 호버 시 파란색 */
    }
  }

  .wish-icon {
    font-size: 1.8rem;
    cursor: pointer;
    margin-left: 20px;
    color: ${(props) => (props.favorite ? 'red' : 'gray')};
  }

  .car-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  thead th {
    background-color: #f8f9fa;
  }
`;

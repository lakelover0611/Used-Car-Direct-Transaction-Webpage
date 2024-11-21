import styled from 'styled-components';

export const CarListMainWrap = styled.div`
  padding: 20px;
  box-sizing: border-box;
`;

export const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
  width: 100%;
`;

export const CarListBannerWrap = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  select {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CarListOutputWrap = styled.div`
  width: 75%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;


  .modal-container {
  width: 100%;
  height: 150px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 최상단에 표시 */
}

.modal-content {
  background-color: #fff;
  width: 300px;
  padding: 20px;
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  text-align: center; /* 텍스트 중앙 정렬 */
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
}
.modal-buttons {
  display: flex; /* 가로 정렬 */
  justify-content: space-between; 
  width: 100%; 
  gap: 10px; 
}

.modal-close-btn {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.modal-close-btn:hover {
  background-color: #0056b3;
}


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

  .outTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #999;
    margin-bottom: 20px;

    strong {
      font-size: 20px;
      font-weight: bold;
    }

    select {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 16px;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    li {
      width: calc(32% - 15px);
      list-style: none;
      border: 1px solid #ddd;
      padding: 5px;
      border-radius: 8px;
      position: relative;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .img {
        width: 100%;
        height: 150px;
        margin-bottom: 16px;
        background-color: #f4f4f4;
        object-fit: cover;

        img {
          border-top-right-radius: 6px;
          border-top-left-radius:6px ;
          width: 100%;
          height: 100%;
        }
      }

      .carName {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .price {
        font-size: 20px;
        color: #007bff;
        font-weight: bold;
      }

      .sub-price {
        font-size: 14px;
        color: #888;
        margin-bottom: 16px;
      }

      .ZimBtn {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 24px;
        color: #888;

        /* &:hover {
          color: red;
        } */
      }
    }
  }

  /* 페이지네이션 스타일 */
  .pagination {
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    margin-top: 20px; /* 상단 여백 */
  }

  .pagination button {
    background-color: #f0f0f0; /* 기본 배경색 */
    border: none; /* 테두리 없애기 */
    color: #333; /* 텍스트 색상 */
    padding: 10px 15px; /* 여백 */
    margin: 0 5px; /* 버튼 간 간격 */
    cursor: pointer; /* 마우스 커서 포인터 */
    border-radius: 5px; /* 둥근 모서리 */
    transition: background-color 0.3s; /* 배경색 전환 효과 */
  }

  .pagination button:hover {
    background-color: #e0e0e0; /* hover 시 배경색 변경 */
  }

  .pagination button.active {
    background-color: #007bff; /* 현재 페이지 버튼 배경색 */
    color: white; /* 현재 페이지 버튼 텍스트 색상 */
  }
`;

export const CarListTopWrap = styled.div`
  .TopCard {
    text-align: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      margin-bottom: 20px;
    }

    input[type='text'] {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;
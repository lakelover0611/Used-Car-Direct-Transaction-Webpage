import styled from 'styled-components';

export const DetailMainWrap = styled.div`
   display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .main-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;
        padding: 16px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #f9f9f9;
        margin-bottom: 20px;
    }

    .info-text {
        flex: 1;
        margin-right: 20px;
        
        h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        p {
            font-size: 16px;
            color: #666;
        }
    }

    .price-details {
        text-align: right;
        margin-left: auto;
        
        .price,
        .monthly-payment {
            font-size: 18px;
            color: #000;
            margin: 5px 0;
        }

        .price strong,
        .monthly-payment strong {
            color: #007bff;
            font-size: 24px;
            margin-left: 5px;
        }
    }

    .contact-buttons {
        display: flex;
        gap: 10px;
        margin-left: 20px;
        button {
            background-color: #fff;
            border: 1px solid #007bff;
            color: #007bff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 15px;
            cursor: pointer;

            &:hover {
                background-color: #007bff;
                color: #fff;
            }
        }
        .onBtn{width:400px; font-size:20px;}
    }

    .image-section {
        width: 100%;
        max-width: 1200px;
        margin: 20px 0;

        img {
            width: 100%;
            height: 70vh;
            border-radius: 8px;
        }
    }

    .info-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 1200px;
    }

    .info-card {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        p{margin-bottom:10px;}
    }

    h3 {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 20px;
    }

    @media (max-width: 768px) {
        .main-info {
            flex-direction: column;
            align-items: center;
        }

        .image-section {
            max-width: 100%;
        }

        .info-section {
            flex-direction: column;
            align-items: center;
        }

        .info-card {
            width: 100%;
            margin-bottom: 20px;
        }
    }
`;

export const DetailUserWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .image-section {
    width: 100%;
  display: flex;  /* 이미지가 가운데로 정렬되도록 flex 사용 */
  justify-content: center;  /* 수평 중앙 정렬 */
  align-items: center;  /* 수직 중앙 정렬 (필요 시) */
  margin-bottom: 20px;
    img{ width: 100%;
    max-width: 1200px;
    height: auto;
    object-fit: cover;
    border-radius: 8px;}
  }

  .main-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    

    .info-card {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      
      h3{font-weight:800; margin-bottom:20px; font-size:20px;}

      span {
        min-width: 80px;
        margin-right: 10px;
      }

      .input-group {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        input {
          flex: 1;
          height: 40px;
          padding: 8px 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s;

          &:focus {
            border-color: #007bff;
          }
        }
      }
    }

    .sellState {
      margin-top: 10px;
      h3{font-weight:800; font-size:20px; margin-bottom:20px;}

      .sale-status {
    display: flex;
    align-items: center;
    gap: 10px;  /* select와 텍스트 간격 */

      select {
        width: 150px;
        height: 40px;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
        appearance: none;
        background: url('/public/arrow-down.svg') no-repeat right 10px center;
        background-color: #fff;
        cursor: pointer;
        outline: none;

        &:focus {
          border-color: #007bff;
        }
      }
      .status-change-hint {
      font-size: 14px;
      color: #007bff;
      animation: bounce 1.5s infinite;
      cursor: pointer;
    }
    }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

    .userBtn {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;

      button {
        width: 300px;
        height: 50px;
        background: #fff;
        color: #007bff;
        border: 1px solid #007bff;
        border-radius: 8px;
        font-size: 20px;
        cursor: pointer;

        &:hover {
          background: #007bff;
          color: #fff;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .main-info {
      flex-direction: column;
      align-items: center;
    }

    .info-section {
      flex-direction: column;
      align-items: center;
    }
  }
`;
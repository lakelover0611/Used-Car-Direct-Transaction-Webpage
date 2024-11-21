import styled from "styled-components";

export const EditInfoStyle = styled.div`
            background-color: #ffffff;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin: 100px 0 100px;
            padding: 20px;

        .container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            border-radius: 10px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            /* margin-bottom: 20px; */
        }

        

        h1 {
            font-size: 1.8rem;
            font-weight: 600;
            text-align: center;
            margin-bottom: 30px;
        }

        /* container 내 label 태그를 모두 볼드체로 */
        .container label {
            /* font-weight: bold; */
            font-size: 0.9rem;
            color: #6c757d;
            font-weight: 600;
        }

        .form-control {
            border-radius: 5px;
            height: 45px;
        }

        .save-btn:disabled {
            background-color: #ccc;
        }

     
        
        .modify {
            /* background-color: #007bff;
            color: white; */
            border-radius: 5px;
            height: 45px;
            font-size: 1.1rem;
            width: 100%;
        }
        .btn-secondary {
            background-color: #f0f0f0;
            color: #6c757d;
        }
        .btn-secondary, .confirm {
            width: 48%; /* 버튼을 한 줄에 두 개 위치시키기 */
        }

        .d-flex {
            margin-top: 10px;
        }

        .back-btn {
            color: #6c757d;
            font-size: 1.5rem;
        }

        .back-btn:hover {
            color: #000000;
            /* 화살표 아이콘의 색상을 변경 */
        }

        /* 모달 스타일 */
        .modal-body p {
            margin-bottom: 20px;
        }

        .modal-footer {
            border-top: none; /* 상단에 줄 제거 */
            display: flex;
            justify-content: space-between;
        }
`
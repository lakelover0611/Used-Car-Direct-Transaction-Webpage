import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DetailUserWrap } from "./detailStyle";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailUser = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(location.state);

  const [saleChange, setSaleChange] = useState(false);

  console.log("id :", id);
  console.log("location :", location);

  useEffect(() => {
    if (!car) {
      const fetchCarData = async () => {
        try {
          const response = await axios.get(`http://localhost:4444/car/${id}`);
          setCar(response.data);
        } catch (error) {
          console.log("Error fetching car data:", error);
        }
      };
      fetchCarData();
    }
  }, [id, car]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: name === "sale" ? +value : value,
    }));

    if (name === "sale") {
      setSaleChange(true);
    }
  };

  const editUpdate = async () => {
    if (window.confirm("수정하시겠습니까?")) {
      try {
        console.log("car", car);

        await axios.put(`http://localhost:4444/car/${id}`, {
          name: car.name,
          brand: car.brand,
          year: car.year,
          mileage: car.mileage,
          fueltype: car.fueltype,
          price: car.price,
          sale: car.sale,
        });
        console.log(car.sale);
        alert("차량 정보가 수정되었습니다!");

        if (saleChange) {
          navigate("/");
        } else {
          navigate(`/detailmain/${id}`, { state: car });
        }
      } catch (error) {
        console.error("car update error ", error);
      }
    }
  };
  console.log(car.sale);

  return (
    <DetailUserWrap>
      <div className="image-section">
        <img src={`http://localhost:4444${car.image}`} alt="" />
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>차량 정보</h3>
          <div className="input-group">
            <span>모델명: </span>
            <input
              type="text"
              name="name"
              value={car.name}
              onChange={inputChange}
            />
          </div>
          <div className="input-group">
            <span>브랜드: </span>
            <input
              type="text"
              name="brand"
              value={car.brand}
              onChange={inputChange}
            />
          </div>
          <div className="input-group">
            <span>연식: </span>
            <input
              type="number"
              name="year"
              value={car.year}
              onChange={inputChange}
            />
          </div>
          <div className="input-group">
            <span>주행 거리: </span>
            <input
              type="number"
              name="mileage"
              value={car.mileage}
              onChange={inputChange}
            />
          </div>
          <div className="input-group">
            <span>연료: </span>
            <input
              type="text"
              name="fueltype"
              value={car.fueltype}
              onChange={inputChange}
            />
          </div>
          <div className="input-group">
            <span>가격: </span>
            <input
              type="number"
              name="price"
              value={car.price}
              onChange={inputChange}
            />
          </div>
        </div>

        <div className="sellState">
          <h3>판매 상태</h3>
          <div className="sale-status">
            <select name="sale" value={car.sale} onChange={inputChange}>
              {car.sale === 0 ? (
                <>
                  <option value={0}>판매중</option>
                  <option value={1}>판매완료</option>
                </>
              ) : (
                <>
                  <option value={1}>판매완료</option>
                  <option value={0}>판매중</option>
                </>
              )}
            </select>
            <span className="status-change-hint">← click 판매 상태 변경</span>
          </div>
        </div>

        <div className="userBtn">
          <button onClick={editUpdate}>수정 완료</button>
          <button onClick={() => navigate(-1)}>취소</button>
        </div>
      </div>
    </DetailUserWrap>
  );
};

export default DetailUser;

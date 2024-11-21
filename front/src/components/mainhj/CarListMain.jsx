import React, { useEffect, useState } from "react";
import CarListBanner from "./CarListBanner";
import CarListOutput from "./CarListOutput";
import CarListTop from "./CarListTop";
import { CarListMainWrap, ContentWrap } from "./carListStyle";
import axios from "axios";

const CarListMain = () => {
  const [carList, setCarList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  const [input, setInput] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    year: "",
    mileage: "",
    fueltype: "",
    price: "",
    color: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const carListData = async () => {
      const user_uno = localStorage.getItem("uNo"); // 유저 번호 가져오기
      console.log("user_uno 값:", user_uno); // 이 값을 먼저 확인해보세요
      if (!user_uno) {
        console.log("user_uno가 존재하지 않습니다.");
        return; // 값이 없으면 요청을 중단합니다.
      }
      try {
        const response = await axios.get(
          `http://localhost:4444/car?user_uno=${user_uno}`
        );
        // 데이터를 확인하기 위해 콘솔 출력
        console.log("서버에서 받은 데이터:", response.data); // 이 줄을 추가하세요
        const { carList } = response.data;
        setCarList(carList);
        console.log("carList 상태:", carList);
        console.log("carlist 데이터 상태에 저장 성공", carList);

        setFilteredCars(carList);
      } catch (error) {
        console.error("carList 데이터 상태에 저장 실패", error);
      }
    };
    carListData();
  }, []);

  useEffect(() => {
    const filtered = filterCars(carList, filters, search);
    setFilteredCars(filtered);
    console.log("filteredCars 상태:", filtered);
    setCurrentPage(1);
  }, [filters, search, carList]);

  const filterCars = (cars, filters, search) => {
    return cars.filter((car) => {
      const isBrandMatch = !filters.brand || car.brand === filters.brand;
      const isMileageMatch =
        !filters.mileage || filterMileage(car.mileage, filters.mileage);
      const isYearMatch =
        !filters.year || car.year === parseInt(filters.year, 10);
      const isPriceMatch =
        !filters.price || filterPrice(car.price, filters.price);
      const isSearchMatch =
        !search || car.name.toLowerCase().includes(search.toLowerCase());
      const isFuelTypeMatch =
        !filters.fueltype || car.fueltype === filters.fueltype;
      const isColorMatch = !filters.color || car.color === filters.color;

      return (
        isBrandMatch &&
        isMileageMatch &&
        isYearMatch &&
        isPriceMatch &&
        isSearchMatch &&
        isFuelTypeMatch &&
        isColorMatch
      );
    });
  };

  const filterMileage = (carMileage, selectedMileageRange) => {
    const [minMileage, maxMileage] = selectedMileageRange
      .split("-")
      .map((v) => (v === "+" ? Number.MAX_SAFE_INTEGER : +v));
    return (
      carMileage >= minMileage &&
      carMileage <= (maxMileage || Number.MAX_SAFE_INTEGER)
    );
  };

  const filterPrice = (carPrice, selectedPriceRange) => {
    const priceLimits = {
      "2000-5000": [2000, 5000],
      "5000-7000": [5000, 7000],
      "7000-10000": [7000, 10000],
      "10000+": [10000, Number.MAX_SAFE_INTEGER],
    };

    const [minPrice, maxPrice] = priceLimits[selectedPriceRange] || [
      0,
      Number.MAX_SAFE_INTEGER,
    ];
    return carPrice >= minPrice && carPrice <= maxPrice;
  };

  const searchValue = (value) => {
    setSearch(value);

    // const matchedCars = carList.filter(car => car.name.toLowerCase().includes(value.toLowerCase()));

    // if(matchedCars.length > 0){
    //     const carBrand = matchedCars.brand;
    //     setFilters(prevCar =>({
    //         ...prevCar,
    //         brand:carBrand,
    //     }))
    // }
  };

  return (
    <CarListMainWrap>
      <CarListTop setSearch={searchValue} input={input} setInput={setInput} />
      <ContentWrap>
        <CarListBanner
          filters={filters}
          setFilters={setFilters}
          setSearch={setSearch}
          setInput={setInput}
        />
        <CarListOutput
          carList={filteredCars}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentWrap>
    </CarListMainWrap>
  );
};

export default CarListMain;

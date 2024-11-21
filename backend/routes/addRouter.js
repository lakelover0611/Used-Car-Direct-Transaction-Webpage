const express = require("express");
const router = express.Router();
const db = require("../config/dbpools"); // MySQL 연결 설정
const multer = require("multer");
const path = require("path");

// Multer 설정: 이미지 파일을 uploads 폴더에 저장
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 파일 저장 경로
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름을 현재 시간과 확장자로 생성
  },
});

const upload = multer({ storage: storage }); // Multer를 사용하여 파일 업로드 설정

// MySQL 데이터베이스에 차량 정보와 이미지 경로 저장
router.post("/", upload.single("carImage"), async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { name, brand, year, mileage, fueltype, price, color, user_uno } =
      req.body;
    console.log("Received Data:", {
      name,
      brand,
      year,
      mileage,
      fueltype,
      price,
      color,
      user_uno,
    }); //전달된 데이터 확인

    const carImage = req.file ? req.file.filename : null; // 업로드된 이미지 파일의 파일명 저장
    const imagePath = `/uploads/${carImage}`; // 이미지 경로 설정

    const query =
      "INSERT INTO car (name, brand, year, mileage, fueltype, price, color, image, user_uno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Promise 기반의 query 함수 호출
    const [carResult] = await connection.query(query, [
      name,
      brand,
      year,
      mileage,
      fueltype,
      price,
      color,
      imagePath,
      user_uno,
    ]);

    const car_cno = carResult.insertId;
    // .then(res=>console.log("abc"+ res))
    // const [result] = await db.query(query, [name, brand, year, mileage, fueltype, price, color, user_uno]);

    const boardSql = `
    INSERT INTO board (sale, date, user_uno, car_cno) 
    VALUES (0, NOW(), ? , ?);
    `;
    await connection.query(boardSql, [user_uno, car_cno]);

    //현재 존재하는 모든 유저 조회
    const [users] = await connection.query("select uNo from user");

    //해당 차량에 대해 모든 유저에 대한 favorite=0으로 설정
    const favoritequeries = users.map((user) =>
      connection.query(
        `Insert into favorite (user_uno, car_cno, favorite) values(?,?,0)`[
          (user.uNo, car_cno)
        ]
      )
    );
    await promiseHooks.all(favoritequeries); //모든 favorite 쿼리를 병렬로 실행
    await connection.commit();

    // console.log(result); // 삽입 결과 로그 출력
    res.status(200).send("차량 데이터가 성공적으로 추가되었습니다.");
    console.log(user_uno);
  } catch (err) {
    await connection.rollback();
    console.error("차량 데이터를 삽입하는 도중 오류 발생:", err);
    res.status(500).send("서버 오류");
  } finally {
    connection.release();
  }
});

module.exports = router;

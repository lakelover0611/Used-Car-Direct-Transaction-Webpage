const pool = require("../config/dbpools");

const carinfo = async (req, res) => {
  const { user_uno } = req.query;

  // // user_uno가 없을 경우 기본값 1로 설정 (임시 테스트용)
  // if (!user_uno) {
  //   user_uno=7
  //   console.log("user_uno가 없어서 기본값 1로 설정했습니다.");
  // }

  console.log("유저번호:", user_uno);
  const sql = `select car.*, 
  user.name as seller_name,
  user.email as seller_email, 
  user.tel as seller_tel, 
  board.date, 
  board.sale,
  COALESCE(favorite.favorite, 0) AS favorite
  from car 
  LEFT JOIN favorite 
  on car.cNo = favorite.car_cNo and favorite.user_uNo=?
  join user 
  on car.user_uno=user.uNo
  join board 
  on car.cNo=board.car_cno
  where board.sale=0
  order by board.date DESC`;
  try {
    const [data] = await pool.query(sql, [user_uno]);

    //필터링: 판매자가 등록한 차 목록과 찜한 목록 분리
    const soldItems = data.filter((car) => car.user_uno === Number(user_uno));
    const wishList = data.filter((car) => car.favorite === 1);
    const carList = data;
    //const carList = data.filter((car) => car.sale === 0); // 판매 중인 차량
    // console.log("soldItems 데이터 구조:", soldItems); // 콘솔 출력

    res.status(200).json({
      soldItems,
      wishList,
      carList,
    });
  } catch (error) {
    console.error("데이터 가져오는 중 오류 발생:", error);
    res.status(500).json({ message: "데이터 가져오는 중 오류 발생" });
  }
};

module.exports = carinfo;

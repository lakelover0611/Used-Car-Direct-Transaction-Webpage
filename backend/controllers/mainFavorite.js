const pool = require("../config/dbpools");

const updateFavorite = async (req, res) => {
  const { id: cNo } = req.params;
  const { user_uno, favorite } = req.body;

  console.log("백엔드로 요청 들어옴");
  console.log("차번호", cNo);
  console.log("하트 상태", favorite);
  console.log("유저 번호", user_uno);
  console.log("Request Body:", req.body);
  const sql = `UPDATE favorite SET favorite=? WHERE user_uNo= ? AND car_cNo = ?`;

  try {
    const [result] = await pool.query(sql, [favorite, user_uno, cNo]);
    res.status(200).json({ message: "favorite updated", result });
  } catch (err) {
    console.error("error updating favorite:", err);
    res.status(500).send("error occured while updating favorite status");
  }
};

module.exports = updateFavorite;

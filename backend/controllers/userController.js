// userController.js
const pool = require("../config/dbpools");
const bcrypt = require("bcrypt");

const saveUser = async (req, res) => {
  const { name, userid, passwd, tel, email } = req.body;
  if (!name || !userid || !passwd || !tel || !email) {
    return res.status(400).json({ message: "Feild Error" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwd, saltRounds);
    console.log("Generated Hashed Password:", hashedPassword);

    //1. 새로운 유저 추가
    const [result] = await connection.query(
      "INSERT INTO user (name, userid, passwd, tel, email) VALUES (?, ?, ?, ?, ?)",
      [name, userid, hashedPassword, tel, email]
    );
    const userId = result.insertId; //새로 생성된 유저의 id

    //현재 존재하는 모든 차량 조회
    const [cars] = await connection.query("select cNo from car");

    //해당 유저에 대해 모든 차량에 대한 favorite=0으로 설정
    const favoritequeries = cars.map((car) =>
      connection.query(
        "INSERT into favorite (user_uno, car_cno, favorite) values (?,?,0)",
        [userId, car.cNo]
      )
    );
    await promise.all(favoritequeries); //모든 favorite 쿼리를 병렬로 실행
    await connection.commit();
    return res
      .status(201)
      .json({ id: userId, name, userid, passwd: hashedPassword, tel, email });
  } catch (error) {
    console.error(error);
    await connection.rollback();
    res.status(500).send("Error");
  } finally {
    connection.release();
  }
};

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    const emailExists = rows.length > 0;
    res.json({ exists: emailExists });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

const loginUser = async (req, res) => {
  const { userid, passwd } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE userid = ?", [
      userid,
    ]);

    if (rows.length > 0) {
      const user = rows[0];
      const match = await bcrypt.compare(passwd, user.passwd);

      if (match) {
        res.json({ success: true, uNo: user.uNo });
      } else {
        res.json({ success: false, message: "비밀번호가 일치하지 않습니다" });
      }
    } else {
      res.json({ success: false, message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    console.error("로그인 중 오류:", error);
    res.status(500).send("서버 오류");
  }
};

const setUser = async (req, res) => {
  const { uNo } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT name, userid, tel, email, passwd FROM user WHERE uNo = ?",
      [uNo]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

const editUser = async (req, res) => {
  const { uNo, currentPasswd, tel, email, newpassword } = req.body;

  if (!uNo || !currentPasswd || !newpassword) {
    return res.status(400).send("All fields are required");
  }

  try {
    // DB에서 기존 유저 정보 가져오기
    const [rows] = await pool.query("SELECT passwd FROM user WHERE uNo = ?", [
      uNo,
    ]);

    if (rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = rows[0];

    // 현재 비밀번호와 저장된 비밀번호 비교
    const isMatch = await bcrypt.compare(currentPasswd, user.passwd);
    if (!isMatch) {
      return res.status(400).send("Current password is incorrect");
    }

    // 새로운 비밀번호 해시
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    const [result] = await pool.query(
      "UPDATE user SET passwd = ?, tel = ?, email = ? WHERE uNo = ?",
      [hashedPassword, tel, email, uNo]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, uNo, passwd: hashedPassword, tel, email });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

const showName = async (req, res) => {
  const { uNo } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT name, tel, email FROM user WHERE uNo = ?",
      [uNo]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

const findId = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT userid FROM user WHERE name = ? AND email = ?",
      [name, email]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

const findPw = async (req, res) => {
  const { name, userid, email } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE name = ? AND userid = ? AND email = ?",
      [name, userid, email]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(500).send("Error");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
};

const changePw = async (req, res) => {
  const { newpasswd, name, userid, email } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpasswd, salt);
    const [result] = await pool.query(
      "UPDATE user SET passwd = ? WHERE name = ? AND userid = ? AND email = ?",
      [hashedPassword, name, userid, email]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).send("Error");
  }
};

module.exports = {
  saveUser,
  verifyEmail,
  loginUser,
  setUser,
  editUser,
  showName,
  findId,
  findPw,
  changePw,
};

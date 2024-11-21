// dbpools.js

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost", // 로컬 서버일 경우 localhost
  user: "root", // MySQL의 기본 root 계정
  password: "1234", // 설정한 MySQL 비밀번호
  port: 3306, // MySQL 기본 포트
  database: "carDB", // 사용하려는 데이터베이스 이름
  connectionLimit: 10, // 최대 연결 수
  waitForConnections: true, // 대기열에서 연결 기다리기 허용
});

module.exports = pool;

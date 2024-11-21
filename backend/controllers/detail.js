const pool = require('../config/dbpools');

const deleteCar = async (req, res) => {
    const { id } = req.params; //차량번호
    const connection = await pool.getConnection();
    try {
        console.log(`Deleting car with id: ${id}`);
        await connection.beginTransaction(); // 트랜잭션 시작
        // favorite 테이블에서 해당 차량의 참조 삭제
        const [favoriteResult] = await connection.query(
            'DELETE FROM favorite WHERE car_cNo = ?',
            [id]
        );
        console.log(`Favorite delete result: ${favoriteResult.affectedRows} rows affected`);
        // board 테이블에서 해당 차량의 참조 삭제
        const [boardResult] = await connection.query(
            'DELETE FROM board WHERE car_cno = ?',
            [id]
        );
        console.log(`Board delete result: ${boardResult.affectedRows} rows affected`);
        // car 테이블에서 차량 삭제
        const [carResult] = await connection.query(
            'DELETE FROM car WHERE cNo = ?',
            [id]
        );
        console.log(`Car delete result: ${carResult.affectedRows} rows affected`);
        if (carResult.affectedRows === 0) {
            await connection.rollback(); // 롤백
            return res.status(404).json({ message: '해당 차량을 찾을 수 없습니다.' });
        }
        await connection.commit(); // 커밋
        res.status(200).json({ message: '차량이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        await connection.rollback(); // 오류 시 롤백
        console.error('차량 삭제 중 오류 발생:', error);
        res.status(500).json({ message: '차량 삭제 중 오류 발생', error });
    } finally {
        connection.release(); // 연결 해제
    }
};


const updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, brand, year, mileage, fueltype, price, sale } = req.body; // sale 추가

  console.log("Received update request for ID:", id); // 로그 추가
  console.log("Update data:", req.body); // 전달된 데이터 확인

    const connection = await pool.getConnection();

    console.log("Received data for update:", req.body);
    try {
        await connection.beginTransaction();
        // car 테이블 업데이트
        const carSql = `
            UPDATE car 
            SET name = ?, brand = ?, year = ?, mileage = ?, fueltype = ?, price = ? 
            WHERE cNo = ?;
        `;
        await connection.query(carSql, [name, brand, year, mileage, fueltype, price, id]);

        const saleValue = sale !== undefined ? sale : 0;

        // board 테이블의 sale 상태 업데이트
        const boardSql = `
            UPDATE board 
            SET sale = ? 
            WHERE car_cno = ?;
        `;
        await connection.query(boardSql, [saleValue, id]);

        await connection.commit();

        res.status(200).json({ message: '차량 정보 및 판매 상태가 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        await connection.rollback();
        console.error('차량 정보 업데이트 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류' });
    } finally {
        connection.release();
    }
};

module.exports = {
    deleteCar,
    updateCar,
};
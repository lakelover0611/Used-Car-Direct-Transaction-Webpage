export const formatPrice = (price) => {
    // price가 undefined나 null일 때를 대비한 방어 코드 추가
    if (price == null) {
        return '가격 정보 없음'; // price가 없는 경우 기본 메시지 설정
    }

    if (price >= 10000) {
        const billion = Math.floor(price / 10000);
        const remainder = price % 10000;
        if (remainder === 0) {
            return `${billion}억`;
        }
        return `${billion}억 ${remainder.toLocaleString()}만원`;
    } else {
        return `${price.toLocaleString()}만원`;
    }
};
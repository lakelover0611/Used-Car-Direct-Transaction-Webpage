import { CarListBannerWrap } from './carListStyle';

const CarListBanner = ({ filters, setFilters,setSearch,setInput }) => {

    const filterChange = e => {
        const { name, value } = e.target;
        setFilters(filter => ({
            ...filter,
            [name]: value
        }));
    };
    const brandChange = e => {
        setFilters({
            brand: e.target.value,
            year: '',       
            mileage: '',   
            fueltype: '',   
            price: '',      
            color: ''       
        });
        setSearch('');
        setInput('');
    };
    return (
        <CarListBannerWrap>
            <div>
                <label htmlFor="brand">브랜드</label>
                <select id="brand" name="brand" value={filters.brand} onChange={brandChange}>
                    <option value="">전체</option>
                    <option value="현대">현대</option>
                    <option value="제네시스">제네시스</option>
                    <option value="기아">기아</option>
                    <option value="쉐보레(GM대우)">쉐보레(GM대우)</option>
                    <option value="르노코리아(삼성)">르노코리아(삼성)</option>
                    <option value="KG모빌리티(쌍용)">KG모빌리티(쌍용)</option>
                    <option value="벤츠">벤츠</option>
                    <option value="BMW">BMW</option>
                    <option value="아우디">아우디</option>
                    <option value="포르쉐">포르쉐</option>
                    <option value="미니">미니</option>
                    <option value="랜드로버">랜드로버</option>
                    <option value="폭스바겐">폭스바겐</option>
                    <option value="기타">기타</option>
                </select>
            </div>

            <div>
                <label htmlFor="year">연식(제조년도)</label>
                <select id="year" name="year" value={filters.year} onChange={filterChange}>
                    <option value="">전체</option>
                    {Array.from({ length: 45 }, (_, i) => (
                        <option key={i} value={2024 - i}>{2024 - i}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="mileage">주행거리</label>
                <select id="mileage" name="mileage" value={filters.mileage} onChange={filterChange}>
                    <option value="">전체</option>
                    <option value="0-10000">0 - 10,000km</option>
                    <option value="10000-20000">10,000 - 20,000km</option>
                    <option value="20000-30000">20,000 - 30,000km</option>
                    <option value="30000-40000">30,000 - 40,000km</option>
                    <option value="40000-50000">40,000 - 50,000km</option>
                    <option value="50000-60000">50,000 - 60,000km</option>
                    <option value="60000+">60,000km 이상</option>
                </select>
            </div>

            <div>
                <label htmlFor="fueltype">연료</label>
                <select id="fueltype" name="fueltype" value={filters.fueltype} onChange={filterChange}>
                    <option value="">전체</option>
                    <option value="가솔린">가솔린</option>
                    <option value="디젤">디젤</option>
                    <option value="LPG">LPG</option>
                    <option value="가솔린+전기">가솔린+전기</option>
                    <option value="디젤+전기">디젤+전기</option>
                    <option value="가솔린+LPG">가솔린+LPG</option>
                    <option value="가솔린+CNG">가솔린+CNG</option>
                    <option value="전기">전기</option>
                </select>
            </div>

            <div>
                <label htmlFor="price">차량 판매 가격</label>
                <select id="price" name="price" value={filters.price} onChange={filterChange}>
                    <option value="">전체</option>
                    <option value="2000-5000">2천만원 - 5천만원</option>
                    <option value="5000-7000">5천만원 - 7천만원</option>
                    <option value="7000-10000">7천만원 - 1억원</option>
                    <option value="10000+">1억 이상</option>
                </select>
            </div>

            <div>
                <label htmlFor="color">차량 색깔</label>
                <select id="color" name="color" value={filters.color} onChange={filterChange}>
                    <option value="">전체</option>
                    <option value="흰색">흰색</option>
                    <option value="검정색">검정색</option>
                    <option value="쥐색">쥐색</option>
                    <option value="은색">은색</option>
                    <option value="청색">청색</option>
                    <option value="기타">기타</option>
                </select>
            </div>
        </CarListBannerWrap>
    );
};

export default CarListBanner;

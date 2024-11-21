import React from 'react';
import { Link } from 'react-router-dom'; // Link 임포트
import { FooterWrap } from './footerStyled';

const Footer = () => {
    return (
        <FooterWrap>
            <footer>
                <div className="container">
                    <div className="row">
                        <div>
                            <h6>국산</h6>
                            <ul>
                                {/* <li><Link to="/">국산차검색</Link></li> */}
                                <li><a href="/">국산차검색</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6>수입</h6>
                            <ul>
                                <li><Link to="/">수입차검색</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h6>전기·친환경</h6>
                            <ul>
                                <li><Link to="/">전기·친환경차량</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h6>내차팔기</h6>
                            <ul>
                                <li><Link to="/">직거래 간편등록</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h6>내차진단</h6>
                            <ul>
                                <li><Link to="/">내차 진단하기</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="app-download">
                        <h3>무료 상담</h3>
                        <form>
                            <input type="text" placeholder="연락처" />
                            <button type="button">상담신청</button>
                        </form>
                    </div>

                    <div className="bottom-info">
                        <ul>
                            <li><Link to="/">회사소개</Link></li>
                            <li><Link to="/">이용약관</Link></li>
                            <li><Link to="/">개인정보처리방침</Link></li>
                        </ul>
                        <p className='bottomP1'>
                            고객센터: 1599-5455 &nbsp; FAX: 02-754-8768 &nbsp; 대표메일: trust@encar.com &nbsp;
                            주소: 서울특별시 중구 통일로2길 16<br />
                            </p>
                                <p className='bottomP2'>
                            사업자등록번호: 104-86-54476 &nbsp; 통신판매업신고: 제2014-서울중구-0393호 &nbsp; 대표자: 최세은
                        </p>
                        <p className="copyright">&copy; 2024 Encar</p>
                    </div>
                </div>
            </footer>
        </FooterWrap>
    );
};

export default Footer;

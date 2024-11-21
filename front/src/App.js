import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import CarListMain from "./components/mainhj/CarListMain";
import GlobalStyle from "./styles/GlobalStyle";
import DetailMain from "./components/detail/DetailMain";
import DetailUser from "./components/detail/DetailUser";
import Add from "./components/add/Add";
import Login from "./components/login/login";
import Join from "./components/join/join";
import MyPage from "./components/mypage/mypage";
import Header from "./components/header/Header";
import EditInfo from "./components/mypage/EditInfo";
import NotPage from "./pages/NotPage";
import FindId from "./components/login/findId";
import FindPw from "./components/login/findPw";
// Toss 관련 컴포넌트 임포트
import CheckoutPage from "./components/payment/checkout";
import SuccessPage from "./components/payment/Success";
import FailPage from "./components/payment/Fail";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CarListMain />} />
            <Route path="/detailmain/:id" element={<DetailMain />} />
            <Route path="/detailuser/:id" element={<DetailUser />} />
            <Route path="/join" element={<Join />} />
            <Route path="/add" element={<Add />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Header" element={<Header />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/EditInfo" element={<EditInfo />} />
            <Route path="/findId" element={<FindId />} />
            <Route path="/findPw" element={<FindPw />} />
            <Route path="*" element={<NotPage />} />
          </Route>
          {/* Toss 결제 관련 라우팅 추가 */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sandbox/success" element={<SuccessPage />} />
          <Route path="/sandbox/fail" element={<FailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

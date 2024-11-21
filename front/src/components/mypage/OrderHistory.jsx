import React, { useState } from 'react';
import { ListGroupItem, CollapseContent, Table } from './mypageStyle';
import axios from 'axios';

const OrderHistory = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleCollapse = () => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        <ListGroupItem onClick={toggleCollapse}>
          주문 내역 <i className="fas fa-chevron-down action-icon"></i>
        </ListGroupItem>
        {isOpen && (
          <CollapseContent>
            <Table>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>상품 A</td>
                  <td>10,000원</td>
                  <td>1개</td>
                </tr>
              </tbody>
            </Table>
          </CollapseContent>
        )}
      </>
    );
  };
  
  export default OrderHistory;
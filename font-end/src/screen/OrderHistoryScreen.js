import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';

export default function OrderHistoryScreen() {
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <Helmet>Order history</Helmet>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orders) => (
                <tr key={orders._id}>
                  <td>{orders._id}</td>
                  <td>{orders.createAt.subString(0, 10)}</td>
                  <td>{orders.totalPrice}</td>
                  <td>
                    {orders.isPaid ? orders.paidAt.subString(0, 10) : 'No'}
                  </td>
                  <td>
                    {orders.isDelivered
                      ? orders.deliveredAt.subString(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <Button onClick={() => navigate(`/order/${orders._id}`)}>
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

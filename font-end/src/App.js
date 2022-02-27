import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import SignInScreen from './screen/SignInScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import ProfileScreen from './screen/ProfileScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import PrivateRouter from './components/PrivateRouter';
import AdminRouter from './components/AdminRouter';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';

function App() {
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route
            path="/profile"
            element={
              <PrivateRouter>
                <ProfileScreen />
              </PrivateRouter>
            }
          />
          <Route path="/orderhistory" element={<OrderHistoryScreen />} />
          <Route
            path="/productlist"
            element={
              <AdminRouter>
                <ProductListScreen />
              </AdminRouter>
            }
          />
          <Route path="/product/:id/edit" element={<ProductEditScreen />} />
          <Route
            path="/orderlist"
            element={
              <AdminRouter>
                <OrderListScreen />
              </AdminRouter>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

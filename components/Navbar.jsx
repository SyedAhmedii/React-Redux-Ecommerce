import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../features/cartSlice";

export default function App() {
  const { cart, totalQuantity } = useSelector((state) => state.allCart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal()); // Updates total quantity and price whenever the cart changes
  }, [cart, dispatch]);

  return (
<MDBNavbar light bgColor="light" className="fixed-top">
  <MDBContainer fluid>
    <MDBNavbarBrand>Ecommerce</MDBNavbarBrand>
    <span>
      <Link to="/">All Products</Link>
    </span>
    <MDBBtn color="light">
      <Link to="/cart">Cart({totalQuantity || 0})</Link>
    </MDBBtn>
  </MDBContainer>
</MDBNavbar>

  );
}

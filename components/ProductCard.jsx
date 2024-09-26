import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const itemsInCart = useSelector((state) => state.allCart.items);

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="m-2 mt-5">
      <MDBContainer>
        <MDBRow className="mb-3">
          {products.length > 0 ? (
            products.map((product) => (
              <MDBCol key={product.id} size="md" className="d-flex align-items-stretch">
                <MDBCard className="product-card h-100">
                  <MDBCardImage
                    src={product.image}
                    position="top"
                    alt={product.title}
                    className="card-image"
                    style={{ height: '100px', width: '100px' }}
                  />
                  <MDBCardBody className="card-body d-flex flex-column">
                    <MDBCardTitle className="text-center">{product.title}</MDBCardTitle>
                    <MDBCardText className="text-center" style={{ fontSize: '0.8rem' }}>${product.price}</MDBCardText>
                    <MDBBtn
                      onClick={() => dispatch(addToCart(product))}
                      className="mt-auto"
                      size="sm"
                    >
                      Add to Cart
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

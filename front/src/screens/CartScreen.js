import React, { useEffect } from "react";
import {  Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate  } from "react-router-dom";
//import Rating from "../components/Rating";
import Message from "../components/Message";
//import Loader from "../components/Loader";

import { addToCart ,removeFromCart} from "../actions/cartActions";
const CartScreen = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const productId = useParams().id;
  const cart=useSelector((state) =>state.cart)
  const {cartItems} = cart
 
  const dispatch = useDispatch();
  const qty=queryParams.get('qty') 
  //? Number(queryParams.split('=')[1]):1

  useEffect(() => {
    if (productId){
      dispatch(addToCart(productId,qty));
    }
  }, [dispatch,productId,qty]);
  const removeFromCartHandler = (productId) => {
   dispatch(removeFromCart(productId));
  };
  const checkoutHandler = () =>{
 navigate(`/shipping`)
  } 
  return (
    <>
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <Message>
              Your cart is empty.{" "}
              <Link to="/">
                <a>Go Back</a>
              </Link>
              .
            </Message>
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => {
              return (
                <ListGroup.Item key={cartItem.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${cartItem.product}`}
                      >
                        <a>{cartItem.name}</a>
                      </Link>
                    </Col>
                    <Col md={2}>${cartItem.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={cartItem.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(cartItem.product, e.target.value)
                          );
                        }}
                      >
                        {[...Array(cartItem.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(cartItem._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
            <h2>
              subtotal ({cartItems.reduce((acc,item) => acc+Number(item.qty) ,0)}) items
            </h2>
            ${cartItems.reduce((acc,item) => acc+Number(item.qty)*item.price ,0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length ===0} onClick={checkoutHandler}>
               Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={8}></Col>
    </Row>
    </>
  )
}

export default CartScreen

import axios from "axios";
const {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,

  } = require("../constants/cartConstants");
  export const addToCart = (id,qty) => async (dispatch,getState) => {
    const res = await axios.get(`https://e-commerce-service-b8r0.onrender.com/api/products/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product:res.data._id,
            name:res.data.name,
            image:res.data.image,
            price:res.data.price,
            countInStock:res.data.countInStock,
            qty
        }
      })
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }
  export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({ 
      type: CART_REMOVE_ITEM,
       payload: id 
      });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }

  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    })
  
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }
  

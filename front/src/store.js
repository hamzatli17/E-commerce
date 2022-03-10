import { cartReducer } from "./reducers/cartReducers.js";

//const Cookies = require("js-cookie");
const { createStore, combineReducers, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const { composeWithDevTools } = require("redux-devtools-extension");
const {
  productListReducer,productDetailsReducer,
} = require("./reducers/productReducers.js");
const {
  userLoginReducer,userDetailsReducer, userRegisterReducer, userUpdateProfileReducer
} = require("./reducers/userReducers.js");
const {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} = require ("./reducers/orderReducers")
const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  cart:cartReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

// need cookies instead of local storage because of ssr

 const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems"))
 : [];
 const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo"))
 : null;
 
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
? JSON.parse(localStorage.getItem('shippingAddress'))
: {}
const initialState = {
  cart:{cartItems:cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,},
  userLogin:{userInfo:userInfoFromStorage},
  
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

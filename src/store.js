import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ProductListReducers, ProductDetailsReducer, ProductDeleteReducer, ProductCreateReducer, ProductUpdateReducer, ProductReviewCreateReducer } from './reducers/ProductReducers'
import { cartReducer } from './reducers/CartReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer , orderListMyReducer, orderListReducer, orderDeliverReducer} from './reducers/orderReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userlistReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducers'

const reducer = combineReducers({
    productList :  ProductListReducers,
    productDetails : ProductDetailsReducer,
    productDelete : ProductDeleteReducer,
    productCreate : ProductCreateReducer,
    productUpdate : ProductUpdateReducer,
    productReviewCreate: ProductReviewCreateReducer,
    
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userList : userlistReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy : orderListMyReducer,
    orderList : orderListReducer,
    orderDeliver : orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
    
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress : shippingAddressFromStorage,
     },
    userLogin : { userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
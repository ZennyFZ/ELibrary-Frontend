import {createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.productId === action.payload.productId);
            if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity < state.cartItems[itemIndex].quantity) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.success("Đã thêm sản phẩm vào giỏ hàng", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if(itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity == state.cartItems[itemIndex].quantity){
                toast.error("Số lượng sản phẩm trong kho không đủ", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.log(action.payload);
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success("Đã thêm sản phẩm vào giỏ hàng", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },   
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
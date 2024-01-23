import {createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalAmount: 0,
};



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
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
            }else {
                console.log(action.payload);
                const tempProduct = { ...action.payload};
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
        
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem._id !== action.payload._id
            )
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.success("Đã xóa sản phẩm khỏi giỏ hàng", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },

        // decreaseQuantity(state, action) {
        //     const itemindex = state.cartItems.findIndex(
        //         cartItem => cartItem._id === action.payload._id
        //     )

        //     if (state.cartItems[itemindex].cartQuantity > 1){
        //         state.cartItems[itemindex].cartQuantity -= 1;
        //     } else if (state.cartItems[itemindex].cartQuantity === 1){
        //         const nextCartItems = state.cartItems.filter(
        //             cartItem => cartItem._id !== action.payload._id
        //         )
        //         state.cartItems = nextCartItems;
        //         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        //         toast.success("Đã xóa sản phẩm khỏi giỏ hàng", {
        //             position: "bottom-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     }
        // },
        // increaseQuantity(state, action) {
        //     const itemindex = state.cartItems.findIndex(
        //         cartItem => cartItem._id === action.payload._id
        //     )
        //     if(state.cartItems[itemindex].cartQuantity >= 1 && state.cartItems[itemindex].cartQuantity < state.cartItems[itemindex].quantity){
        //         state.cartItems[itemindex].cartQuantity += 1
        //         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        //     }else if(state.cartItems[itemindex].cartQuantity == state.cartItems[itemindex].quantity){
        //         toast.error("Số lượng sản phẩm trong kho không đủ", {
        //             position: "bottom-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     }
        // },
        clearCart(state) {
            state.cartItems = [];
            toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state) {
            let { cartTotalAmount } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const {price} = cartItem;
                    cartTotal.cartTotalAmount += price;

                    return cartTotal;
                },
                {
                    cartTotalAmount: 0,
                }
            );
            state.cartTotalAmount = cartTotalAmount;
        }
    


    }
});

export const {addToCart, removeFromCart,clearCart,getTotals} = cartSlice.actions;
export default cartSlice.reducer;
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import { useEffect,useState } from 'react';
import { toast } from "react-toastify";
import { getCurrentUser } from '../../apis/UserService';
import * as React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css'
import { clearCart,getTotals } from './CartSlice';
import { makePayment } from '../../apis/PaymentService';

export default function Cart() {
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //xóa giỏ hàng
    const handleClearCart = () => {
      dispatch(clearCart())
    }

    //tổng tiền
    const handleGetTotals = () => {
        dispatch(getTotals())
    }

    useEffect(() => {
        handleGetTotals();
    }, [cart])
    //get user data for profile, icon, history, . . .
    const [user, setUser] = useState(null);
    function getUserData() {
        getCurrentUser().then(res => {
          setUser(res.data.user);
          console.log(res.data.user)
        }).catch(err => {
          console.log(err);
        })
      }

      useEffect(()=>{
        getUserData()
    },[])
  
    
      
    function checkout(){
        if(user === null){
            toast.error("Bạn cần đăng nhập để thanh toán");
            navigate("/login");
        }else{
           makePayment(cart.cartTotalAmount,'Bank').then(res => {
            window.open(`${res.data.vnpUrl}`);
          }).catch(err => {
            console.log(err);
          })
        }
    }

    return (
        <div>
            <div className={styles.cart_container}>
                <h2>Cart</h2>
                { cart?.cartItems.length === 0 ? (
                    <div className={styles.cart_empty}>
                        <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                        <div className={styles.start_shopping}>
                            <Link to="/">
                                <Button><KeyboardBackspaceIcon />Tiếp tục mua hàng</Button>
                            </Link>
                        </div>
                    </div>
                ): (
                    <div>
                        <div className={styles.titles}>
                            <h3 className={styles.product_title}>Product</h3>
                            <h3 className={styles.price}>Price</h3>
                        </div>
                        <div>
                            {cart.cartItems?.map(cartItem => {
                                return (
                                    <div className={styles.cart_item} key={cartItem._id}>
                                        <div className={styles.cart_product}>
                                            <img src={cartItem.image} alt={cartItem._id} />
                                            <div>
                                                <h3>{cartItem.title}</h3>
                                            </div>
                                        </div>
                                        <div>{(cartItem.price)?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                                    </div>
                                    
                                )
                            })}
                        </div>
                        <div className={styles.cart_summary}>
                        <Button onClick={() => handleClearCart()}>Xóa Giỏ Hàng</Button>
                            <div className={styles.cart_checkout}>          
                                <Button onClick={() => checkout()}>Mua Hàng</Button>
                                <div className={styles.continue_shopping}>
                                        <Link to="/">
                                            <Button><KeyboardBackspaceIcon />Tiếp tục mua hàng</Button>
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { getCurrentUser } from '../../apis/UserService';
import * as React from "react";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const cart = useSelector(state => state.cart);
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();
    console.log(cart);

    function getCurUser() {
        getCurrentUser().then(res => {
          setUser(res.data);
        }).catch(err => {
          console.log(err);
        })
      }

    function checkout(){
        if(user === null){
            toast.error("Bạn cần đăng nhập để thanh toán");
            navigate("/login");
        }else{
            window.location.href = "/";
        }
    }

    useEffect(() => {
        getCurUser();
    }, [])

    return (
        <div>
            <div className="cart-container">
                <h2>Giỏ Hàng</h2>
                { cart.cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                        <div className="start-shopping">
                            <Link to="/">
                                <Button><KeyboardBackspaceIcon />Tiếp tục mua hàng</Button>
                            </Link>
                        </div>
                    </div>
                ): (
                    <div>
                        <div className="titles">
                            <h3 className="product-title">Sản Phẩm</h3>
                            <h3 className="price">Giá</h3>
                            <h3 className="Quantity">Số Lượng</h3>
                            <h3 className="total">Thành Tiền</h3>
                        </div>
                        <div className="cart-items">
                            {cart.cartItems?.map(cartItem => {
                                return (
                                    <div className="cart-item" key={cartItem.productId}>
                                        <div className="cart-product">
                                            <img src={cartItem.image} alt={cartItem._id} />
                                            <div>
                                                <h3>{cartItem._id}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="cart-summary">
                            <div className="cart-checkout">
                                <Button onClick={() => checkout()}>Mua Hàng</Button>
                                <div className="continue-shopping">
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
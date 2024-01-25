import { useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { clearCartCheckout,getTotals } from './CartSlice';
import { getCurrentUser } from '../../apis/UserService';
import {createOrder} from '../../apis/OrderService'
const CheckoutPage = () => {
    const [isDataUpdate, setIsDataUpdate] = useState(false);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    //----------------------
    const isCheckoutPage = () => {
        if (window.location.pathname === "/Checkout") {
            document.getElementById("header").style.display = "none"
            document.getElementById("footer").style.display = "none"
            return true
        }
        return false
    }


    useEffect(() => {
        isCheckoutPage()
    }, [])

    //tổng tiền
    const handleGetTotals = () => {
        dispatch(getTotals())
    }

    useEffect(() => {
        handleGetTotals();
    }, [cart])

    const handleClearCart = () => {
        dispatch(clearCartCheckout())
      }

    //get user data for profile, icon, history, . . .
    const [user, setUser] = useState(null);
    function getUserData() {
        getCurrentUser().then(res => {
          setUser(res.data.user);
          setIsDataUpdate(true);
        }).catch(err => {
          console.log(err);
        })
      }

      useEffect(()=>{
        getUserData()
    },[])
    //create order
    
    function create_Order() {   
            createOrder(user._id, cart.cartTotalAmount,"VNPay",cart.cartItems).then(res => {
                console.log(res.data)
                handleClearCart()
              }).catch(err => {
                console.log(err);
              })
      }

      useEffect(()=>{
        if(isDataUpdate){
            create_Order()
        }
    },[isDataUpdate])

    return (
        <div className={styles.Checkout}>

            <Container maxWidth="sm">
                {/* go to homepage */}
                {/* <div>
                            <a href="/">
                                <div className={styles.CheckoutForm__goToHome}>
                                    <ArrowBackIcon />
                                    <Typography component="h1" variant="h6" style={{ marginLeft: "0.5rem" }}>Trở về trang Home </Typography>
                                </div>
                            </a>
                        </div> */}
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Xác nhận đã thanh toán thành công !
                </Alert>
            </Container>
        </div>
    )
}

export default CheckoutPage
import { useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import Container from '@mui/material/Container';
import {
    Box,
    Typography,
    Avatar
} from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {

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
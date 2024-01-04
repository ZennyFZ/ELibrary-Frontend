import { useEffect } from 'react'
import styles from './Register.module.css'
import Container from '@mui/material/Container';
import { Box, Button, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const Register = () => {

    const isRegisterPage = () => {
        if (window.location.pathname === "/register") {
            document.getElementById("header").style.display = "none"
            document.getElementById("footer").style.display = "none"
            return true
        }
        return false
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`email: ${e.target.email.value}, password: ${e.target.password.value}`)
    }

    useEffect(() => {
        isRegisterPage()
    }, [])

    return (
        <div className={styles.login}>
            <div className={styles.loginContainer}>
                <div className={styles.loginForm__left}>
                    <img src='./images/LeftForm.png' alt="LeftForm" className={styles.loginForm__left__image} />
                </div>
                <div>
                    <Container maxWidth="sm">
                        {/* go to homepage */}
                        <div>
                            <a href="/">
                                <div className={styles.loginForm__goToHome}>
                                    <ArrowBackIcon />
                                    <Typography component="h1" variant="h6" style={{ marginLeft: "0.5rem" }}>Go to Home</Typography>
                                </div>
                            </a>
                        </div>
                        <Box className={styles.loginForm__loginBox}>
                            <img src='./images/Logo.png' alt="Logo" className={styles.loginForm__logo} />
                            <Typography component="h1" variant="h5">
                                Welcome to E-Library
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} style={{ marginTop: "1rem", textAlign: "center" }}>
                                <div className={styles.loginForm__loginBox__inputBox}>
                                    <TextField required label="Email Address" name="email" type='email' autoFocus />
                                    <TextField required label="Password" name="password" type="password" />
                                    <TextField required label="Confirm Password" name="password" type="password" />
                                </div>
                                <Button type="submit" variant="contained" className={styles.loginForm__loginBox__button}> Sign Up </Button>
                            </Box>
                            <div>
                                <Divider style={{marginTop: "1rem"}} />
                                <div className={styles.loginForm__loginBox__footer}>
                                    <Typography component="h1" variant="h6" style={{marginTop: "1rem"}}>
                                        Already have an account? <Link to="/login" style={{color: "#3f51b5", fontWeight: "bold"}}>Sign In</Link>
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Register
import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Container from '@mui/material/Container';

import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    //show or hide password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //
    const isLoginPage = () => {
        if (window.location.pathname === "/login") {
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
        isLoginPage()
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

                            <Box component="form" onSubmit={handleSubmit} style={{ marginTop: "1rem", textAlign: "center", maxWidth: "350px" }}>
                                <div >
                                    <TextField
                                        required
                                        label="Email Address"
                                        name="email"
                                        type='email'
                                        autoFocus
                                        fullWidth
                                        style={{ marginBottom: "15px" }} />
                                    <FormControl variant="outlined" fullWidth required>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            required
                                            id="outlined-adornment-password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth
                                            style={{ marginBottom: "5px" }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>

                                </div>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={styles.loginForm__loginBox__button}
                                > Sign In
                                </Button>

                            </Box>
                            <div>
                                <Divider style={{ marginTop: "1rem" }} />
                                <div className={styles.loginForm__loginBox__footer}>
                                    <Typography component="h1" variant="h6" style={{ marginTop: "1rem" }}>
                                        Don't have an account? <Link to="/register" style={{ color: "#3f51b5", fontWeight: "bold" }}>Sign Up</Link>
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

export default Login
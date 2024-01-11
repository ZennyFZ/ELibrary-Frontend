import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Container from '@mui/material/Container';
import { toast } from "react-toastify";
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

import { login } from '../../apis/UserService';

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
        login(e.target.email.value, e.target.password.value).then(res => {
            if(res.status === 200) {
                toast.success("đăng nhập thành công")
                console.log(res.data)
                // localStorage.setItem('user', JSON.stringify(res.data.data))
                // if(res.data.data.user.role === 'admin' || res.data.data.user.role === 'member') {
                //     localStorage.setItem('isAdmin', 'true')
                // }else {
                //     localStorage.setItem('isAdmin', 'false')
                // }
                // window.location.href = '/'
                
            }
        }).catch(err => {
            console.log(err)
            toast.error("đăng nhập thất bại");
        })
    }


    useEffect(() => {
        isLoginPage()
    }, [])

    useEffect(() => {
        if(localStorage.getItem('token')?.length > 0) {
            window.location.href = '/'
        }
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
                                    <Typography component="h1" variant="h6" style={{ marginLeft: "0.5rem" }}>Trở về trang Home </Typography>
                                </div>
                            </a>
                        </div>
                        <Box className={styles.loginForm__loginBox}>
                            <img src='./images/Logo.png' alt="Logo" className={styles.loginForm__logo} />

                            <Typography component="h1" variant="h5">
                                Chào mừng tới E-Library
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit} style={{ marginTop: "1rem", textAlign: "center", maxWidth: "350px" }}>
                                <div >
                                    <TextField
                                        required
                                        label="Tài khoản Email"
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
                                            label="Mật khẩu"
                                        />
                                    </FormControl>

                                </div>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={styles.loginForm__loginBox__button}
                                > Đăng nhập
                                </Button>

                            </Box>
                            <div>
                                <Divider style={{ marginTop: "1rem" }} />
                                <div className={styles.loginForm__loginBox__footer}>
                                    <Typography component="h1" variant="h6" style={{ marginTop: "1rem" }}>
                                        Chưa có tài khoản ? <Link to="/register" style={{ color: "#3f51b5", fontWeight: "bold" }}>Đăng ký</Link>
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
import { useEffect, useState } from 'react'
import styles from './Register.module.css'
import Container from '@mui/material/Container';
import { Avatar, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from '../../apis/UserService';
import { toast } from 'react-toastify';
const Register = () => {
    //usestste
    const [formError , setFormError] = useState({
        email:"",
        password:"",
        cfpassword:""
    });

    //show or hide password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //page
    const isRegisterPage = () => {
        if (window.location.pathname === "/register") {
            document.getElementById("header").style.display = "none"
            document.getElementById("footer").style.display = "none"
            return true
        }
        return false
    }
    
    //submit
    let inputError = {
        email:"",
        password:"",
        cfpassword:""
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`email: ${e.target.email.value}, password: ${e.target.password.value}, cfpassword: ${e.target.cfpassword.value}`)
        //input error
        if(e.target.cfpassword.value  !== e.target.password.value){
            setFormError({
                ...inputError,
                cfpassword:"password and confirm password must be the same"
            });
            return;
        }
        if(e.target.cfpassword.value == e.target.password.value){
            setFormError({
                ...inputError,
                cfpassword:""
            });
            register(e.target.email.value, e.target.password.value)
            .then(res => {
              toast.success("Category already successfully!");
            })
            .catch(err => {
              toast.error(err.response.data.message);
            });
            return;
        }
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
                            <Avatar src='./images/Logo.png' alt="Logo" className={styles.loginForm__logo}  sx={{ width: 100, height: 100 }} />
                            <Typography component="h1" variant="h5">
                                Welcome to E-Library
                            </Typography>
                         
                            <Box component="form" onSubmit={handleSubmit} style={{ marginTop: "1rem", textAlign: "center",minWidth: "350px" }}>
                                <div className={styles.loginForm__loginBox__inputBox}>
                                    {/* Email */}
                                    <TextField 
                                    fullWidth
                                    required 
                                    label="Tài khoản Email" 
                                    name="email" 
                                    type='email' 
                                    autoFocus
                                    />
                                    <p className={styles.error_message}>{formError.email}</p>
                                    
                                    {/* Password */}
                                    <FormControl variant="outlined" fullWidth required>
                                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
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

                                    {/* Confirm Password */}    
                                    </FormControl>
                                    <p className={styles.error_message}>{formError.password}</p>
                                    <FormControl variant="outlined" fullWidth required>
                                        <InputLabel htmlFor="outlined-adornment-password">Xác nhận mật khẩu</InputLabel>
                                        <OutlinedInput 
                                            required
                                            id="outlined-adornment-password"
                                            name="cfpassword"
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
                                            label="Confirm Password"
                                        />
                                    </FormControl>
                                    <p className={styles.error_message}>{formError.cfpassword}</p>
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
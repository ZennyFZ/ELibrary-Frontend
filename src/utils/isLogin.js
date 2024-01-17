import { getCurrentUser } from "../apis/UserService";

const isLogin = async() => {

    const isLoggedIn = await getCurrentUser().then(res => {
        if (res.data) {
            return true;
        }
    }).catch(err => {
        return false;
    })

    return isLoggedIn;
}

export default isLogin
import { getCurrentUser } from "../apis/UserService";

const isAdmin = async () => {

    const isAdmin = await getCurrentUser().then(res => {
        if (res.data.user.role === "admin") {
            return true;
        }
    }).catch(err => {
        return false;
    })

    return isAdmin;
}
export default isAdmin
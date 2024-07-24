import Cookies from "js-cookie";

const authMiddleware = (store) => (next) => (action) => {
    // Check if the action type is LOGIN_SUCCESS and save the token in a cookie
    if (action.type === "LOGIN_SUCCESS") {
        // Assuming your action payload contains the JWT token
        const token = action.payload.token;
        
        // Save the token in a cookie
        Cookies.set("jwtToken", token, { expires: 7 }); // Expires in 7 days
    }

    return next(action);
};

export default authMiddleware;

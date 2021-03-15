import axios from "axios";
import { API_URL } from "./../../helper";


export const CartAction = (input) => {
    return {
        type: "UPDATECART",
        cart: input //krn di reducer nya cart:cart, klo direducer playload, yauda playload nulisnya
    }
}

export const LoginAction = (input) => {
    return {
        type: "LOGIN",
        payload: input,
    };
};

export const ResetAction = () => {
    return {
        type: "RESET",
    };
};
export const ResetActionthunk = () => {
    return (dispatch) => {
        dispatch({ type: "RESET" });
    };
};

export const ErrorAction = (errmess) => {
    return {
        type: "ERROR",
        error: errmess

    }
}

export const LoadingAction = () => {
    return {
        type: "LOADING",

    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}


export const LoginActionThunk = (input) => {
    return (dispatch) => {
        var { email, password } = input;
        let data = {
            email,
            password,
            role: "users"
        }
        if (password.length > 6) {
            alert('password harus terdiri 6 karakter')
        } else {
            dispatch({ type: "LOADING" });
            axios
                .get(`${API_URL}/users?email=${email}&password=${password}`)
                .then((res) => {
                    if (res.data.length) {
                        localStorage.setItem("id", res.data[0].id);
                        dispatch({ type: "LOGIN", payload: res.data[0] });
                    } else {
                        axios.post(`${API_URL}/users?`, data).then((res2) => {
                            localStorage.setItem('id', res2.data.id)
                            dispatch({ type: "LOGIN", playload: res2.data });

                        }).catch((err) => {
                            dispatch({ type: "ERROR", error: "server error" });

                        })

                    }
                })
                .catch((err) => {
                    console.log(err.response.statusText);
                    dispatch({ type: "ERROR", error: "server error" });
                });

        }
    };
};

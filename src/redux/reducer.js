const initialState = {
    user: {},
    isLoggedIn: false
}

const LOGIN_USER = "LOGIN_USER"
const LOGOUT_USER = "LOGOUT_USER"

export const loginUser = user => ({
    type: LOGIN_USER,
    payload: user
})

export const logoutUser = () => ({
    type: LOGOUT_USER, 
    payload: initialState
})

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER: 
            return {...state, user: action.payload, isLoggedIn: true}
        case LOGOUT_USER: 
            return action.payload
        default: 
            return state
    }
}
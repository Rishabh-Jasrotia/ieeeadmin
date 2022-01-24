const initialState = {
    login: false,
    loading: false,
    events: [],
    users:[],
    eventName:"",
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "LOADING": 
            return {
                ...state,
                loading: action.loading,
            }
        case "SET_EVENTS":
            return {
                ...state,
                events: action.events,
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.users,
                eventName: action.eventName
            }
        case "LOGIN":
            return {
                ...state,
                login: action.login,
                loading: false,
            }
        default: return state;
    }
}

export default reducer;
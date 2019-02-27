export default function (state={}, action) {
    switch (action.type) {

        case 'USER_LOGIN':
            return {...state, login: action.payload}

        case 'USER_AUTH':
            return {...state, login: action.payload}

        case 'GET_USER_REVIEWS':
            return {...state, reviews: action.payload}

        case 'GET_USERS':
            return {...state, users: action.payload}

        case 'ADD_USER':
            return {...state, 
                    added: action.payload.success, 
                    users: action.payload.users
                }
                
        default: 
            return state;
    }
}
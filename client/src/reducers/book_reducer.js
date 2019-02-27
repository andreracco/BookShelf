export default function (state={}, action) {
    switch (action.type) {
        case 'GET_BOOKS':
            return {
                ...state, 
                list: action.payload
            }
        case 'GET_BOOK_W_REVIEWER':
            return {
                ...state, 
                book:     action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'CLEAR_BOOK':
            return {
                ...state, 
                book:     action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'ADD_BOOK':
            return {
                ...state,
                newbook: action.payload
            }
        case 'CLEAR_NEWBOOK':
            return {
                ...state,
                newbook: action.payload
            }
        case 'GET_BOOK':
            return {
                ...state,
                book: action.payload
            }
        case 'UPDATE_BOOK':
            return {
                ...state,
                updateBook: action.payload.success,
                book:       action.payload.doc
            }
        case 'CLEAR_EDITBOOK':
            return {
                ...state,
                book:       action.payload.book,
                updateBook: action.payload.updateBook,
                deleted:    action.payload.deleted
            }
        case 'DELETE_BOOK':
            return {
                ...state,
                deleted: action.payload
            }
        default: 
            return state;
    }
}
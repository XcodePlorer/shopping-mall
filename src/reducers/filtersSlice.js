import { actionTypes } from "./actions"

const initState = {
    searchText: '',
    status: [],
    brand: 'All',
    category: 'All',
    price: '0,0'
}

const filtersSlice = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.text: {
            return {
                ...state,
                searchText: action.payload
            }
        }
        case actionTypes.brand: {
            return {
                ...state,
                brand: action.payload
            }
        }
        case actionTypes.category: {
            return {
                ...state,
                category: action.payload
            }
        }
        case actionTypes.price: {
            return {
                ...state,
                price: action.payload
            }
        }
        case actionTypes.status: {
            let statusList = [...state.status]
            if (statusList.includes(action.payload)) {
                statusList = statusList.filter((item) => item !== action.payload)
            }
            else {
                statusList.push(action.payload)
            }
            return {
                ...state,
                status: statusList
            }
        }
        default: {
            return state
        }
    }
}
export default filtersSlice
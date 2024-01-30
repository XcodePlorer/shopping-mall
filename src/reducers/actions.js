export const actionTypes = {
    text: 'filters/searchText',
    status : 'filters/searchStatus',
    brand: 'filters/searchBrand',
    category: 'filters/searchCategory',
    price: 'filters/searchPrice'
}
export function fetchData(payload){
    return {
        type: 'products/fetchData',
        payload: payload
    }
}


export const setSearchByType = (type, payload) => ({type, payload})
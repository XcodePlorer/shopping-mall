import { createSelector } from "reselect"
import { priceAfterDiscount } from "../helper/helper"
export const filtersSelector = (state) => state.filters
export const productsSelector = (state) => state.products

export const filteredProductsSelector = createSelector(
    productsSelector,
    filtersSelector,
    (products, filters) => {
        const { searchText, brand, category, status, price } = filters
        let filteredProducts = [...products]
        if (searchText) {
            filteredProducts = filteredProducts.filter((p) => p?.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        if (brand !== 'All') {
            filteredProducts = filteredProducts.filter(p => p?.brand === brand)
        }
        if (category !== 'All') {
            filteredProducts = filteredProducts.filter(p => p?.category === category)
        }
        if (price !== '0,0') {
            const [min, max] = price.split(",")
            if (min !== max) {
                filteredProducts = filteredProducts.filter((p) => {
                    let newPrice = priceAfterDiscount(p?.price, p?.discountPercentage)
                    return newPrice >= min && newPrice < max
                })
            }
            else {
                filteredProducts = filteredProducts.filter((p) => {
                    let newPrice = priceAfterDiscount(p?.price, p?.discountPercentage)
                    return newPrice >= min
                })
            }
        }
        if (status.length) {
            if (status.includes('On sale')) {
                filteredProducts = filteredProducts.filter(p => p?.discountPercentage > 0)
            }
            if (status.includes('In stock')) {
                filteredProducts = filteredProducts.filter(p => p?.stock > 0)
            }
        }
        return filteredProducts
    }
)
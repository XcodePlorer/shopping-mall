import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducers/actions";
import { filteredProductsSelector} from "../../reducers/selectors";
import InfiniteScroll from "react-infinite-scroll-component";

var limit = 8
var totalRows = 0
function Products() {
    const dispatch = useDispatch()
    useEffect(() => {
        async function getProductList() {
            let productListRes = await fetch('https://dummyjson.com/products?limit=8')
            let data = await productListRes.json()
            totalRows = data?.total
            dispatch(fetchData(data?.products))
        }
        getProductList()
    }, [dispatch])
    const filteredProducts = useSelector(filteredProductsSelector)

    const loadMoreData = async () => {
        if (limit < totalRows) {
            limit = limit + 8
            let productListRes = await fetch(`https://dummyjson.com/products?limit=${limit}`)
            let data = await productListRes.json()
            dispatch(fetchData(data?.products))
        }

    }
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>
            <InfiniteScroll
                dataLength={filteredProducts.length}
                next={loadMoreData}
                hasMore={limit < totalRows}
                loader={<p>Loading...</p>}
                endMessage = {<p>You have seen it all!</p>}
                style={{overflow: 'hidden'}}
                pullDownToRefreshThreshold={'100px'}
            >
                <div className="row">
                    {
                        filteredProducts?.map((product) => (
                            <Product key={product.id} product={product} />
                        ))
                    }
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Products;
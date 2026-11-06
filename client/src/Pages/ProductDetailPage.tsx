import React from 'react'
import { useLocation } from 'react-router-dom'

interface Props {}

function ProductDetailPage(props: Props) {
    const {} = props
    const location = useLocation()
    const itemDetail = location.state?.item
    console.log(itemDetail)

    return (
        <div>Product detail page</div>
    )
}

export default ProductDetailPage

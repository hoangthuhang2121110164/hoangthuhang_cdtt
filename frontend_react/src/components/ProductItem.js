import { Link } from "react-router-dom";
import { urlImage } from "../config";

const ProductItem=(props)=>{
    const product=props.product;
    return(
        <div className="product-item border">
        <div className="product-item-image">
            <Link to={"/chi-tiet-san-pham/"+props.product.slug}>
            <img
                    className="img-fluid"
                    src={urlImage + "product/" + product.image}
                            alt={product.image}
                  
                  />
               
            </Link>
        </div>
        <h2 className="product-item-name text-main text-center fs-5 py-1">
            <Link to={"/chi-tiet-san-pham/"+props.product.sug}> {product.name}</Link>
        </h2>
        <h3 className="product-item-price fs-6 p-2 d-flex">
            <div className="flex-fill">
                <h5>{product.price}</h5>
            </div>
        </h3>
    </div>
    );
}
export default ProductItem;
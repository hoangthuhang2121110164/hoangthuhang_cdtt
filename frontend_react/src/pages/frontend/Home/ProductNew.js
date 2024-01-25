import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "../../../components/ProductItem";

const ProductNew =()=>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        (async()=>{
            const result=await ProductService.productnew(4);
            setProducts(result.products);
        })();
     },[]);
    return(
      <>
      <div className="category-title bg-main">
        <h3 className="fs-5 py-3 text-center">SẢN PHẨM MỚI</h3>
       </div>
     <div className="row product-list">
        {products && products.map((product,index)=>{
            return(
 <div className="col-6 col-md-3 mb-4" key={index}>
      <ProductItem product={product}/>
     </div> 
            );
        })}
     
    
     </div>
      </>
    );
}
export default ProductNew;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import { urlImage } from "../../../config";
// import ProductItem from "../../../components/ProductItem";
import ProductItem2 from "../../../components/ProductItem2";

function ProductDetail(){
    const{slug}=useParams();
    const[product,setProduct]=useState([]);
    const[products,setProducts]=useState([]);
    const[title,setTitle]=useState("");
    document.title=title;
    useEffect(function(){
        ( async()=>{
            try{
            const result=await ProductService.getProductBySlug(slug);
            setProduct(result.product);
            setProducts(result.product_orther);
            setTitle(result.product.name)
        }
        catch(error){
            console.error(error)
        }
    })();
    },[slug]);
    return(
        <section className="maincontent">
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-6">
                        <img src={urlImage+"product/"+product.image} className="img-fluid" alt="hinh san poham"/>
                    </div>
                    <div className="col-md-6">
                        <h1>{product.name}</h1>
                        <p>{product.price}</p>
                        <p>{product.detail}</p>
                    </div>
                </div>
                <h2>CHI TIẾT SẢN PHẨM</h2>
                <div className="row">
                    <div className="col-12">
                        {product.detail}
                    </div>
                </div>
                <h2 className="text-center m-4">SẢN PHẨM LIÊN QUAN</h2>
                <div className="row m-4">
                    {products.map(function(product,index){
                        return<ProductItem2 key={index} product={product}/>
                    })}
                </div>
            </div>
        </section>
    );
}
export default ProductDetail;
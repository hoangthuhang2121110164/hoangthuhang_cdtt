import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import ListCategory from "../../../layouts/LayoutSite/ListCategory";
import ProductItem2 from "../../../components/ProductItem2";
import ListBrand from "../../../layouts/LayoutSite/ListBrand";

function ProductCategory(){
    const{slug}=useParams();
    const[products,setProducts]=useState([]);
    const[limit,setLimit]=useState(8);
    const[title,setTitle]=useState("");
    document.title=title;
    useEffect(function(){
        ( async()=>{
            try{
            const infocategory=await CategoryService.show(slug);
           const catid=infocategory.category.id;
           setTitle(infocategory.category.name)
           const infoproduct=await ProductService.getProductCategoryId(limit,catid);
           setProducts(infoproduct.products);
        }
        catch(error){
            console.error(error)
        }
    })();
    },[limit,slug]);
    return(
        <section className="maincontent">
        <h3 className="container my-4">{title}</h3>
            <div className="row">
                <div className="col-md-3">
                    <ListCategory/>
              <ListBrand/>
                    {/* <img src={urlImage+"product/"+product.image} className="img-fluid" alt="hinh san poham"/> */}
                </div>
                <div className="col-md-9">
                    <div className="product-category">
                        <div className="row">
                            {products.map(function(product,index){
                                return<ProductItem2 product={product} key={index}/>
                            })}
                        </div>
                        <div className="row">
                            <div className="col-12 text-center my-4">
                                <button onClick={()=>setLimit(limit+8)} className="btn btn-success">XEm them</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
    </section>




    );
}
export default ProductCategory;
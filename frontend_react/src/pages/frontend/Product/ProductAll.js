import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import { Link } from "react-router-dom";
import { urlImage } from "../../../config";

const ProductAll=()=>{
    const [products,setProducts]=useState([]);
    const [limit,setLimit]=useState(8);
    useEffect(function(){
        ( async()=>{
            const result=await ProductService.getProductAll(limit);
           setProducts(result.products);

    })();
},[]);
// console.log(products)
const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = products.slice(firstIndex, lastIndex);
    const npage = Math.ceil(products.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

return(
    <section class="featured spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <div className="category-title bg-main">
        <h3 className="fs-5 py-3 text-center">TẤT CẢ SẢN PHẨM </h3>
       </div>
                {/* <div class="featured__controls">
                    <ul>
                        <li class="active" data-filter="*">All</li>
                        <li data-filter=".oranges">Oranges</li>
                        <li data-filter=".fresh-meat">Fresh Meat</li>
                        <li data-filter=".vegetables">Vegetables</li>
                        <li data-filter=".fastfood">Fastfood</li>
                    </ul>
                </div> */}
            </div>
        </div>
        <div class="row featured__filter">
            {records && records.length>0 &&
            records.map((product,index)=>{
               return(
                <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat" key={index}>
                <div class="featured__item">
                    <div class="featured__item__pic set-bg">
                    <Link to={"/chi-tiet-san-pham/" +product.slug}> <img
                src={urlImage + "product/" + product.image}
                className="img-fluid"
                alt="hinh san pham"
              /> </Link>
                        <ul class="featured__item__pic__hover">
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                    <div class="featured__item__text">
                        <h6><a href="#">{product.name}</a></h6>
                        <h5>{product.price}</h5>
                    </div>
                </div>
            </div>
      
               );
            })}

        </div>
        <div className="row">
        <div className="col-6 text-center">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-end">
                                <li className="page-item disabled">
                                    <Link onClick={prePage} className="page-link">Prev</Link >
                                </li>
                                {
                                    numbers.map((n, i) => (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <Link onClick={() => changeCPage(n)} className="page-link" to="#">{n}</Link >
                                        </li>
                                    ))
                                }
                                <li className="page-item disabled">
                                    <Link onClick={nextPage} className="page-link">Next</Link >
                                </li>
                            </ul>
                        </nav>
                    </div>
                        </div>
    </div>
</section>


);
function prePage() {
    if (currentPage !== firstIndex) {
        setCurrentPage(currentPage - 1)
    }
}

function changeCPage(id) {
    setCurrentPage(id)
}

function nextPage() {
    if (currentPage !== lastIndex) {
        setCurrentPage(currentPage + 1)
    }
}
}
export default ProductAll;
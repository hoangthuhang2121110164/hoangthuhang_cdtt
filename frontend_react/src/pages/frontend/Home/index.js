// import ProductCategory from "../ProductCategory";
import MainMenu from "../../../components/MainMenu";
// import Menu from "../../../layouts/LayoutSite/Menu";
import ProductAll from "../Product/ProductAll";
import ProductCategory from "../ProductCategory";
import ProductHotBuy from "./ProductHotBuy";
import ProductNew from "./ProductNew";
import ProductSale from "./ProductSale";
import Slider from "./Slider";

const Home =()=>{
    return(
       <>
       <section className="hdl-maincontent">
        <div className="container">
            {/* <MainMenu/> */}
            {/* <Menu/> */}

<Slider/>
<ProductNew/>
<ProductSale/>
<ProductHotBuy/>
<ProductCategory/>
<ProductAll/>
        </div>
       </section>
       </>
    );
}
export default Home;
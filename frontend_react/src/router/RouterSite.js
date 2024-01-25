

import Contact from "../pages/frontend/Contact";
import Home from "../pages/frontend/Home";
import gioithieu from "../pages/frontend/Home/gioithieu";
import Post from "../pages/frontend/Post";
import PostDetail from "../pages/frontend/PostDetail";
import ProductAll from "../pages/frontend/Product/ProductAll";
import ProductBrand from "../pages/frontend/ProductBrand";
import ProductCategory from "../pages/frontend/ProductCategory";
import ProductDetail from "../pages/frontend/ProductDetail/Index";


const RouterSite=[
    {path:'/', component:Home},
    {path:'/chi-tiet-san-pham/:slug', component:ProductDetail},
    {path:'/danh-muc-san-pham/:slug', component:ProductCategory},
    {path:'/thuong-hieu-san-pham/:slug', component:ProductBrand},
    {path:'/chi-tiet-bai-viet/:slug', component:PostDetail},
    {path:'/bai-viet/', component:Post},
    {path:'/lien-he/', component:Contact},
    {path:'/gioi-thieu/', component:gioithieu},
    {path:'/san-pham/', component:ProductAll},
];
export default RouterSite
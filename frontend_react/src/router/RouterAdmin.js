import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/backend/Dashboard";
import BannerCreate from "../pages/backend/banner/BannerCreate";
import BannerEdit from "../pages/backend/banner/BannerEdit";
import BannerIndex from "../pages/backend/banner/BannerIndex";
import BannerShow from "../pages/backend/banner/BannerShow";
import BrandEdit from "../pages/backend/brand/BrandEdit";
import BrandIndex from "../pages/backend/brand/BrandIndex";
import BrandShow from "../pages/backend/brand/BrandShow";
import CategoryEdit from "../pages/backend/category/CategoryEdit";
import CategoryIndex from "../pages/backend/category/CategoryIndex";
import CategoryShow from "../pages/backend/category/CategoryShow";
import ContactIndex from "../pages/backend/contact/ContactIndex";
import CustomerIndex from "../pages/backend/customer/CustomerIndex";
import MenuList from "../pages/backend/menu/MenuList";
import OrderExport from "../pages/backend/order/OrderExport";
import OrderIndex from "../pages/backend/order/OrderIndex";
import PageIndex from "../pages/backend/page/PageIndex";
import PostCreate from "../pages/backend/post/PostCreate";
import PostEdit from "../pages/backend/post/PostEdit";
import PostIndex from "../pages/backend/post/PostIndex";
import PostShow from "../pages/backend/post/PostShow";
import ProductCreate from "../pages/backend/product/ProductCreate";
import ProductEdit from "../pages/backend/product/ProductEdit";
import ProductImport from "../pages/backend/product/ProductImport";
import ProductIndex from "../pages/backend/product/ProductIndex";
import ProductSale from "../pages/backend/product/ProductSale";
import ProductShow from "../pages/backend/product/ProductShow";
import TopicEdit from "../pages/backend/topic/TopicEdit";
import TopicIndex from "../pages/backend/topic/TopicIndex";
import TopicShow from "../pages/backend/topic/TopicShow";
import TopicTrash from "../pages/backend/topic/TopicTrash";
import UserIndex from "../pages/backend/user/UserIndex";


const RouterAdmin =[
    { path:'/admin',component:Dashboard},

    { path:'/admin/brand',component:BrandIndex},
    { path:'/admin/brand/edit/:id',component:BrandEdit},
    { path:'/admin/brand/show/:id',component:BrandShow},



    



    { path:'/admin/banner',component:BannerIndex},
    { path:'/admin/banner/create',component:BannerCreate},
    { path:'/admin/banner/edit/:id',component:BannerEdit},
    { path:'/admin/banner/show/:id',component:BannerShow},


    { path:'/admin/category',component:CategoryIndex},
    { path:'/admin/category/edit/:id',component:CategoryEdit},
    { path:'/admin/category/show/:id',component:CategoryShow},


    { path:'/admin/product',component:ProductIndex},
    { path:'/admin/product/create',component:ProductCreate},
    { path:'/admin/product/edit/:id',component:ProductEdit},
    { path:'/admin/product/show/:id',component:ProductShow},
    { path:'/admin/product/sale',component:ProductSale},
    { path:'/admin/product/import',component:ProductImport},



    { path:'/admin/contact',component:ContactIndex},

    { path:'/admin/customer',component:CustomerIndex},

    { path:'/admin/page',component:PageIndex},


    { path:'/admin/post',component:PostIndex},
    { path: '/admin/post/edit/:id', component: PostEdit },
    { path: '/admin/post/show/:id', component: PostShow },
    { path:'/admin/post/create',component:PostCreate},



    { path:'/admin/user',component:UserIndex},

    { path: '/admin/topic/', component: TopicIndex },
    { path: '/admin/topic/edit/:id', component: TopicEdit },
    { path: '/admin/topic/show/:id', component: TopicShow },
    { path: '/admin/topic/trash', component: TopicTrash },


    { path:'/admin/menu',component:MenuList},
   

    { path:'/admin/order',component:OrderIndex},
    { path:'/admin/order/export',component:OrderExport},
];
export default RouterAdmin
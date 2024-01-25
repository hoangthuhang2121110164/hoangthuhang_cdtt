import httpAxios from "../httpAxios";
const ProductService ={
    index:()=>{
        return httpAxios.get(`product/index`);
    },
    show:(id)=>{
        return httpAxios.get(`product/show/${id}`);
    },
    create:(data)=>{
        return httpAxios.post('product/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`product/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`product/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`product/status/${id}`);
    },
    delete:(id)=>{
        return httpAxios.get(`product/delete/${id}`);
    },
    restore:(id)=>{
        return httpAxios.get(`product/restore/${id}`);
    },
    getStore:()=>{
        return httpAxios.get(`product/import`);
    },
    storeStore:(data)=>{
        return httpAxios.post(`product/storeimport`,data);
    },
    getSale:()=>{
        return httpAxios.get(`product/sale`);
    },
    storeSale:(data)=>{
        return httpAxios.post(`product/storesale`,data);
    },
    productnew:(limit)=>{
        return httpAxios.get(`product/productnew/${limit}`);
    },
    productsale:(limit)=>{
        return httpAxios.get(`product/productsale/${limit}`);
    },
    producthotbuy:(limit)=>{
        return httpAxios.get(`product/producthotbuy/${limit}`);
    },
    getProductBySlug:(slug)=>{
        return httpAxios.get(`product/product_detail/${slug}`);
    },
    getProductCategoryId:(limit,category_id)=>{
        return httpAxios.get(`product/product_category/${limit}/${category_id}`);
    },
    getProductBrandId:(limit,brand_id)=>{
        return httpAxios.get(`product/product_brand/${limit}/${brand_id}`);
    },
    getProductAll:(limit)=>{
        return httpAxios.get(`product/product_all/${limit}`);
    },
    getProductHome:(limit,category_id)=>{
        return httpAxios.get(`product/product_home/${limit}/${category_id}`);
    },

}
export default ProductService;
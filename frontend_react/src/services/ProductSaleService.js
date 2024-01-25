import httpAxios from "../httpAxios";
const ProductSaleService ={
    getList:(status)=>{
        return httpAxios.get(`store/index/${status}`);
    },
    getById:(id)=>{
        return httpAxios.get(`store/show/${id}`);
    },
    store:(data)=>{
        return httpAxios.post('store/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`store/update/${id}`,data);
    },
    delete:(id)=>{
        return httpAxios.post(`store/delete/${id}`,id);
    },
    destroy:(id)=>{
        return httpAxios.delete(`store/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`store/status/${id}`);
    },
}
export default ProductSaleService;
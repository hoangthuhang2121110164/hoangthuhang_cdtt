import httpAxios from "../httpAxios";
const BrandService ={
    index:()=>{
        return httpAxios.get(`brand/index`);
    },
    show:(id)=>{
        return httpAxios.get(`brand/show/${id}`);
    },
    create:(data)=>{
        return httpAxios.post('brand/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`brand/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`brand/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`brand/status/${id}`);
    },
    getBySlug:(slug)=>{
        return httpAxios.get(`brand/show/`+slug);
    },
}
export default BrandService;
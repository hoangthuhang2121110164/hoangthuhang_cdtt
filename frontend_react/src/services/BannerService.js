import httpAxios from "../httpAxios";
const BannerService ={
    index:()=>{
        return httpAxios.get(`banner/index`);
    },
    show:(id)=>{
        return httpAxios.get(`banner/show/${id}`);
    },
    create:(data)=>{
        return httpAxios.post('banner/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`banner/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`banner/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`banner/status/${id}`);
    },
    getByPosition: (position) =>{
        return httpAxios.get(`banner/banner_list/${position}`);
    }
}
export default BannerService;
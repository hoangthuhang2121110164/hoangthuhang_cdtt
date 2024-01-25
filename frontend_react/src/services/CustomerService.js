import httpAxios from "../httpAxios";
const CustomerService ={
    index:()=>{
        return httpAxios.get(`customer/index`);
    },
    show:(id)=>{
        return httpAxios.get(`customer/show/${id}`);
    },
    create:(data)=>{
        return httpAxios.post('customer/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`customer/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`customer/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`customer/status/${id}`);
    },
}
export default CustomerService;
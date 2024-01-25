import httpAxios from "../httpAxios";
const OrderService ={
    index:()=>{
        return httpAxios.get(`order/index`);
    },
    show:(id)=>{
        return httpAxios.get(`order/show/${id}`);
    },
    create:(data)=>{
        return httpAxios.post('order/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`order/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`order/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`order/status/${id}`);
    },
}
export default OrderService;
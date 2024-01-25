import httpAxios from "../httpAxios";
const MenuService ={
    index:()=>{
        return httpAxios.get(`menu/index`);
    },
    show:(id)=>{
        return httpAxios.get(`menu/show/${id}`);
    },
    create:(data)=>{
        return httpAxios.post('menu/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`menu/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`menu/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`menu/status/${id}`);
    },
    getByParentId: (position,parent_id) => { 
        return httpAxios.get(`menu/menu_list/${position}/${parent_id}`);
    }
}
export default MenuService;
import httpAxios from "../httpAxios";
const CategoryService ={
    index:()=>{
        return httpAxios.get(`category/index`);
    },
    show:(id)=>{
        return httpAxios.get(`category/show/${id}`);
    },
    create:(data)=>{
        return httpAxios.post('category/store',data);
    },
    update:(data,id)=>{
        return httpAxios.post(`category/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`category/destroy/${id}`);
    },
    status:(id)=>{
        return httpAxios.get(`category/status/${id}`);
    },
    getCategoryByParentId:(parent_id)=>{
        return httpAxios.get(`category/category_list/${parent_id}`);
    },
    getBySlug:(slug)=>{
        return httpAxios.get(`category/show/`+slug);
    },
}
export default CategoryService;
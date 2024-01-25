import httpAxios from "../httpAxios";
const PostServices = {
  index: () => {
    return httpAxios.get(`post/index`);
  },
  show: (id) => {
    return httpAxios.get(`post/show/${id}`);
  },
  create: (data) => {
    return httpAxios.post("post/store", data);
  },
  update: (data, id) => {
    return httpAxios.post(`post/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`post/destroy/${id}`);
  },
  status:(id)=>{
    return httpAxios.get(`post/status/${id}`);
},
getPostAll:(type, limit)=>{
  return httpAxios.get(`post/post_list/${type}/${limit}`);
},
getPostBySlug:(slug)=>{
  return httpAxios.get(`post/post_detail/${slug}`);
},
};
export default PostServices;

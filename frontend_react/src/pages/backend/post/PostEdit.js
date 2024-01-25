import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaPlus, FaEye, FaTrash, FaToggleOn } from 'react-icons/fa';
import PostServices from '../../../services/PostServices';

function PostEdit() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [list_topic, setTopic] = useState([]);
   //
   const [topic_id, setTopicId] = useState('');
   const [title, setTitle] = useState('');
   const [detail, setDetail] = useState('');
   const [type, setType] = useState("post");
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
   const [status, setStatus] = useState(1);
   //

   useEffect(function () {
      (async () => {
         const result = await PostServices.show(id);
         const post = result.post;
         setTopicId(post.topic_id);
         setTitle(post.title);
         setDetail(post.detail);
         setSlug(post.slug);
         setDescription(post.description);
         setStatus(post.status);
      })();
   }, [id]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const image = document.getElementById("image");
      const post = new FormData();
      post.append("topic_id", topic_id);
      post.append("title", title);
      post.append("detail", detail);
      post.append("type", type);
      post.append("description", description);
      post.append("status", status);
      post.append("image", image.files.length === 0 ? "" : image.files[0]);
      (async () => {
         const result = await PostServices.update(post, id);
         alert(result.message);
         navigate('/admin/post', { replace: true });
         // setReLoad(result.post.id);
      })();
   };

   useEffect(function () {
      (async () => {
         const result = await PostServices.index();
         setTopic(result.list_topic);
      })();
   }, []);


   return (
      <form onSubmit={handleSubmit}>
         <div className="content">
            <section className="content-header my-2">
               <h1 className="d-inline">Cập nhật bài viết</h1>
               <div className="text-end">
                  <Link to="/admin/post" className="btn btn-sm btn-success">
                     <FaArrowLeft/> Về danh sách
                  </Link>
               </div>
            </section>
            <section className="content-body my-2">

               <div className="row">
                  <div className="col-md-9">
                     <div className="mb-3">
                        <label><strong>Tiêu đề bài viết (*)</strong></label>
                        <input type="text" value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           className="form-control" placeholder="Nhập tiêu đề" />
                     </div>
                     <div className="mb-3">
<label><strong>Slug (*)</strong></label>
                        <input type="text" value={slug}
                           onChange={(e) => setSlug(e.target.value)}
                           className="form-control" placeholder="Slug" />
                     </div>
                     <div className="mb-3">
                        <label><strong>Chi tiết (*)</strong></label>
                        <textarea value={detail}
                           onChange={(e) => setDetail(e.target.value)}
                           rows="7" className="form-control"
                           placeholder="Nhập chi tiết"></textarea>
                     </div>
                     <div className="mb-3">
                        <label><strong>Mô tả (*)</strong></label>
                        <textarea value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           rows="4" className="form-control" placeholder="Mô tả"></textarea>
                     </div>
                  </div>
                  <div className="col-md-3">
                     <div className="box-container mt-4 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Đăng</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <p>Chọn trạng thái đăng</p>
                           <select value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-select">
                              <option value="1">Xuất bản</option>
                              <option value="2">Chưa xuất bản</option>
                           </select>
                        </div>
                        <div className="box-footer text-end px-2 py-3">
                           <button type="submit" className="btn btn-success btn-sm text-end">
                              <i className="fa fa-save" aria-hidden="true"></i> Đăng
                           </button>
                        </div>
                     </div>
                     <div className="box-container mt-2 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Chủ đề (*)</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <select value={topic_id}
                              onChange={(e) => setTopicId(e.target.value)}
                              className="form-select">
                              <option value="0">None</option>
                              {list_topic.map((topic, index) => {
                                 return (
                                    <option value={topic.id}>{topic.name}</option>
                                 )
})}
                           </select>
                        </div>
                     </div>
                     <div className="box-container mt-2 bg-white">
                        <div className="box-header py-1 px-2 border-bottom">
                           <strong>Hình đại diện</strong>
                        </div>
                        <div className="box-body p-2 border-bottom">
                           <input type="file" id="image" className="form-control" />
                        </div>
                     </div>
                  </div>
               </div>

            </section>
         </div>
      </form>
   )
}

export default PostEdit
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash, FaToggleOn } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { urlImage } from "../../../config";
import LoadingSpinner from "../../../LoadingSpinner";
import PostServices from "../../../services/PostServices";

const PostCreate = () => {
  const navigate = useNavigate();
  const [reLoad, setReLoad] = useState(0);
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("post");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [detail, setDetail] = useState(1);
  const [topic_id, setTopicId] = useState(1);
  useEffect(
   function () {
     (async () => {
       setLoad(false);
       const result = await PostServices.index();
       setPosts(result.posts);
       setLoad(true);
     })();
   },
   [reLoad]
 );

  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.getElementById("image");
    const post = new FormData();
    post.append("title", title);
    post.append("type", type);
    post.append("description", description);
    post.append("detail", detail);
    post.append("topic_id", topic_id);
    post.append("status", status);
    post.append("image", image.files.length === 0 ? "" : image.files[0]);
    (async () => {
      const result = await PostServices.create(post);
      alert(result.message);
      setReLoad(result.post.id);
      navigate("/admin/post", { replace: true });
    })();
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Thêm bài viết</h1>
          <div className="text-end">
            <Link href="post_index.html" className="btn btn-sm btn-success">
              <i className="fa fa-arrow-left"></i> Về danh sách
            </Link>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label>
                  <strong>Tiêu đề bài viết (*)</strong>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                  placeholder="Nhập tiêu đề"
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Chi tiết (*)</strong>
                </label>
                <textarea
                   value={detail}
                   onChange={(e) => setDetail(e.target.value)}
                  rows="7"
                  className="form-control"
                  placeholder="Nhập chi tiết"
                ></textarea>
              </div>
              <div className="mb-3">
                <label>
                  <strong>Mô tả (*)</strong>
                </label>
                <textarea
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="form-control"
                  placeholder="Mô tả"
                ></textarea>
              </div>
              
            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <p>Chọn trạng thái đăng</p>
                  <select   value={status}
                  onChange={(e) => setStatus(e.target.value)} className="form-select">
                    <option value="1">Xuất bản</option>
                    <option value="2">Chưa xuất bản</option>
                  </select>
                </div>
                <div className="box-footer text-end px-2 py-3">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm text-end"
                  >
                    <i className="fa fa-save" aria-hidden="true"></i> Đăng
                  </button>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Chủ đề (*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select   value={topic_id}
                  onChange={(e) => setTopicId(e.target.value)} className="form-select">
                    <option value="">None</option>
                    <option value="1">Tên chủ đề</option>
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
  );
};

export default PostCreate;

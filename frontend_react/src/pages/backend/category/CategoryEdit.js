import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [load, setLoad] = useState(false);
  const [reLoad, setReLoad] = useState(0);

  //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);
  const [parent_id, setParentId] = useState(1);
  const [slug, setSlug] = useState("");

  //
  useEffect(() => {
    (async () => {
      const result = await CategoryService.show(id);
      // setBrand(result.category);
      const category = result.category;
      setName(category.name);
      setDescription(category.description);
      setSortOrder(category.sort_order);
      setStatus(category.status);
      setSlug(category.slug);
      setParentId(category.parent_id);
      // console.log(result.category);
    })();
  }, [id]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.getElementById("image");
    const category = new FormData();
    category.append("name", name);
    category.append("slug", slug);
    category.append("parent_id", parent_id);
    category.append("description", description);
    category.append("sort_order", sort_order);
    category.append("status", status);
    category.append("image", image.files.length === 0 ? "" : image.files[0]);
    (async () => {
      const result = await CategoryService.update(category, id);
      alert(result.message);
      // setReLoad(result.category.id);
      navigate("/admin/category", { replace: true });
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Cập nhật danh mục</h1>
          <div className="text-end">
            <a href="category_index.html">Về danh sách</a>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label>
                  <strong>Tên danh mục (*)</strong>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                
                  placeholder="Nhập tên danh mục"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Slug</strong>
                </label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                
                  placeholder="Nhập slug"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Mô tả</strong>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="7"
                  className="form-control"
                  placeholder="Nhập mô tả"
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
                  <select  value={status}
                  onChange={(e) => setStatus(e.target.value)} className="form-control">
                    <option value="1">Xuất bản</option>
                    <option value="2">Chưa xuất bản</option>
                  </select>
                </div>
                <div className="box-footer text-end px-2 py-3">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm text-end"
                  >
                    <i className="fa fa-save" aria-hidden="true"></i> Câp nhật
                  </button>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Danh mục cha (*)</strong>
                </div>
                <div className="box-body p-2">
                  <select  value={parent_id}
                  onChange={(e) => setParentId(e.target.value)} className="form-control">
                    <option value="0">None</option>
                    <option value="1">Tên danh mục</option>
                  </select>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Thứ tự</strong>
                </div>
                <div className="box-body p-2">
                  <select value={sort_order}
                  onChange={(e) => setSortOrder(e.target.value)} className="form-control">
                    <option value="">Sau</option>
                    <option value="2">sau</option>
                  </select>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình (*)</strong>
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
}
export default CategoryEdit;

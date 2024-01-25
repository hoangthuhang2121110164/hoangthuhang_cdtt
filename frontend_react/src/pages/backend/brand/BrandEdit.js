import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BrandService from "../../../services/BrandService";

function BrandEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [load, setLoad] = useState(false);
  const [reLoad, setReLoad] = useState(0);

  //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);
  const [slug, setSlug] = useState("");
  //
  useEffect(() => {
    (async () => {
      const result = await BrandService.show(id);
      // setBrand(result.brand);
      const brand = result.brand;
      setName(brand.name);
      setDescription(brand.description);
      setSortOrder(brand.sort_order);
      setStatus(brand.status);
      setSlug(brand.slug);
      // console.log(result.brand);
    })();
  }, [id]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.getElementById("image");
    const brand = new FormData();
    brand.append("name", name);
    brand.append("slug", slug);

    brand.append("description", description);
    brand.append("sort_order", sort_order);
    brand.append("status", status);
    brand.append("image", image.files.length === 0 ? "" : image.files[0]);
    (async () => {
      const result = await BrandService.update(brand, id);
      alert(result.message);
      // setReLoad(result.brand.id);
      navigate("/admin/brand", { replace: true });
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">cap nhat thuong hieu</h1>
          <div className="text-end">
            <Link href="brand_index.html" className="btn btn-sm btn-success">
              <i className="fa fa-arrow-left"></i> Về danh sách
            </Link>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label>
                  <strong>Tên thương hiệu (*)</strong>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="form-control"
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
                    <i className="fa fa-save" aria-hidden="true"></i> Đăng
                  </button>
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
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Thứ tự</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select  value={sort_order}
                           onChange={(e) => setSortOrder(e.target.value)} className="form-control">
                    <option value="">Sau</option>
                    <option value="2">sau</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}

export default BrandEdit;

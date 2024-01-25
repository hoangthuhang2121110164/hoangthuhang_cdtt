import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../../services/ProductService";

function ProductCreate() {
  const navigate = useNavigate();
  const [category_id, setCategoryId] = useState("");
  const [brand_id, setBrandId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //   const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [list_category, setCategory] = useState([]);
  const [list_brand, setBrand] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.getElementById("image");
    const product = new FormData();
    product.append("name", name);
    product.append("description", description);
    //  product.append("sort_order", sort_order);
    product.append("status", status);
    product.append("price", price);
    product.append("detail", detail);
    product.append("category_id", category_id);
    product.append("brand_id", brand_id);
    product.append("image", image.files.length === 0 ? "" : image.files[0]);
    (async () => {
      const result = await ProductService.create(product);
      alert(result.message);
      navigate("/admin/product", { replace: true });
    })();
  };
  useEffect(function () {
    (async () => {
      const result = await ProductService.index();
      setCategory(result.list_category);
      setBrand(result.list_brand);
    })();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-9">
          <div className="mb-3">
            <label>
              <strong>Tên sản phẩm (*)</strong>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Chi tiết (*)</strong>
            </label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              rows="3"
              className="form-control"
              placeholder="Nhập chi tiết sản phẩm"
            ></textarea>
          </div>
          <div className="mb-3">
            <label>
              <strong>Mô tả (*)</strong>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
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
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                <option value="1">Xuất bản</option>
                <option value="2">Chưa xuất bản</option>
              </select>
            </div>
            <div className="box-footer text-end px-2 py-2">
              <button type="submit" className="btn btn-success btn-sm text-end">
                <i className="fa fa-save" aria-hidden="true"></i> Đăng
              </button>
            </div>
          </div>
          <div className="box-container mt-2 bg-white">
            <div className="box-header py-1 px-2 border-bottom">
              <strong>Danh mục(*)</strong>
            </div>
            <div className="box-body p-2 border-bottom">
              <select
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                className="form-select"
              >
                <option value="0">Danh mục cha</option>
                {list_category.map((category, index) => {
                  return <option value={category.id}>{category.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="box-container mt-2 bg-white">
            <div className="box-header py-1 px-2 border-bottom">
              <strong>Thương hiệu(*)</strong>
            </div>
            <div className="box-body p-2 border-bottom">
              <select
                value={brand_id}
                onChange={(e) => setBrandId(e.target.value)}
                className="form-select"
              >
                <option value="0">Thương hiệu cha</option>
                {list_brand.map((brand, index) => {
                  return <option value={brand.id}>{brand.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="box-container mt-2 bg-white">
            <div className="box-body p-2 border-bottom">
              <div className="mb-3">
                <label>
                  <strong>Giá bán (*)</strong>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="10000"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="box-container mt-2 bg-white">
            <div className="box-header py-1 px-2 border-bottom">
              <strong>Hình đại diện(*)</strong>
            </div>
            <div className="box-body p-2 border-bottom">
              <input
                name="image"
                type="file"
                id="image"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductCreate;

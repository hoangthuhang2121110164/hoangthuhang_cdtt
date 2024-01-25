import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { urlImage } from "../../../config";
import LoadingSpinner from "../../../LoadingSpinner";
import BrandService from "../../../services/BrandService";

function BrandIndex() {
  const [brands, setBrands] = useState([]);
  const [load, setLoad] = useState(false);
  const [reLoad, setReLoad] = useState(0);

  //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);
  //
  useEffect(
    function () {
      (async () => {
        setLoad(false);
        const result = await BrandService.index();
        setBrands(result.brands);
        setLoad(true);
      })();
    },
    [reLoad]
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.getElementById("image");
    const brand = new FormData();
    brand.append("name", name);
    brand.append("description", description);
    brand.append("sort_order", sort_order);
    brand.append("status", status);
    brand.append("image", image.files.length === 0 ? "" : image.files[0]);
    (async () => {
      const result = await BrandService.create(brand);
      alert(result.message);
      setReLoad(result.brand.id);
    })();
  };
  const handDelete = (id) => {
    (async () => {
      const result = await BrandService.destroy(id);
      setReLoad(result.brand.id);
    })();
  };
 
  const handleStatus = (id) => {
   (async () => {
   //   const data = await BrandService.show(id);
     const result = await BrandService.status( id);
     setReLoad(result.brand.id);
   })();
 };
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Thương hiệu</h1>
      </section>
      <section className="content-body my-2">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  <strong>Tên thương hiệu (*)</strong>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên danh mục"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Mô tả</strong>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="form-control"
                  placeholder="Mô tả"
                ></textarea>
              </div>
              <div className="mb-3">
                <label>
                  <strong>Sắp xếp</strong>
                </label>
                <select
                  value={sort_order}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="form-control"
                >
                  <option value="1">sssss</option>
                  <option value="2">ssddd</option>
                </select>
              </div>
              <div className="mb-3">
                <label>
                  <strong>Hình đại diện</strong>
                </label>
                <input
                  name="image"
                  type="file"
                  id="image"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Trạng thái</strong>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="1">Xuất bản</option>
                  <option value="2">Chưa xuất bản</option>
                </select>
              </div>
              <div className="mb-3 text-end">
                <button type="submit" className="btn btn-success" name="THEM">
                  <i className="fa fa-save"></i> Lưu[Thêm]
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="row mt-3 align-items-center">
              <div className="col-12">
                <ul className="manager">
                  <li>
                    <Link to="brand_index.html">Tất cả (123)</Link>
                  </li>
                  <li>
                    <Link to="#">Xuất bản (12)</Link>
                  </li>
                  <li>
                    <Link to="brand_trash.html">Rác (12)</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row my-2 align-items-center">
              <div className="col-md-6">
                <select name="" className="d-inline me-1">
                  <option value="">Hành động</option>
                  <option value="">Bỏ vào thùng rác</option>
                </select>
                <button className="btnapply">Áp dụng</button>
              </div>
              <div className="col-md-6 text-end">
                <input type="text" className="search d-inline" />
                <button className="btnsearch d-inline">Tìm kiếm</button>
              </div>
            </div>
            {load ? <LoadingSpinner /> : ""}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: 30 }}>
                    <input type="checkbox" id="checkboxAll" />
                  </th>
                  <th className="text-center" style={{ width: 90 }}>
                    Hình ảnh
                  </th>
                  <th>Tên thương hiệu</th>
                  <th>Tên slug</th>
                  <th className="text-center" style={{ width: 30 }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands &&
                  brands.length > 0 &&
                  brands.map((brand, index) => {
                    return (
                      <tr className="datarow">
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td>
                          <img
                            className="img-fluid"
                            src={urlImage + "brand/" + brand.image}
                            alt={brand.image}
                          />
                        </td>
                        <td>
                          <div className="name">
                            <Link to="brand_index.html">{brand.name}</Link>
                          </div>
                          <div className="function_style">
                            <button 
                            onClick={() => handleStatus(brand.id)}
                             className={
                              brand.status === 1
                              ? "border-0 px-1 text-success"
                              : "border-0 px-1 text-danger"
                             }>
                               {brand.status === 1 ?  <FaToggleOn />:<FaToggleOff/>} 
                            
                            </button>
                            <Link
                              to={"/admin/brand/edit/" + brand.id}
                              className="text-primary mx-1"
                            >
                              <i className="fa fa-edit">
                                <FaEdit />
                              </i>
                            </Link>
                            <Link
                            to={"/admin/brand/show/" + brand.id}
                              className="text-info mx-1"
                            >
                              <i className="fa fa-eye">
                                <FaEye />
                              </i>
                            </Link>

                            <button
                              onClick={() => handDelete(brand.id)}
                              className="text-danger mx-1"
                            >
                              <i className="fa fa-trash">
                                <FaTrash />
                              </i>
                            </button>
                          </div>
                        </td>
                        <td>{brand.slug}</td>
                        <td className="text-center">{brand.id}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BrandIndex;

import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { urlImage } from "../../../config";
import LoadingSpinner from "../../../LoadingSpinner";
import CategoryService from "../../../services/CategoryService";

function CategoryIndex() {
  const [categorys, setCategorys] = useState([]);
  const [load, setLoad] = useState(false);
  const [reLoad, setReLoad] = useState(0);

  //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);
  const [parent_id, setParentId] = useState(1);

  //
  useEffect(
    function () {
      (async () => {
        setLoad(false);
        const result = await CategoryService.index();
        setCategorys(result.categorys);
        setLoad(true);
      })();
    },
    [reLoad]
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.getElementById("image");
    const category = new FormData();
    category.append("name", name);
    category.append("description", description);
    category.append("sort_order", sort_order);
    category.append("status", status);
    category.append("parent_id", parent_id);

    category.append("image", image.files.length === 0 ? "" : image.files[0]);
    (async () => {
      const result = await CategoryService.create(category);
      alert(result.message);
      setReLoad(result.category.id);
    })();
  };
  const handDelete = (id) => {
    (async () => {
      const result = await CategoryService.destroy(id);
      setReLoad(result.category.id);
    })();
  };
  const handleStatus = (id) => {
    (async () => {
      //   const data = await BrandService.show(id);
      const result = await CategoryService.status(id);
      setReLoad(result.category.id);
    })();
  };
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Danh mục</h1>
        {/* <hr style="border: none;" /> */}
      </section>
      <section className="content-body my-2">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  <strong>Tên danh mục (*)</strong>
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
                ></textarea>
              </div>
              <div className="mb-3">
                <label>
                  <strong>Danh mục cha</strong>
                </label>
                <select
                  value={parent_id}
                  onChange={(e) => setParentId(e.target.value)}
                  className="form-select"
                >
                  <option value="0">None</option>
                  <option value="1">Tên danh mục</option>
                </select>
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
                    <Link to="category_index.html">Tất cả (123)</Link>
                  </li>
                  <li>
                    <Link to="#">Xuất bản (12)</Link>
                  </li>
                  <li>
                    <Link to="category_trash.html">Rác (12)</Link>
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
                <button className="d-inline btnsearch">Tìm kiếm</button>
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
                  <th>Tên danh mục</th>
                  <th>Tên slug</th>
                  <th className="text-center" style={{ width: 30 }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {categorys &&
                  categorys.length > 0 &&
                  categorys.map((category, index) => {
                    return (
                      <tr className="datarow">
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td>
                          <img
                            className="img-fluid"
                            src={urlImage + "category/" + category.image}
                            alt={category.image}
                          />
                        </td>
                        <td>
                          <div className="name">
                            <Link to="brand_index.html">{category.name}</Link>
                          </div>
                          <div className="function_style">
                            <button
                              onClick={() => handleStatus(category.id)}
                              className={
                                category.status === 1
                                  ? "border-0 px-1 text-success"
                                  : "border-0 px-1 text-danger"
                              }
                            >
                              {category.status === 1 ? (
                                <FaToggleOn />
                              ) : (
                                <FaToggleOff />
                              )}
                            </button>
                            <Link
                              to={"/admin/category/edit/" + category.id}
                              className="text-primary mx-1"
                            >
                              <i className="fa fa-edit">
                                <FaEdit />
                              </i>
                            </Link>
                            <Link
                              to={"/admin/category/show/" + category.id}
                              className="text-info mx-1"
                            >
                              <i className="fa fa-eye">
                                <FaEye />
                              </i>
                            </Link>
                            <button
                              onClick={() => handDelete(category.id)}
                              className="text-danger mx-1"
                            >
                              <i className="fa fa-trash">
                                <FaTrash />
                              </i>
                            </button>
                          </div>
                        </td>
                        <td>{category.slug}</td>
                        <td className="text-center">{category.id}</td>
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

export default CategoryIndex;

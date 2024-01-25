import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { urlImage } from "../../../config";
import LoadingSpinner from "../../../LoadingSpinner";
import ProductService from "../../../services/ProductService";

function ProductIndex() {
  const [products, setProducts] = useState([]);
  const [list_category, setCategory] = useState([]);
  const [list_brand, setBrand] = useState([]);
  const [load, setLoad] = useState(false);
  const [reLoad, setReLoad] = useState(0);

  useEffect(function () {
    (async () => {
      setLoad(false);
      const result = await ProductService.index();
      setProducts(result.products);
      setCategory(result.list_category);
      setBrand(result.list_brand);
      setLoad(true);
    })();
  }, []);
  const handDelete = (id) => {
    (async () => {
      const result = await ProductService.destroy(id);
      setReLoad(result.product.id);
    })();
  };
 
  const handleStatus = (id) => {
   (async () => {
   //   const data = await ProductService.show(id);
     const result = await ProductService.status( id);
     setReLoad(Date.now);
   })();
 };
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Sản phẩm</h1>
        <Link to="/admin/product/create" className="btn-add">
          Thêm mới
        </Link>
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li>
                <Link to="/admin/product">Tất cả (123)</Link>
              </li>
              <li>
                <Link to="#">Xuất bản (12)</Link>
              </li>
              <li>
                <Link to="/admin/product/trash">Rác (12)</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <input type="text" className="search d-inline" />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
        <div className="row mt-1 align-items-center">
          <div className="col-md-8">
            <select name="" className="d-inline me-1">
              <option value="">Hành động</option>
              <option value="">Bỏ vào thùng rác</option>
            </select>
            <button className="btnapply">Áp dụng</button>
            <select name="" className="d-inline me-1">
              <option value="">Tất cả danh mục</option>
            </select>
            <select name="" className="d-inline me-1">
              <option value="">Tất cả thương hiệu</option>
            </select>
            <button className="btnfilter">Lọc</button>
          </div>
          <div className="col-md-4 text-end">
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-sm justify-content-end">
                <li className="page-item disabled">
                  <Link className="page-link">&laquo;</Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    &raquo;
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        {load ? <LoadingSpinner/> :""}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{ width:30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th className="text-center" style={{width:130}}>
                Hình ảnh
              </th>
              <th>Tên sản phẩm</th>
              <th>Tên danh mục</th>
              <th>Tên thương hiệu</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length>0 && 
            products.map((product,index)=>{
              return(
                <tr className="datarow">
                <td>
                  <input type="checkbox" id="checkId" />
                </td>
                <td>
                  <img
                    className="img-fluid"
                    src={urlImage + "product/" + product.image}
                            alt={product.image}
                  
                  />
                </td>
                <td>
                  <div className="name">
                    <Link to="product_edit.html">{product.name}</Link>
                  </div>
                  <div className="function_style">
                  <button 
                            onClick={() => handleStatus(product.id)}
                             className={
                              product.status === 1
                              ? "border-0 px-1 text-success"
                              : "border-0 px-1 text-danger"
                             }>
                               {product.status === 1 ?  <FaToggleOn />:<FaToggleOff/>} 
                            
                            </button>
                    <Link  to={"/admin/product/edit/" + product.id} className="px-1 text-primary">
                      <i className="fa fa-edit">  <FaEdit /></i>
                    </Link>
                    <Link to={"/admin/product/show/" + product.id} className="px-1 text-info">
                      <i className="fa fa-eye">
                      <FaEye />
                      </i>
                    </Link>
                    <button
                              onClick={() => handDelete(product.id)}
                              className="text-danger mx-1"
                            >
                              <i className="fa fa-trash">
                                <FaTrash />
                              </i>
                            </button>
                  </div>
                </td>
                <td>{product.catetory_id}</td>
                <td>{product.brand_id}</td>
                <td className="text-center" style={{width:30}}>{product.id}
                </td>
              </tr>
              )
            }
            )}
            </tbody>
          </table>
        </section>
      </div>
  )
}
export default ProductIndex

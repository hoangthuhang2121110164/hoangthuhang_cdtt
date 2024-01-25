import React, { useEffect, useState } from "react";

import ProductService from "../../../services/ProductService";
import { toast } from "react-toastify";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../LoadingSpinner";

const ProductImport=()=> {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(function () {
    setIsLoading(true);
    (async function () {
      const result = await ProductService.getStore();
      setProducts(result.products);
      setIsLoading(false);
    })();
  }, []);
  //
  const handleImportProductById = (id) => {
    const qty = document.getElementById("qty" + id).value;
    const price = document.getElementById("price" + id).value;
    const productstore = {
      id: id,
      qty: qty,
      price: price,
    };
    (async function () {
      const result = await ProductService.storeStore(productstore);
      toast.success(result.message);
    })();
  }
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">NHẬP HÀNG</h1>
        <button
          type="button"
          className="btn-add"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
  NHẬP HÀNG
        </button>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backkdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel">
         SẢN PHẨM NHẬP
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered" id="mytable2">
                  <thead>
                    <tr>
                     
                      <th className="text-center" style={{ width: 90 }}>
                        Hình ảnh
                      </th>
                      <th>Tên sản phẩm</th>
                      <th>Giá nhập</th>
                      <th>số lượng</th>
                    
                      <th
                        style={{ width: "120px" }}
                        className="text-center"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map(function (product, index) {
                        return (
                          <tr key={index} className="dataitem">
                         
                            <td className="text-center align=middle">
                              <img
                                src={urlImage + "product/" + product.image}
                                className="img-fluid"
                                alt="hh"
                              />
                            </td>
                            <td className="align-middle">{product.name}</td>
                            <td className="align-middle">
                              <input type="number" id={"qty"+product.id} style={{width:60}} min="0"/>
                            </td>
                            <td className="text-center align-middle">
                            <input type="number" id={"price"+product.id} step="1000" max={product.price}/>
                            </td>

                            <td className="text-center align-middle">
                              <button
                              type="button"
                                onClick={() => handleImportProductById(product.id)}
                                className="btn btn-sm btn-success"
                              >
                               nhập sản phẩm
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 align-items-center">
          <div className="col-12 text-end">
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
                  <Link className="page-link" href="#">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="#">
                    &raquo;
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
         {isLoading ? <LoadingSpinner/> :""}
        <table className="table table-bordered" id="mytable2">
          <thead>
            <tr>
             
              <th className="text-center" style={{ width: 90 }}>
                Hình ảnh
              </th>
              <th>tên sản phẩm</th>
              <th>tên danh mục</th>
              <th>tên thương hiệu</th>
              <th>giá nhập</th>
              <th>số lượng</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map(function (product, index) {
                return (
                  <tr className="datarow">                
                    <td>
                      <img
                        src={urlImage + "product/" + product.image}
                        className="img-fluid"
                        alt="hh"
                      />
                    </td>
                    <td>
                      <div className="name">{product.name}</div>
                    </td>
                    <td>{product.categoryname}</td>
                    <td>{product.brandname}</td>
                    <td>{product.sum_qty}</td>
                    <td>{product.avg_price}</td>
                    <td className="text-center align-middle">
                              <button
                              type="button"
                                onClick={() => handleImportProductById(product.id)}
                                className="btn btn-sm btn-success"
                              >
                               nhap sp
                              </button>
                            </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProductImport;

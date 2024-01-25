import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import { urlImage } from "../../../config";

function ProductSale() {
  const [load, setLoad] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsales, setProductSales] = useState([]);
  //getListProduct
  useEffect(function () {
    (async function () {
      const result = await ProductService.index();
      setProducts(result.products);
    })();
  }, []);
  useEffect(
    function () {
      (async function () {
        const result = await ProductService.getSale();
        setProductSales(result.products);
      })();
    },
    [load]
  );
  const handleSale = (id) => {
    (async function () {
      const datebegin = document.querySelector("#datebegin" + id);
      const dateend = document.querySelector("#dateend" + id);
      const pricesale = document.querySelector("#pricesale" + id);
      const productsale = {
        product_id: id,
        pricesale: pricesale.value,
        date_begin: datebegin.value,
        date_end: dateend.value,
      };
     await ProductService.storeSale(productsale);
      // setProducts(result.products);
    })();
  }
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Khuyến mãi</h1>
        <button
          type="button"
          className="btn-add"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Them khuyen mai
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
                  tat ca san pham
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
                      <th className="text-center" style={{ width: 30 }}>
                        <input type="checkbox" id="checkboxAll" />
                      </th>
                      <th className="text-center" style={{ width: 90 }}>
                        Hình ảnh
                      </th>
                      <th>Tên sản phẩm</th>
                      <th>Giá bán</th>
                      <th>Ngày BĐ</th>
                      <th>Ngày kết thúc</th>
                      <th>Giá sale</th>
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
                            <td className="text-center align-middle">
                              <input type="checkbox" id="checkId" />
                            </td>
                            <td className="text-center align=middle">
                              <img
                                src={urlImage + "product/" + product.image}
                                className="img-fluid"
                                alt="hh"
                              />
                            </td>
                            <td className="align-middle">{product.name}</td>
                            <td className="align-middle">{product.price}</td>
                            <td className="text-center align-middle">
                              <input
                                type="date"
                                id={"datebegin" + product.id}
                              />
                            </td>

                            <td className="text-center align-middle">
                              <input type="date" id={"dateend" + product.id} />
                            </td>
                            <td className="text-center align-middle">
                              <input
                                type="text"
                                id={"pricesale" + product.id}
                              />
                            </td>
                            <td className="text-center align-middle">
                              <button
                                onClick={() => handleSale(product.id)}
                                className="btn btn-sm btn-success"
                                type='button'
                              >
                                them KM
                              </button>
                            </td>
                          </tr>
                        )
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
        <table className="table table-bordered" id="mytable2">
          <thead>
            <tr>
              <th className="text-center" style={{ width: 30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th className="text-center" style={{ width: 90 }}>
                Hình ảnh
              </th>
              <th>Tên sản phẩm</th>
              <th>Giá bán</th>
              <th>Ngày BĐ</th>
              <th>Ngày kết thúc</th>
              <th>Giá sale</th>
            </tr>
          </thead>
          <tbody>
            {productsales &&
              productsales.map(function (productsales, index) {
                return (
                  <tr className="datarow">
                    <td className="text-center">
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <img
                        src={urlImage + "product/" + productsales.image}
                        className="img-fluid"
                        alt="hh"
                      />
                    </td>
                    <td>
                      <div className="name">{productsales.name}</div>
                    </td>
                    <td>{productsales.price}</td>
                    <td>{productsales.date_begin}</td>
                    <td>{productsales.date_end}</td>
                    <td>{productsales.pricesale}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProductSale;

import { useEffect, useState } from "react";
import CustomerService from "../../../services/CustomerService";
import ProductService from "../../../services/ProductService";
import ExportService from "../../../services/ExportService";
import { urlImage } from "../../../config";

const OrderExport = () => {
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);
   const [customers, setcustomers] = useState([]);
   const [customer, setcustomer] = useState([]);

   const [products, setproducts] = useState([]);
   const [productSelects, setproductSelects] = useState([]);
   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await CustomerService.index();
         setcustomers(result.customers);
         setLoad(true);
      })()
   }, [reload]);

   const handleSelectCustomer = (id) => {
      (async function () {
         const result = await CustomerService.show(id);
         setcustomer(result.customer);
      })();
   }

   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await ProductService.index();
         setproducts(result.products);
         setLoad(true);
      })()
   }, [reload]);

   const handleSelectProduct = (id) => {
      const ElImage = document.querySelector("#image" + id);
      const Elname = document.querySelector("#name" + id);
      const Elcategoryname = document.querySelector("#categoryname" + id);
      const Elbrandname = document.querySelector("#brandname" + id);
      const Elprice = document.querySelector("#price" + id);
      const productselect = {
         id: id,
         image: ElImage.value,
         name: Elname.value,
         categoryname: Elcategoryname.value,
         brandname: Elbrandname.value,
         price: Elprice.value,
      }
      var arrayNew = [...productSelects, productselect];
      setproductSelects(arrayNew);
   }
   const handleExport = () => {
      var listcart = [];
      const listproductid = document.querySelectorAll("#productid");
      const user_id = document.getElementById("user_id").value;
      listproductid.forEach((element) => {
         var Elqty = document.querySelector("#qty" + element.value);
         listcart = [...listcart, { id: element.value, qty: Elqty.value }]
      });
      (async function () {
         const result = await ExportService.store({ listcart: listcart, user_id: user_id });
      })();
      alert("Thêm dữ liệu thành công");
   }

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">XUẤT HÀNG</h1>
         </section>
         <section className="content-body my-2">
            <div className="row">
               <div className="col-12 my-2">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                     data-bs-target="#chonkhachhang">
                     Chọn khách hàng
                  </button>
               </div>
               <div class="modal fade" id="chonkhachhang" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                  aria-labelledby="chonkhachhangLabel" aria-hidden="true">
                  <div class="modal-dialog">
                     <div class="modal-content">
                        <div class="modal-header">
                           <h5 class="modal-title" id="chonkhachhangLabel">Danh sách khách hàng</h5>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <table className="table table-bordered table-striped">
                              <thead>
                                 <tr>
                                    <th>Họ tên</th>
                                    <th>Điện thoại</th>
                                    <th>Email</th>
                                 </tr>
                              </thead>
                              <tbody id="bodycustomer">
                                 {customers && customers.map(function (customer, index) {
                                    return (
                                       <tr key={index}>
                                          <td>{customer.name}</td>
                                          <td>{customer.phone}</td>
                                          <td>{customer.email}</td>
                                          <td>
                                             <button onClick={() => handleSelectCustomer(customer.id)} className="btn btn-sm btn-success">Chọn</button>
                                          </td>
                                       </tr>
                                    );
                                 })}
                              </tbody>
                           </table>
                        </div>
                        <div class="modal-footer">
                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row" id="rowshowcustome">
               <div className="col-md">
                  <label>Họ tên (*)</label>
                  <input type="text" value={customer.name} className="form-control" readonly />
               </div>
               <div className="col-md">
                  <label>Email (*)</label>
                  <input type="text" value={customer.email} className="form-control" readonly />
               </div>
               <div className="col-md">
                  <label>Điện thoại (*)</label>
                  <input type="text" value={customer.phone} className="form-control" readonly />
               </div>
               <div className="col-md-5">
                  <label>Địa chỉ (*)</label>
                  <input type="text" value={customer.address} className="form-control" readonly />
               </div>
               <input type="hidden" id="user_id" value={customer.id} />
            </div>
            <div className="row my-3">
               <div className="col-6 my-2">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                     data-bs-target="#chonsanpham">
                     Chọn sản phẩm
                  </button>
               </div>
               <div className="col-6 my-2 text-end">
                  <button type="button" className="btn btn-success" onClick={handleExport}>
                     Xuất hàng
                  </button>
               </div>
               <div class="modal fade" id="chonsanpham" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                  aria-labelledby="chonsanphamLabel" aria-hidden="true">
                  <div class="modal-dialog">
                     <div class="modal-content">
                        <div class="modal-header">
                           <h5 class="modal-title" id="chonsanphamLabel">Danh sách sản phẩm</h5>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <table className="table table-bordered table-striped table-hover">
                              <thead>
                                 <tr>
                                    <th className="text-center" style={{ width: 50 }}>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Tên danh mục</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Giá</th>
                                    <th></th>
                                 </tr>
                              </thead>
                              <tbody id="bodyproduct">
                                 {products && products.map(function (product, index) {
                                    return (
                                       <tr key={index} className="detaiitem">
                                          <td className="align-middle">
                                             <img className="img-fluid" src={urlImage + "product/" + product.image} alt={product.image} />
                                          </td>
                                          <td className="align-middle">{product.name}</td>
                                          <td className="align-middle">{product.catname}</td>
                                          <td className="align-middle">{product.brname}</td>
                                          <td className="align-middle">{product.price}</td>
                                          <td className="text-center align-middle">
                                             <button onClick={() => handleSelectProduct(product.id)} className="btn btn-sm btn-success">Chọn </button>
                                          </td>
                                          <input type="hidden" id={"image" + product.id} value={product.image} />
                                          <input type="hidden" id={"name" + product.id} value={product.name} />
                                          <input type="hidden" id={"categoryname" + product.id} value={product.catname} />
                                          <input type="hidden" id={"brandname" + product.id} value={product.brname} />
                                          <input type="hidden" id={"price" + product.id} value={product.price} />
                                       </tr>
                                    )
                                 })}

                              </tbody>
                           </table>

                        </div>
                        <div class="modal-footer">
                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="col-12">
                  <table className="table table-bordered table-striped">
                     <thead>
                        <tr>
                           <th className="text-center" style={{ width: "20px" }}>ID</th>
                           <th className="text-center" style={{ width: 140 }}>Hình ảnh</th>
                           <th>Tên sản phẩm</th>
                           <th>Tên danh mục</th>
                           <th>Tên thương hiệu</th>
                           <th>Giá</th>
                           <th>Số lượng</th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody id="bodyproduct">
                        {productSelects && productSelects.map((product, index) => {
                           return (
                              <tr key={index}>
                                 <td>
                                    {product.id}<input id="productid" value={product.id} type="hidden" />
                                 </td>
                                 <td>
                                    <img className="img-fluid" src={urlImage + "product/" + product.image} alt={product.image} />
                                 </td>
                                 <td>{product.name}</td>
                                 <td>{product.categoryname}</td>
                                 <td>{product.brandname}</td>
                                 <td>{product.price}</td>
                                 <td>
                                    <input style={{ width: 60 }} id={"qty" + product.id} type="number" min="0" />
                                 </td>
                                 <td className="text-center">
                                    <button className="btn btn-danger btn-xs px-3">X</button>
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               </div>
            </div>

         </section>
      </div>
   );
}

export default OrderExport;
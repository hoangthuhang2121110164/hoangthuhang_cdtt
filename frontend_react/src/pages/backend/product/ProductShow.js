import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ProductService from "../../../services/ProductService";


function ProductShow() {
   const {id}=useParams();

   const[product,setProducts]=useState([]);
   useEffect(function(){
      (async () => {
         const result = await ProductService.show(id);
         setProducts(result.product);
       })();
     },[]);
   
  return (
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <Link to="http://localhost:3000/admin/product" className="btn btn-primary btn-sm">
              <FaArrowLeft/>  Về danh sách
             </Link>

             <Link   to={"/admin/product/edit/" + product.id}
              className="btn btn-success btn-sm">
                <i className="fa fa-edit"></i> Sửa
             </Link>
             <Link to="brand_index.html" className="btn btn-danger btn-sm">
                <i className="fa fa-trash"></i> Xóa
             </Link>
          </div>
       </div>
    </section>
    <section className="content-body my-2">

       <table className="table table-bordered">
          <thead>
             <tr>
                <th style={{width:180}}>Tên trường</th>
                <th>Giá trị</th>
             </tr>
          </thead>
          <tbody>
             <tr>
                <td className="text-center">Id</td>
                <td>{product.id}</td>
             </tr>
             <tr>
                <td className="text-center">name</td>
                <td>{product.name}</td>
             </tr>
             <tr>
                <td className="text-center">description</td>
                <td>{product.description}</td>
             </tr>
             <tr>
                <td className="text-center">status</td>
                <td>{product.status}</td>
             </tr>
          </tbody>
       </table>

    </section>
 </div>  )
}

export default ProductShow
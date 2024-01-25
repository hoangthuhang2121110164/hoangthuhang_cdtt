import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";


function CategoryShow() {
   const {id}=useParams();

   const[category,setCategorys]=useState([]);
   useEffect(function(){
      (async () => {
         const result = await CategoryService.show(id);
         setCategorys(result.category);
       })();
     },[]);
   
  return (
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <Link to="http://localhost:3000/admin/category" className="btn btn-primary btn-sm">
              <FaArrowLeft/>  Về danh sách
             </Link>

             <Link   to={"/admin/category/edit/" + category.id}
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
                <td>{category.id}</td>
             </tr>
             <tr>
                <td className="text-center">name</td>
                <td>{category.name}</td>
             </tr>
             <tr>
                <td className="text-center">description</td>
                <td>{category.description}</td>
             </tr>
             <tr>
                <td className="text-center">status</td>
                <td>{category.status}</td>
             </tr>
          </tbody>
       </table>

    </section>
 </div>  )
}

export default CategoryShow
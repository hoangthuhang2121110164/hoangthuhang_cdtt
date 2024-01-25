import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaEye, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import TopicServices from "../../../services/TopicServices";


function TopicShow() {
   const {id}=useParams();

   const[topic,setTopics]=useState([]);
   useEffect(function(){
      (async () => {
         const result = await TopicServices.show(id);
         setTopics(result.topic);
       })();
     },[]);
   
  return (
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <Link to="http://localhost:3000/admin/topic" className="btn btn-primary btn-sm">
              <FaArrowLeft/>  Về danh sách
             </Link>

             <Link   to={"/admin/topic/edit/" + topic.id}
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
                <td>{topic.id}</td>
             </tr>
             <tr>
                <td className="text-center">name</td>
                <td>{topic.name}</td>
             </tr>
             <tr>
                <td className="text-center">description</td>
                <td>{topic.description}</td>
             </tr>
             <tr>
                <td className="text-center">status</td>
                <td>{topic.status}</td>
             </tr>
          </tbody>
       </table>

    </section>
 </div>  )
}

export default TopicShow
import React from 'react'

function ContactTrash() {
  return (
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Thùng rác liên hệ</h1>
       <div className="row mt-3 align-items-center">
          <div className="col-6">
             <ul className="manager">
                <li><a href="#">Tất cả (123)</a></li>
                <li><a href="#">Xuất bản (12)</a></li>
                <li><a href="#">Rác (12)</a></li>
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
          </div>
          <div className="col-md-4 text-end">
             <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-end">
                   <li className="page-item disabled">
                      <a className="page-link">&laquo;</a>
                   </li>
                   <li className="page-item"><a className="page-link" href="#">1</a></li>
                   <li className="page-item"><a className="page-link" href="#">2</a></li>
                   <li className="page-item"><a className="page-link" href="#">3</a></li>
                   <li className="page-item">
                      <a className="page-link" href="#">&raquo;</a>
                   </li>
                </ul>
             </nav>
          </div>
       </div>
    </section>
    <section className="content-body my-2">

       <table className="table table-bordered">
          <thead>
             <tr>
                <th className="text-center" style="width:30px;">
                   <input type="checkbox" id="checkboxAll" />
                </th>
                <th>Họ tên</th>
                <th>Điện thoại</th>
                <th>Email</th>
                <th>Tiêu đề</th>
             </tr>
          </thead>
          <tbody>
             <tr className="datarow">
                <td>
                   <input type="checkbox" id="checkId" />
                </td>
                <td>
                   <div className="name">
                      <a href="contact_reply.html">Hồ Diên Lơij</a>
                   </div>
                   <div className="function_style">
                      <a href="#" className="text-primary mx-1">
                         <i className="fa fa-undo"></i>
                      </a>
                      <a href="#" className="text-danger mx-1">
                         <i className="fa fa-trash"></i>
                      </a>
                   </div>
                </td>
                <td>098765432</td>
                <td>dienloisoft@gmail.com</td>
                <td>Tieu đề</td>
             </tr>
          </tbody>
       </table>

    </section>
 </div>  )
}

export default ContactTrash
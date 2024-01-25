import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaEye, FaTrash, FaToggleOn, FaSave, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import LoadingSpinner from '../../../LoadingSpinner';
import { urlImage } from '../../../config';
import MenuService from '../../../services/MenuService';

function MenuList() {
   const [menus, setMenus] = useState([]);
   const [list_category, setCategory] = useState([]);
   const [list_brand, setBrand] = useState([]);
   const [list_topic, setTopic] = useState([]);
   const [list_page, setPage] = useState([]);
   const [load, setLoad] = useState(false);
   const [reLoad, setReLoad] = useState(0);
   const [total, setTotals] = useState([]);
   const [list_status, setListStatus] = useState([]);
   const [list_trash, setListTrash] = useState([]);

   //
   const [name, setName] = useState('');
   const [link, setLink] = useState('');
   const [position, setPosition] = useState('');
   //
   useEffect(function () {
      (async () => {
         setLoad(true);
         const result = await MenuService.index();
         setMenus(result.menus);
         setCategory(result.list_category);
         setBrand(result.list_brand);
         setTopic(result.list_topic);
         setPage(result.list_page);
         setTotals(result.total);
         setListStatus(result.status);
         setListTrash(result.trash);
         setLoad(false);
      })();
   }, [reLoad]);

   const handleSubmit = (event) => {
      event.preventDefault();
      const nameBtn = event.nativeEvent.submitter.name;
      const menu = {
         position: position
      }
      //ADDCATEGORY
      if (nameBtn === "ADDCATEGORY") {
         const categoryid = [];
         const categoryidchecked = document.querySelectorAll(".categoryid");
         categoryidchecked.forEach(function (item) {
            if (item.checked) {
               categoryid.push(item.value);
            }
         });
         menu['ADDCATEGORY'] = nameBtn;
         menu['categoryid'] = categoryid;
      }

      //ADDBRAND
      if (nameBtn === "ADDBRAND") {
         const brandid = [];
         const brandidchecked = document.querySelectorAll(".brandid");
         brandidchecked.forEach(function (item) {
            if (item.checked) {
               brandid.push(item.value);
            }
         });
         menu['ADDBRAND'] = nameBtn;
         menu['brandid'] = brandid;
      }

      //ADDTOPIC
      if (nameBtn === "ADDTOPIC") {
         const topicid = [];
         const topicidchecked = document.querySelectorAll(".topicid");
         topicidchecked.forEach(function (item) {
            if (item.checked) {
               topicid.push(item.value);
            }
         });
         menu['ADDTOPIC'] = nameBtn;
         menu['topicid'] = topicid;
      }

      //ADDPAGE
      if (nameBtn === "ADDPAGE") {
         const pageid = [];
         const pageidchecked = document.querySelectorAll(".pageid");
         pageidchecked.forEach(function (item) {
            if (item.checked) {
               pageid.push(item.value);
            }
         });
         menu['ADDPAGE'] = nameBtn;
         menu['pageid'] = pageid;
      }

      //ADDCUSTOM
      if (nameBtn === "ADDCUSTOM") {
         menu['ADDCUSTOM'] = nameBtn;
         menu['name'] = name;
         menu['link'] = link;
      };

      (async function () {
         const result = await MenuService.create(menu);
         if (result.status === true) {
            setLoad(Date.now());
            alert(result.message);
         }
      })();
   };

   const handDelete = (id) => {
      (async () => {
         const result = await MenuService.destroy(id);
         setReLoad(result.menu.id);
      })();
   };

   const handStatus = (id) => {
      (async () => {
         const result = await MenuService.status(id);
         setReLoad(Date.now);
      })();
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Quản lý menu</h1>
            <div className="row mt-3 align-items-center">
               <div className="col-6">
                  <ul className="manager">
                     <li><Link to="/admin/menu">Tất cả ({total})</Link ></li>
                     <li><Link to="#">Xuất bản ({list_status})</Link ></li>
                     <li><Link to="/admin/menu/trash">Rác ({list_trash})</Link ></li>
                  </ul>
               </div>
               <div className="col-6 text-end">
                  <input type="text" className="search d-inline" />
                  <button className="d-inline btnsearch">Tìm kiếm</button>
               </div>
            </div>
         </section>
         <section className="content-body my-2">
            <div className="row">
               <div className="col-md-3">
                  <form onSubmit={handleSubmit}>
                     <ul className="list-group">
                        <li className="list-group-item mb-2">
                           <select value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              className="form-control">
                              <option value="mainmenu">Main Menu</option>
                              <option value="footermenu">Footer Menu</option>
                           </select>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <Link className="d-block" to="#multiCollapseCategory" data-bs-toggle="collapse">
                              Danh mục sản phẩm
                           </Link>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCategory">
                              {list_category.map((category, index) => {
                                 return (
                                    <div className="form-check">
                                       <input className="form-check-input categoryid" type="checkbox"
                                          value={category.id} id={"categoryid" + category.id} />
                                       <label className="form-check-label" htmlFor={"categoryid" + category.id}>
                                          {category.name}
                                       </label>
                                    </div>
                                 )
                              })}
                              <div className="my-3">
                                 <button name="ADDCATEGORY" type="submit"
                                    className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <Link className="d-block" to="#multiCollapseBrand" data-bs-toggle="collapse">
                              Thương hiệu
                           </Link>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseBrand">
                              {list_brand.map((brand, index) => {
                                 return (
                                    <div className="form-check">
                                       <input className="form-check-input brandid" type="checkbox"
                                          value={brand.id} id={"brandid" + brand.id} />
                                       <label className="form-check-label" htmlFor={"brandid" + brand.id}>
                                          {brand.name}
                                       </label>
                                    </div>
                                 )
                              })}
                              <div className="my-3">
                                 <button name="ADDBRAND" type="submit"
                                    className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <Link className="d-block" to="#multiCollapseTopic" data-bs-toggle="collapse">
                              Chủ đề bài viết
                           </Link>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseTopic">
                              {list_topic.map((topic, index) => {
                                 return (
                                    <div className="form-check">
                                       <input className="form-check-input topicid" type="checkbox"
                                          value={topic.id} id={"topicid" + topic.id} />
                                       <label className="form-check-label" htmlFor={"topicid" + topic.id}>
                                          {topic.name}
                                       </label>
                                    </div>
                                 )
                              })}
                              <div className="my-3">
                                 <button name="ADDTOPIC" type="submit"
                                    className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <Link className="d-block" to="#multiCollapsePage" data-bs-toggle="collapse">
                              Trang đơn
                           </Link>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapsePage">
                              {list_page.map((page, index) => {
                                 return (
                                    <div className="form-check" key={index}>
                                       <input className="form-check-input pageid" type="checkbox"
                                          value={page.id} id={"pageid" + page.id} />
                                       <label className="form-check-label" htmlFor={"pageid" + page.id}>
                                          {page.title}
                                       </label>
                                    </div>
                                 )
                              })}
                              <div className="my-3">
                                 <button name="ADDPAGE" type="submit"
                                    className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                        <li className="list-group-item mb-2 border">
                           <Link className="d-block" to="#multiCollapseCustom" data-bs-toggle="collapse">
                              Tùy biến liên kết
                           </Link>
                           <div className="collapse multi-collapse border-top mt-2" id="multiCollapseCustom">
                              <div className="mb-3">
                                 <label>Tên menu</label>
                                 <input type="text" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control" />
                              </div>
                              <div className="mb-3">
                                 <label>Liên kết</label>
                                 <input type="text" value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="form-control" />
                              </div>
                              <div className="my-3">
                                 <button name="ADDCUSTOM" id="ADDCUSTOM" type="submit"
                                    className="btn btn-sm btn-success form-control">Thêm</button>
                              </div>
                           </div>
                        </li>
                     </ul>
                  </form>
               </div>
               <div className="col-md-9">
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
                                 <Link className="page-link">&laquo;</Link>
                              </li>
                              <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                              <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                              <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                              <li className="page-item">
                                 <Link className="page-link" to="#">&raquo;</Link>
                              </li>
                           </ul>
                        </nav>
                     </div>
                  </div>
                  {load ? <LoadingSpinner /> : ""}
                  <table className="table table-bordered">
                     <thead>
                        <tr>
                           <th className="text-center" style={{ width: 30 }}>
                              <input type="checkbox" id="checkboxAll" />
                           </th>
                           <th>Tên menu</th>
                           <th>Liên kết</th>
                           <th>Vị trí</th>
                           <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                     </thead>
                     <tbody>
                        {menus && menus.length > 0 &&
                           menus.map((menu, index) => {
                              return (
                                 <tr className="datarow">
                                    <td className="text-center">
                                       <input type="checkbox" id="checkId" />
                                    </td>
                                    <td>
                                       <div className="name">
                                          {menu.name}
                                       </div>
                                       <div className="function_style">
                                          <button onClick={() => handStatus(menu.id)}
                                             className={menu.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"}>
                                             {menu.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                          </button>
                                          <Link to={"/admin/menu/update/" + menu.id} className="text-primary mx-1">
                                             <i className="fa fa-edit"><FaEdit /></i>
                                          </Link >
                                          <Link to={"/admin/menu/show/" + menu.id} className="text-info mx-1">
                                             <i className="fa fa-eye"><FaEye /></i>
                                          </Link >
                                          <button onClick={() => handDelete(menu.id)} className="btn btn-sm btn-none text-danger"><FaTrash /></button>
                                       </div>
                                    </td>
                                    <td>{menu.link}</td>
                                    <td>{menu.type}</td>
                                    <td className="text-center">1</td>
                                 </tr>
                              )
                           }
                           )}
                     </tbody>
                  </table>
               </div>
            </div>

         </section >
      </div >
   )
}

export default MenuList
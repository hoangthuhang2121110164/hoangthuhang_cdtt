import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaEye, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { urlImage } from '../../../config';
import LoadingSpinner from '../../../LoadingSpinner';
import BannerService from '../../../services/BannerService';

function BannerIndex() {
   const [banners, setBanners] = useState([]);
   const [totals, setTotals] = useState([]);
   const [load, setLoad] = useState(false);
   const [reLoad, setReLoad] = useState(0);
   const [list_status, setListStatus] = useState([]);
   const [list_trash, setListTrash] = useState([]);
   useEffect(function () {
      (async () => {
         setLoad(false);
         const result = await BannerService.index();
         setBanners(result.banners);
         setTotals(result.totals);
         setListStatus(result.status);
         setListTrash(result.trash);
         setLoad(true);
      })();
   }, [reLoad]);
   const handDelete = (id) => {
      (async () => {
          const result = await BannerService.destroy(id);
          alert(result.message)
      })();
  };
  const handStatus = (id) => {
      (async () => {
          const result = await BannerService.status(id);
          setReLoad(Date.now)

      })();
  };
   return (
      <div class="content">
                  <section class="content-header my-2">
                     <h1 class="d-inline">Banner</h1>
                     <Link class="btn-add" to="/admin/banner/create">Thêm mới</Link>
                     <div class="row mt-3 align-items-center">
                        <div class="col-6">
                           <ul class="manager">
                              <li><Link to="/admin/banner">Tất cả ({totals})</Link></li>
                              <li><Link to="#">Xuất bản ({list_status})</Link></li>
                              <li><Link to="/admin/banner/trash">Rác ({list_trash})</Link></li>
                           </ul>
                        </div>
                        <div class="col-6 text-end">
                           <input type="text" class="search d-inline" />
                           <button class="d-inline btnsearch">Tìm kiếm</button>
                        </div>
                     </div>
                     <div class="row mt-1 align-items-center">
                        <div class="col-md-8">
                           <select name="" class="d-inline me-1">
                              <option value="">Hành động</option>
                              <option value="">Bỏ vào thùng rác</option>
                           </select>
                           <button class="btnapply">Áp dụng</button>
                           <select name="" class="d-inline me-1">
                              <option value="">Tất cả vị trí</option>
                           </select>
                           <button class="btnfilter">Lọc</button>
                        </div>
                        <div class="col-md-4 text-end">
                           <nav aria-label="Page navigation example">
                              <ul class="pagination pagination-sm justify-content-end">
                                 <li class="page-item disabled">
                                    <Link class="page-link">&laquo;</Link>
                                 </li>
                                 <li class="page-item"><Link class="page-link" to="#">1</Link></li>
                                 <li class="page-item"><Link class="page-link" to="#">2</Link></li>
                                 <li class="page-item"><Link class="page-link" to="#">3</Link></li>
                                 <li class="page-item">
                                    <Link class="page-link" to="#">&raquo;</Link>
                                 </li>
                              </ul>
                           </nav>
                        </div>
                     </div>
                  </section>
                  <section class="content-body my-2">
                  {load ? <LoadingSpinner /> : ""}
                     <table class="table table-bordered">
                        <thead>
                           <tr>
                              <th class="text-center" style={{width:30}}>
                                 <input type="checkbox" id="checkboxAll" />
                              </th>
                              <th class="text-center" style={{ width:130 }}>Hình ảnh</th>
                              <th>Tên banner</th>
                              <th>Vị trí</th>
                              <th>Liên kết</th>
                              <th class="text-center" style={{width:30}}>ID</th>
                           </tr>
                        </thead>
                        <tbody>
                        {banners &&
                  banners.length > 0 &&
                  banners.map((banner, index) => {
                          return(
                           <tr class="datarow">
                           <td class="text-center">
                              <input type="checkbox" />
                           </td>
                           <td>
                           <img
                            className="img-fluid"
                            src={urlImage + "banner/" + banner.image}
                            alt={banner.image}
                          />
                           </td>
                           <td>
                              <div class="name">
                                 <Link to="banner_edit.html">
                                  {banner.name}
                                 </Link>
                              </div>
                              <div className="function_style">
                            <button 
                            onClick={() => handStatus(banner.id)}
                             className={
                              banner.status === 1
                              ? "border-0 px-1 text-success"
                              : "border-0 px-1 text-danger"
                             }>
                               {banner.status === 1 ?  <FaToggleOn />:<FaToggleOff/>} 
                            
                            </button>
                            <Link
                              to={"/admin/banner/edit/" + banner.id}
                              className="text-primary mx-1"
                            >
                              <i className="fa fa-edit">
                                <FaEdit />
                              </i>
                            </Link>
                            <Link
                            to={"/admin/banner/show/" + banner.id}
                              className="text-info mx-1"
                            >
                              <i className="fa fa-eye">
                                <FaEye />
                              </i>
                            </Link>

                            <button
                              onClick={() => handDelete(banner.id)}
                              className="text-danger mx-1"
                            >
                              <i className="fa fa-trash">
                                <FaTrash />
                              </i>
                            </button>
                          </div>
                        </td>
                        <td>{banner.slug}</td>
                        <td className="text-center">{banner.id}</td>
                      </tr>
                          )
                  }
                  )}
                        </tbody>
                     </table>

                  </section>
               </div>
   );
   }
export default BannerIndex
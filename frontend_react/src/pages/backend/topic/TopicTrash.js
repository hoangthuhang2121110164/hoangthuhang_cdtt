const TopicTrash = () => {
    return ( 
        <div class="content">
                  <section class="content-header my-2">
                     <h1 class="d-inline">Thùng rác chủ đề</h1>
                     <div class="row mt-3 align-items-center">
                        <div class="col-6">
                           <ul class="manager">
                              <li><a href="topic_index.html">Tất cả (123)</a></li>
                              <li><a href="#">Xuất bản (12)</a></li>
                              <li><a href="topic_trash.html">Rác (12)</a></li>
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
                        </div>
                        <div class="col-md-4 text-end">
                           <nav aria-label="Page navigation example">
                              <ul class="pagination pagination-sm justify-content-end">
                                 <li class="page-item disabled">
                                    <a class="page-link">&laquo;</a>
                                 </li>
                                 <li class="page-item"><a class="page-link" href="#">1</a></li>
                                 <li class="page-item"><a class="page-link" href="#">2</a></li>
                                 <li class="page-item"><a class="page-link" href="#">3</a></li>
                                 <li class="page-item">
                                    <a class="page-link" href="#">&raquo;</a>
                                 </li>
                              </ul>
                           </nav>
                        </div>
                     </div>
                  </section>
                  <section class="content-body my-2">

                     <table class="table table-bordered">
                        <thead>
                           <tr>
                              <th class="text-center" style="width:30px;">
                                 <input type="checkbox" id="checkboxAll" />
                              </th>
                              <th>Tên chủ đề</th>
                              <th>Tên slug</th>
                              <th class="text-center" style="width:30px;">ID</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr class="datarow">
                              <td>
                                 <input type="checkbox" id="checkId" />
                              </td>
                              <td>
                                 <div class="name">
                                    <a href="topic_edit.html">
                                       Tên chủ đề
                                    </a>
                                 </div>
                                 <div class="function_style">
                                    <a href="#" class="btn btn-primary btn-sm">
                                       <i class="fa fa-undo"></i>
                                    </a>
                                    <a href="#" class="btn btn-danger btn-sm">
                                       <i class="fa fa-trash"></i>
                                    </a>
                                 </div>
                              </td>
                              <td>Slug</td>
                              <td class="text-center">1</td>
                           </tr>
                        </tbody>
                     </table>

                  </section>
               </div>
     );
}
 
export default TopicTrash;
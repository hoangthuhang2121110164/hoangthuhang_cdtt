import { useEffect, useState } from "react";
import TopicServices from "../../../services/TopicServices";
import { Link } from "react-router-dom";
import { FaEye, FaRegEdit, FaToggleOff, FaToggleOn, FaTrashAlt } from "react-icons/fa";

const TopicIndex = () => {
   const [topics, setTopics] = useState([]);
   const [load, setLoad] = useState(false);
   const [reload, setReload] = useState(0);
   useEffect(() => {
      (async () => {
         setLoad(false);
         const result = await TopicServices.index();
         setTopics(result.topics);
         setLoad(true);
      })()
   }, [reload]);
   //Hàm thêm
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [sort_order, setSortOrder] = useState(1);
   const [status, setStatus] = useState(1);

   const handleSubmit = (e) => {
      e.preventDefault();
      const topic = new FormData();
      topic.append("name", name);
      topic.append("description", description);
      topic.append("sort_order", sort_order);
      topic.append("status", status);
      (async () => {
         const result = await TopicServices.store(topic);
         alert(result.message);
         setReload(result.topic.id);
      })();
   };
   //Hàm xóa 
   const handDelete = (id) => {
      (async () => {
         const result = await TopicServices.destroy(id);
         setReload(result.message)
      })();
   };
   //Status
   const handStatus = (id) => {
      (async () => {
         const result = await TopicServices.status(id);
         setReload(Date.now)
      })();
   };
   return (<div className="content">
      <section className="content-header my-2">
         <h1 className="d-inline">Chủ đề bài viết</h1>
         <hr style={{ border: "none" }} />
      </section>
      <section className="content-body my-2">

         <div className="row">
            <div className="col-md-4">
               <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                     <label><strong>Tên chủ đề (*)</strong></label>
                     <input type="text" onChange={(e) => setName(e.target.value)}
                        value={name} className="form-control" placeholder="Tên chủ để" />
                  </div>
                  <div className="mb-3">
                     <label><strong><strong>Mô tả</strong></strong></label>
                     <textarea onChange={(e) => setDescription(e.target.value)}
                        value={description} rows="6" className="form-control" placeholder="Mô tả"></textarea>
                  </div>
                  <div className="mb-3">
                     <label><strong>Sắp xếp</strong></label>
                     <select onChange={(e) => setSortOrder(e.target.value)}
                        value={sort_order}
                        className="form-select">
                        <option value="1">xxxx</option>
                        <option value="2">xxxx</option>
                     </select>
                  </div>
                  <div className="mb-3">
                     <label><strong>Trạng thái</strong></label>
                     <select onChange={(e) => setStatus(e.target.value)}
                        value={status} className="form-control">
                        <option value="1">Xuất bản</option>
                        <option value="2">Chưa xuất bản</option>
                     </select>
                  </div>
                  <div className="mb-3 text-end">
                     <button className="btn btn-sm btn-success" type="submit" name="THEM">
                        <i className="fa fa-save"></i> Lưu[Cập nhật]
                     </button>
                  </div>
               </form>
            </div>
            <div className="col-md-8">
               <div className="row mt-3 align-items-center">
                  <div className="col-12">
                     <ul className="manager">
                        <li><Link to="brand_index.html">Tất cả (123)</Link></li>
                        <li><Link to="#">Xuất bản (12)</Link></li>
                        <li><Link to="brand_trash.html">Rác (12)</Link></li>
                     </ul>
                  </div>
               </div>
               <div className="row my-2 align-items-center">
                  <div className="col-md-6">
                     <select name="" className="d-inline me-1">
                        <option value="">Hành động</option>
                        <option value="">Bỏ vào thùng rác</option>
                     </select>
                     <button className="btnapply">Áp dụng</button>
                  </div>
                  <div className="col-md-6 text-end">
                     <input type="text" className="search d-inline" />
                     <button className="d-inline">Tìm kiếm</button>
                  </div>
               </div>
               <table className="table table-bordered">
                  <thead>
                     <tr>
                        <th className="text-center" style={{ width: 30 }}>
                           <input type="checkbox" id="checkboxAll" />
                        </th>
                        <th>Tên chủ đề</th>
                        <th>Tên slug</th>
                        <th className="text-center" style={{ width: 30 }}>ID</th>
                     </tr>
                  </thead>
                  <tbody>
                     {topics && topics.map((topic, index) => {
                        return (
                           <tr className="datarow" key={index}>
                              <td>
                                 <input type="checkbox" id="checkId" />
                              </td>
                              <td>
                                 <div className="name">
                                    <Link to="topic_edit.html">
                                       {topic.name}
                                    </Link>
                                 </div>
                                 <div className="function_style">
                                    <button onClick={() => handStatus(topic.id)}
                                       className={
                                          topic.status === 1
                                             ? "border-0 px-1 text-success"
                                             : "border-0 px-1 text-danger"
                                       }
                                    >
                                       {topic.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                    </button>
                                    <Link to={"/admin/topic/edit/" + topic.id} className="px-1 text-primary">
                                       <FaRegEdit />
                                    </Link>
                                    <Link to={"/admin/topic/show/ " + topic.id} className="px-1 text-info">
                                       <FaEye />
                                    </Link>
                                    <button onClick={() => handDelete(topic.id)} className="btn btn-sm btn-none text-danger"><FaTrashAlt /></button>

                                 </div>
                              </td>
                              <td>{topic.slug}</td>
                              <td className="text-center">{topic.id}</td>
                           </tr>
                        );
                     })}

                  </tbody>
               </table>
            </div>
         </div>

      </section>
   </div>
   );
}

export default TopicIndex;
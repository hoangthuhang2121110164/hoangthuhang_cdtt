import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaEye, FaRegEdit, FaToggleOff, FaToggleOn, FaTrashAlt } from "react-icons/fa";
import { urlImage } from "../../../config";
import PostServices from "../../../services/PostServices";
const PostIndex = () => {
    const [posts, setposts] = useState([]);
    const [load, setLoad] = useState(false);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        (async () => {
            setLoad(false);
            const result = await PostServices.index();
            setposts(result.posts);
            setLoad(true);
        })()
    }, [reload]);

    const handDelete = (id) => {
        (async () => {
            const result = await PostServices.destroy(id);
            setReload(result.message)
        })();
    };
    const handStatus = (id) => {
        (async () => {
            const result = await PostServices.status(id);
            setReload(Date.now)

        })();
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý bài viết</h1>
                <Link to="/admin/post/create"  className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><Link href="post_index.html">Tất cả (123)</Link></li>
                            <li><Link href="#">Xuất bản (12)</Link></li>
                            <li><Link href="post_trash.html">Rác (12)</Link></li>
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
                        <select name="" className="d-inline me-1">
                            <option value="">Chủ đề</option>
                        </select>
                        <button className="btnfilter">Lọc</button>
                    </div>
                    <div className="col-md-4 text-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-end">
                                <li className="page-item disabled">
                                    <Link className="page-link">&laquo;</Link>
                                </li>
                                <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                                <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                                <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" href="#">&raquo;</Link>
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
                            <th className="text-center" style={{ width: 30 }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th className="text-center" style={{ width: 130 }}>Hình ảnh</th>
                            <th>Tiêu đề bài viết</th>
                            <th>Tên danh mục</th>
                            <th className="text-center" style={{ width: 30 }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.map((post, index) => {
                            return (
                                <tr className="datarow" key={index}>
                                    <td>
                                        <input type="checkbox" id="checkId" />
                                    </td>
                                    <td>
                                        <img className="img-fluid" src={urlImage + "post/" + post.image} alt={post.image} />
                                    </td>
                                    <td>
                                        <div className="name">
                                            <Link href="post_edit.html">
                                                {post.title}
                                            </Link>
                                        </div>
                                        <div className="function_style">
                                            <button onClick={() => handStatus(post.id)}
                                                className={
                                                    post.status === 1
                                                        ? "border-0 px-1 text-success"
                                                        : "border-0 px-1 text-danger"
                                                }
                                            >
                                                {post.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                            <Link to={"/admin/post/edit/" + post.id} className="px-1 text-primary">
                                                <FaRegEdit />
                                            </Link>
                                            <Link to={"/admin/post/show/ " + post.id} className="px-1 text-info">
                                                <FaEye />
                                            </Link>
                                            <button onClick={() => handDelete(post.id)} className="btn btn-sm btn-none text-danger"><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                    <td>{post.slug}</td>
                                    <td className="text-center">{post.id}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

            </section>
        </div>
    );
}

export default PostIndex;
import React from 'react'
import { FaPlus, FaProductHunt, FaRegCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Menu() {
    function handleItemClick(item) {
        const hdlitem = document.getElementById(item);
        hdlitem.classList.toggle("active");
    }

    return (
        <div class="hdl-left">
            <div class="dashboard-name">
                Bản điều khiển
            </div>
            <nav class="m-2 mainmenu">
                <ul class="main">
                    <li class="hdlitem item-sub" id="item1" onClick={() => handleItemClick('item1')}>
                        <FaProductHunt class="icon-left" />
                        <Link to="#">Sản phẩm</Link>
                        <FaPlus class="fa-solid fa-plus icon-right" />
                        <ul class="submenu">
                            <li>
                                <Link to="product">Tất cả sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="product/import">Nhập hàng</Link>
                            </li>
                            <li>
                                <Link to="category">Danh mục</Link>
                            </li>
                            <li>
                                <Link to="brand">Thương hiệu</Link>
                            </li>
                            <li>
                                <Link to="product/sale">Khuyễn mãi</Link>
                            </li>
                        </ul>
                    </li>
                    <li class="hdlitem item-sub" id="item2" onClick={() => handleItemClick('item2')}>
                        <FaProductHunt class="icon-left" />
                        <Link to="#">Bài viết</Link>
                        <FaPlus class="fa-solid fa-plus icon-right" />
                        <ul class="submenu">
                            <li>
                                <Link to="post">Tất cả bài viết</Link>
                            </li>
                            <li>
                                <Link to="topic">Chủ đề</Link>
                            </li>
                            <li>
                                <Link to="page">Trang đơn</Link>
                            </li>
                        </ul>
                    </li>
                    <li class="hdlitem item-sub" id="item3" onClick={() => handleItemClick('item3')}>
                        <FaProductHunt class="icon-left" />
                        <Link to="#">Quản lý bán hàng</Link>
                        <FaPlus class="fa-solid fa-plus icon-right" />
                        <ul class="submenu">
                            <li>
                                <Link to="order">Tất cả đơn hàng</Link>
                            </li>
                            <li>
                                <Link to="order/export">Xuất hàng</Link>
                            </li>
                        </ul>
                    </li>
                    <li class="hdlitem">
                        <FaRegCircle class="icon-left" />
                        <Link to="customer">Khách hàng</Link>
                    </li>
                    <li class="hdlitem">
                        <FaRegCircle class="icon-left" />
                        <Link to="contact">Liên hệ</Link>
                    </li>
                    <li class="hdlitem item-sub" id="item4" onClick={() => handleItemClick('item4')}>
                        <FaProductHunt class="icon-left" />
                        <Link to="#">Giao diện</Link>
                        <FaPlus class="fa-solid fa-plus icon-right" />
                        <ul class="submenu">
                            <li>
                                <Link to="menu">Menu</Link>
                            </li>
                            <li>
                                <Link to="banner">Banner</Link>
                            </li>
                        </ul>
                    </li>
                    <li class="hdlitem item-sub" id="item5" onClick={() => handleItemClick('item5')}>
                        <FaProductHunt class="icon-left" />
                        <Link to="#">Hệ thống</Link>
                        <FaPlus class="fa-solid fa-plus icon-right" />
                        <ul class="submenu">
                            <li>
                                <Link to="user">Thành viên</Link>
                            </li>
                            <li>
                                <Link to="config">Cấu hình</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default Menu
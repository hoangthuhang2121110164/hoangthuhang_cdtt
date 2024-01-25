import { Outlet } from 'react-router-dom';
import React from 'react'
import "./LayoutAdminStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

const LayoutAdmin = () => {
    return (
        <div>
            <Header />
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2 bg-dark p-0 hdl-left">
                        <Menu />
                    </div>
                    <div class="col-md-10">
                        <Outlet />
                    </div>
                     {/* <div class="col-md-10">
                        <Footer />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
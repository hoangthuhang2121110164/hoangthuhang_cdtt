import './LayoutSiteStyle.css'
import Tintuc1 from '../../assets/images/blog-4.jpg'
import Tintuc2 from '../../assets/images/slider.jpg'
import Tintuc3 from '../../assets/images/slidershow_1.jpg'
// import Avt1 from '../../assets/images/hinhanhkhachhang1 (1).png'
import Logo from '../../assets/images/ligi.jpg'

function Footer() {
    return (
        <div>
            <div class="banner m-4">
                <img style={{ width: "100%" }} src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fifitness.vn%2Fblogs%2Fkien-thuc-the-hinh%2Fthuc-pham-giau-dinh-duong&psig=AOvVaw0CkbLOButzekqRoxHyVCf4&ust=1705771360400000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjw5tL76YMDFQAAAAAdAAAAABAN" />
            </div>

            <section class="from-blog spad m-4">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center m-4">
                                <h2>TIN TỨC</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic">
                                    <img src={Tintuc1} className="img-fluid" alt="Tintuc1" />
                                </div>
                                <div class="blog__item__text">
                                    <h5><a href="#">Gỏi bưởi tôm mực chua ngọt cực ngon, bạn đã biết cách làm?</a></h5>
                                    <p>Bưởi dùng làm gỏi bạn đã thử? Hãy cùng Bếp Thực Phẩm Nhanh tham khảo công thức trộn Gỏi bưởi tôm mực chua ngọt sau trong chuyên mục Nấu Ăn Ngon tuần này nhé! </p>
                                </div>
                                <button type="submit" className="btn btn-sm btn-success">Xem thêm</button>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic">
                                    <img src={Tintuc2} className="img-fluid" alt="Tintuc2" />
                                </div>
                                <div class="blog__item__text">
                                    <h5><a href="#">Bí quyết nấu lẩu ếch măng chua vô cùng đậm đà</a></h5>
                                    <p>Cùng thưởng thức món Lẩu ếch măng chua đậm đà theo bí kíp nấu ăn ngon từ Bếp Thực Phẩm Nhanh dưới đây thử xem nhé!</p>
                                </div>
                                <button type="submit" className="btn btn-sm btn-success">Xem thêm</button>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic">
                                    <img src={Tintuc3} className="img-fluid" alt="Tintuc3" />
                                </div>
                                <div class="blog__item__text">
                                    <h5><a href="#">Canh cá bớp nấu ngót giúp bữa ăn thêm tròn vị</a></h5>
                                    <p>Cá bớp rất giàu dinh dưỡng, dễ ăn thích hợp dùng làm nguyên liệu chính để nấu các món lẩu hoặc canh. hôm nay, Bếp Thực Phẩm Nhanh xin gợi ý cả nhà công thức chế biến canh cá bớp nấu ngót giúp bữa cơm gia đình thêm tròn vị. Mọi người cùng tham khảo dưới đây nhé!</p>
                                </div>
                                <button type="submit" className="btn btn-sm btn-success">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section class="ftco-section testimony-section m-4">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center m-4">
                                <h2>NHẬN XÉT KHÁCH HÀNG</h2>
                            </div>
                        </div>
                    </div>
                    <div class="cont">
                        <img src={Avt1} className="img-fluid" alt="Avt1" />
                        <p><span>Chris Fox.</span> CEO at Mighty Schools.</p>
                        <p> Shop rất nhiều mẫu đẹp , chất liệu vải và hình giống y , mặc rất ưng ý , tôi rất thích shop thời trang xinh .
                            Shop phục vụ tất tốt xin chúc cho shop ngày nhiều from dáng đẹp để làm đẹp cho chị e phụ nữ nha </p>
                    </div>

                    <div class="cont">
                        <img src={Avt1} className="img-fluid" alt="Avt2" />
                        <p><span>Chris Fox.</span> CEO at Mighty Schools.</p>
                        <p> Shop rất nhiều mẫu đẹp , chất liệu vải và hình giống y , mặc rất ưng ý , tôi rất thích shop thời trang xinh .
                            Shop phục vụ tất tốt xin chúc cho shop ngày nhiều from dáng đẹp để làm đẹp cho chị e phụ nữ nha </p>
                    </div>

                    <div class="cont">
                        <img src={Avt1} className="img-fluid" alt="Avt3" />
                        <p><span>Chris Fox.</span> CEO at Mighty Schools.</p>
                        <p> Shop rất nhiều mẫu đẹp , chất liệu vải và hình giống y , mặc rất ưng ý , tôi rất thích shop thời trang xinh .
                            Shop phục vụ tất tốt xin chúc cho shop ngày nhiều from dáng đẹp để làm đẹp cho chị e phụ nữ nha </p>
                    </div>

                    <div class="cont">
                        <img src={Avt1} className="img-fluid" alt="Avt4" />
                        <p><span>Chris Fox.</span> CEO at Mighty Schools.</p>
                        <p> Shop rất nhiều mẫu đẹp , chất liệu vải và hình giống y , mặc rất ưng ý , tôi rất thích shop thời trang xinh .
                            Shop phục vụ tất tốt xin chúc cho shop ngày nhiều from dáng đẹp để làm đẹp cho chị e phụ nữ nha </p>
                    </div>

                    <div class="cont">
                        <img src={Avt1} className="img-fluid" alt="Avt" />
                        <p><span>Chris Fox.</span> CEO at Mighty Schools.</p>
                        <p> Shop rất nhiều mẫu đẹp , chất liệu vải và hình giống y , mặc rất ưng ý , tôi rất thích shop thời trang xinh .
                            Shop phục vụ tất tốt xin chúc cho shop ngày nhiều from dáng đẹp để làm đẹp cho chị e phụ nữ nha </p>
                    </div>
                </div>
            </section> */}

            <section class="ftco-section ftco-no-pt ftco-no-pb bg-light">
                <div class="container py-4">
                    <div class="row d-flex justify-content-center py-5">
                        <div class="col-md-7">
                            <h2 style={{ fontSize: "22px" }} class="mb-0">ĐĂNG KÝ NHẬN THÔNG TIN ƯU ĐÃI VÀ KHUYẾN MÃI</h2>
                            <span>Thông tin của bạn sẽ được bảo mật tuyệt đối và bạn có thể hủy đăng ký bất cứ lúc nào.</span>
                        </div>
                        <div class="col-md-5 d-flex align-items-center">
                            <form action="#" class="subscribe-form">
                                <div class="form-group d-flex">
                                    <input className="form-control me-2" type="text" placeholder="Enter email address" />
                                    <button className="btn btn-success" type="button">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="footer spad bg-light text-dark py-5">
                <div class="container">
                    <div class="row">
                        <div className="col-md-3">
                            <div class="footer__about">
                                <div class="footer__about__logo m-4">
                                    <a href="./index.html"><img src={Logo} className="img-fluid" alt="Logo" /></a>
                                </div>
                                <ul>
                                    <li>Address: Hồ Chí Minh</li>
                                    <li>Phone: (84)0792401773</li>
                                    <li>Email: Admin@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <h4>Thông tin</h4>
                            <ul>
                                <li><a href="#">Giới thiệu</a></li>
                                <li><a href="#">Liên hệ</a></li>
                                <li><a href="#">Tuyển dụng</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h4>Hổ trợ tư vấn</h4>
                            <ul>
                                <li><a href="#">Hướng dẫn mua hàng</a></li>
                                <li><a href="#">Hướng dẫn đăng ký</a></li>
                                <li><a href="#">Khôi phục mật khẩu</a></li>
                                <li><a href="#">Quản lý đơn hàng</a></li>
                                <li><a href="#">Góp ý</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h4>Quy định chung</h4>
                            <ul>
                                <li><a href="#">Chính sách bảo mật</a></li>
                                <li><a href="#">Phương thức thanh toán</a></li>
                                <li><a href="#">Phương thức vận chuyển</a></li>
                                <li><a href="#">Quy định đặt hàng</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer;
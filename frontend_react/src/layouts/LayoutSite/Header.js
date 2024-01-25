import { Link } from 'react-router-dom';
import Logo from '../../assets/images/ligi.jpg'
import { FaCartPlus, FaFacebook, FaTwitter, FaLinkedin, FaPinterestP, FaUser, FaPhone } from 'react-icons/fa';
import './LayoutSiteStyle.css'
import { Button } from 'bootstrap';

const Header = () => {
    return (
        <section style={{ margin: "20px" }}>
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                                        <li>Free Shipping for all Order of $99</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <Link href="#"><i><FaFacebook /></i></Link>
                                        <Link href="#"><i><FaTwitter /></i></Link>
                                        <Link href="#"><i><FaLinkedin /></i></Link>
                                        <Link href="#"><i><FaPinterestP /></i></Link>
                                    </div>
                                    <div className="header__top__right__language">
                                        <Link href="#"><i><FaUser /></i>  Đăng ký</Link>
                                    </div>
                                    <div className="header__top__right__auth">
                                        <Link href="#"><i><FaUser /></i> Đăng nhập</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="header__logo" to="http://localhost:3000/">
                                <img src={Logo} className="img-fluid" alt="LOGO" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-9">
                                    <nav className="header__menu">
                                        <div className="hero__search">
                                            <div className="hero__search__form">
                                                <form action="#">                                                 
                                                    <input type="text" placeholder="What do yo u need?" />
                                                    <button type="submit" className="site-btn">Tìm kiếm</button>
                                                </form>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__search__phone">
                                        <div className="hero__search__phone__icon">
                                            <i className="fa fa-phone"><FaPhone /></i>
                                        </div>
                                        <div className="hero__search__phone__text">
                                            <h5>+65 123.456.789</h5>
                                            <span>support 24/7 time</span>
                                        </div>
                                    </div>                                
                                </div>
                                <div className="col-lg-6">                                
                                     <div className="header__cart">
                                        <ul>
                                            <li><Link href="#"><i className="fa fa-shopping-bag"><FaCartPlus /></i> <span>3</span></Link></li>
                                        </ul>
                                        <div className="header__cart__price">item: <span>$150.00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </section>
    )
}
export default Header;
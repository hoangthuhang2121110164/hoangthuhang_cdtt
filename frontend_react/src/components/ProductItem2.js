import { Link } from "react-router-dom";
import { urlImage } from "../config";
import { FaHeart, FaRetweet, FaShoppingCart, FaLinkedin, FaPinterestP, FaUser, FaPhone } from 'react-icons/fa';

const ProductItem2 = (props) => {
  const product = props.product;
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
        <div className="featured__item">
          <div className="featured__item__pic set-bg">
            <Link to={"/chi-tiet-san-pham/" + props.product.slug}>
              <img
                src={urlImage + "product/" + props.product.image}
                className="img-fluid"
                alt="hinh san pham"
              />
            </Link>
            {/* <ul className="featured__item__pic__hover">
              <li>
                <a href="#">
                  <FaHeart />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaRetweet />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaShoppingCart />
                </a>
              </li>
            </ul> */}
          </div>
          <div className="featured__item__text">
            <h6>
              <a href="#">{props.product.name}</a>
            </h6>
            <h5>{props.product.price}</h5>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem2;

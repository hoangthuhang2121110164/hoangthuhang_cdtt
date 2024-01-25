import { Link } from "react-router-dom";
import { urlImage } from "../../../config";

function PostItem (props){
return(
    <div className="col-md-6 p-2">
        <div className="product-item border">
            <Link to={"/chi-tiet-bai-viet/"+props.post.slug}>
                <img src={urlImage+"post/"+props.post.image} className="img-fluid" alt="hinh bai viet"/>
            </Link>
            <h3 className="fs-5 p-2">{props.post.title}</h3>
            <p>{props.post.detail}</p>
        </div>
    </div>
);
}export default PostItem;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import './LayoutSiteStyle.css'

function ListCategory() {
    const [listCategory, setListCategory] = useState([]);
    useEffect(function () {
        (async function () {
            try{
            const result = await CategoryService.getCategoryByParentId(0);
            setListCategory(result.categorys);
        } catch (error) {
            console.error(error)
        }
        })();
    }, []);
    return (
        <div class="listcategory m-4">
           <div className="category-title bg-main">
        <h3 className="fs-5 py-3 text-center">DANH MỤC SẢN PHẨM</h3>
       </div>
            <ul>
                {listCategory.map(function (cat, index) {
                    return (
                        <li key={index}>
                            <Link to={"/danh-muc-san-pham/"+cat.slug}>{cat.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ListCategory;
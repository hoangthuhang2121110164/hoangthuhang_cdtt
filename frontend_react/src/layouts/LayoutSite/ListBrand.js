import { Link } from "react-router-dom";
import BrandService from "../../services/BrandService";
import { useEffect, useState } from "react";
import './LayoutSiteStyle.css'

function ListBrand() {
    const [listBrand, setListBrand] = useState([]);
    useEffect(function () {
        (async function () {
            try{
            const result = await BrandService.index();
            setListBrand(result.brands);
        } catch (error) {
            console.error(error)
        }
        })();
    }, []);
    return (
        <div className="listbrand m-4">
                <h3 className="bg-info p-3 m-0 text-center">Thương hiệu</h3>
            <ul>
            {listBrand.map(function (br, index) {
                    return (
                        <li key={index}>
                            <Link to={"/thuong-hieu-san-pham/"+br.slug}>{br.name}</Link>
                        </li>
                    )
                })}            </ul>
        </div>
    );
}

export default ListBrand;
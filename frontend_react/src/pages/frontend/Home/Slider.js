import { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService";
import { urlImage } from "../../../config";

const Slider = () => {
    const [sliders, setSliders] = useState([]);
    useEffect(function () {
        (async function () {
            const result = await BannerService.getByPosition('slideshow');
            setSliders(result.banners);
        })();
    }, []);
    return (
        <div className="slideshow">
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    {sliders && sliders.map(function (slider, index) {
                        if (index === 0) {
                            return (
                                <div key={index} className="carousel-item active">
                                    <img src={urlImage + "banner/" + slider.image} className="d-block w-100" alt={slider.image} />
                                </div>
                            );
                        }
                        else {
                            return (
                                <div key={index} className="carousel-item">
                                    <img src={urlImage + "banner/" + slider.image} className="d-block w-100" alt={slider.image} />
                                </div>
                            );
                        }
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Slider;
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import KataAlumni from './KataAlumni';
import {Link} from 'react-router-dom';


const SliderKataAlumni = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows:false,
        dotsClass:'mydot2',
        customPaging: i => <div className="custom-paging bg-white h-2 cursor-pointer transition-all duration-150 w-4 mx-1 rounded"></div>,
        responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
        ]
    }
    return (
        <div className="w-full md:w-6/12 lg:w-7/12">  
            <div className="text-4xl px-5 my-5 text-white font-bold">
                KATA ALUMNI
            </div>
            <Slider {...settings}>
                <KataAlumni/>
                <KataAlumni/>
                <KataAlumni/>
            </Slider>
            <div className="w-full flex justify-end relative bottom-5">
                <Link to="/kumpulan-alumni/2019" className="text-white text-md mr-5">alumni lainnya</Link>
            </div>
        </div>
    );
}

export default SliderKataAlumni;
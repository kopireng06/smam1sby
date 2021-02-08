import React, { useState, useEffect,Fragment } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "animate.css"
import ReactHtmlParser from 'react-html-parser';

const Carousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade:true,
        arrows:false,
        dotsClass:'mydot',
        autoplay:false,
        beforeChange: (current, next) => setNextSlide(next),
        customPaging: i => <div className="custom-paging bg-yellow-400 h-2 cursor-pointer transition-all duration-150 w-4 mx-1 rounded"></div>
    }

    const [nextSlide, setNextSlide] = useState(0);


    useEffect(() => {

    });

    // const [coba, setcoba] = useState(0);
    // useEffect(() => {
    //   fetch('http://127.0.0.1:8000/keong')
    //     .then(response => response.json())
    //     .then(data => setcoba(data));
    // });

    return (
      <Fragment>
        <div className="relative h-screen w-full">
          {/* {ReactHtmlParser(coba)} */}
          <Slider {...settings}>
            <div>
              <div className="bg-center bg-no-repeat bg-cover h-screen" style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../image/mengabdi.jpg)"}}>
                <div className="lg:container mx-auto p-5 flex flex-col h-screen items-center md:items-start justify-center">
                  {
                    (() =>{
                      if(nextSlide==0){
                        return(
                          <Fragment>
                            <div className="text-xl md:text-4xl font-bold text-white px-3 py-2 w-max bg-smam1 animate__animated animate__fadeInDown animate__delay-1s">
                                MENCETAK GENERASI CERDAS
                            </div>
                            <div className="my-3 p-3 w-3/4 md:w-1/2 bg-smam1-a animate__animated animate__fadeInDown animate__delay-2s">
                                <div className="text-white font-bold text-xs md:text-lg">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam perspiciatis omnis, nihil rem nulla 
                                    impedit numquam eos atque ipsum ullam porro inventore necessitatibus doloremque autem at 
                                </div>
                            </div>
                          </Fragment>
                        )
                      }
                    })()
                  }
                </div>
              </div>
            </div>
            <div>
              <div className="bg-center bg-no-repeat bg-cover h-screen" style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../image/santri-al-imdad.jpg)"}}>
                <div className="lg:container mx-auto p-5 flex flex-col h-screen items-center md:items-start justify-center">
                {
                    (() =>{
                      if(nextSlide==1){
                        return(
                          <Fragment>
                            <div className="text-xl md:text-4xl font-bold text-white px-3 py-2 w-max bg-smam1 animate__animated animate__fadeInDown animate__delay-1s">
                                SANTRI KUDU WANI
                            </div>
                            <div className="my-3 p-3 w-3/4 md:w-1/2 bg-smam1-a animate__animated animate__fadeInDown animate__delay-2s">
                                <div className="text-white font-bold text-xs md:text-lg">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam perspiciatis omnis, nihil rem nulla 
                                    impedit numquam eos atque ipsum ullam porro inventore necessitatibus doloremque autem at 
                                </div>
                            </div>
                          </Fragment>
                        )
                      }
                    })()
                  }
                </div>
              </div>
            </div>
            <div>
              <div className="bg-center bg-no-repeat bg-cover h-screen" style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../image/smk59.jpeg)"}}>
                <div className="lg:container mx-auto p-5 flex flex-col h-screen items-center md:items-start justify-center">
                {
                    (() =>{
                      if(nextSlide==2){
                        return(
                          <Fragment>
                            <div className="text-xl md:text-4xl font-bold text-white px-3 py-2 w-max bg-smam1 animate__animated animate__fadeInDown animate__delay-1s">
                                MENCETAK GENERASI CERDAS
                            </div>
                            <div className="my-3 p-3 w-3/4 md:w-1/2 bg-smam1-a animate__animated animate__fadeInDown animate__delay-2s">
                                <div className="text-white font-bold text-xs md:text-lg">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam perspiciatis omnis, nihil rem nulla 
                                    impedit numquam eos atque ipsum ullam porro inventore necessitatibus doloremque autem at 
                                </div>
                            </div>
                          </Fragment>
                        )
                      }
                    })()
                  }
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </Fragment>
    );
}
 
export default Carousel;
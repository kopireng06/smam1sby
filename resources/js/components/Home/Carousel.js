import React, { useState, useEffect,Fragment } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "animate.css";


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

    const callDataCarousel = async () => {
      var data;
      await axios.get(window.origin+'/api/carousel' , { cancelToken: source.token })
        .then((res)=>{
          data = res.data;
        })
      return data;
    }
      
    const [nextSlide, setNextSlide] = useState(0);
    const [dataCarousel, setDataCarousel] = useState([]);
    const source = axios.CancelToken.source();

    useEffect(() => {
      var isSubscribed = true;

      callDataCarousel()
      .then((data)=>{
        if(isSubscribed){
          setDataCarousel(data);
        }
      })

      return ()=>{
        isSubscribed = false;
        source.cancel("cancel");
      }

    },[]);
  
    return (
      <Fragment>
        <div className="relative h-screen w-full">
          <Slider {...settings}>
            {
              (()=>{
                  return(
                    dataCarousel.map((data,i)=>
                      <div key={i}>
                        <div className="bg-center bg-no-repeat bg-cover h-screen" style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("+window.origin+"/images/carousel/"+data.foto_car+")"}}>
                          <div className="lg:container mx-auto p-5 flex flex-col h-screen items-center md:items-start justify-center">
                            {
                              (() =>{
                                if(nextSlide==i){
                                  return(
                                    <Fragment>
                                      <div className="text-xl md:text-4xl font-bold text-white px-3 py-2 w-max bg-smam1 animate__animated animate__fadeInDown animate__delay-1s">
                                          {data.judul_car}
                                      </div>
                                      <div className="my-3 p-3 w-3/4 md:w-1/2 bg-smam1-a animate__animated animate__fadeInDown animate__delay-2s">
                                          <div className="text-white font-bold text-xs md:text-lg">
                                              {data.isi_car}
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
                    )
                  )
              }
              )()
            }
          </Slider>
        </div>
      </Fragment>
    );
}
 
export default Carousel;
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const ContainerCard = () => {
    return (
        <div className="lg:container mx-auto">
            <div className="text-4xl px-5 my-5 text-smam1 font-bold">
                BERITA
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
                <Link to="#" className="card-news relative w-3/4 h-96 bg-smam1 mx-auto my-3 bg-cover bg-no-repeat bg-center" style={{backgroundImage:"url(../image/carnival-1.jpg)"}}>
                    <div className="card-content-wrapper absolute flex flex-col bottom-0 w-full bg-smam1-a-2">
                        <div className="text-lg font-bold text-white px-5 pt-3 a">
                            1 MUHARRAM, SMAM 1 ADAKAN LOMBA CARNIVAL
                        </div>
                        <span className="ml-auto p-2 text-white text-xs">12 September 2020</span>
                        <div className="news-content px-5 text-white text-sm pb-3">Lorem ipsum dolor sit amet 
                        consectetur adipisicing elit. Voluptate distinctio laborum id sapiente voluptatum itaque. Saepe ullam, 
                        illum labore beatae cupiditate harum natus magni sequi praesentium, dolor doloremque consectetur est!</div>
                        <div className="news-category absolute right-0 bg-yellow-400 font-bold text-sm px-3">HALO</div>
                    </div>
                </Link>
                <Link to="#" className="card-news relative w-3/4 h-96 bg-smam1 mx-auto my-3 bg-cover bg-no-repeat bg-center" style={{backgroundImage:"url(../image/carnival-1.jpg)"}}>
                    <div className="card-content-wrapper absolute flex flex-col bottom-0 w-full bg-smam1-a-2">
                        <div className="text-lg font-bold text-white px-5 pt-3 a">
                            1 MUHARRAM, SMAM 1 ADAKAN LOMBA CARNIVAL
                        </div>
                        <span className="ml-auto p-2 text-white text-xs">12 September 2020</span>
                        <div className="news-content px-5 text-white text-sm pb-3">Lorem ipsum dolor sit amet 
                        consectetur adipisicing elit. Voluptate distinctio laborum id sapiente voluptatum itaque. Saepe ullam, 
                        illum labore beatae cupiditate harum natus magni sequi praesentium, dolor doloremque consectetur est!</div>
                        <div className="news-category absolute right-0 bg-yellow-400 font-bold text-sm px-3">HALO</div>
                    </div>
                </Link>
                <Link to="#" className="card-news relative w-3/4 h-96 bg-smam1 mx-auto my-3 bg-cover bg-no-repeat bg-center" style={{backgroundImage:"url(../image/carnival-1.jpg)"}}>
                    <div className="card-content-wrapper absolute flex flex-col bottom-0 w-full bg-smam1-a-2">
                        <div className="text-lg font-bold text-white px-5 pt-3 a">
                            1 MUHARRAM, SMAM 1 ADAKAN LOMBA CARNIVAL
                        </div>
                        <span className="ml-auto p-2 text-white text-xs">12 September 2020</span>
                        <div className="news-content px-5 text-white text-sm pb-3">Lorem ipsum dolor sit amet 
                        consectetur adipisicing elit. Voluptate distinctio laborum id sapiente voluptatum itaque. Saepe ullam, 
                        illum labore beatae cupiditate harum natus magni sequi praesentium, dolor doloremque consectetur est!</div>
                        <div className="news-category absolute right-0 bg-yellow-400 font-bold text-sm px-3">HALO</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
 
export default ContainerCard;


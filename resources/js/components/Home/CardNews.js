import React from 'react';
import {Link} from 'react-router-dom';

const CardNews = (props) => {
    return (
        <div className="card-news relative w-10/12 h-96 bg-smam1 mx-auto my-3 bg-cover bg-no-repeat bg-center" style={{backgroundImage:"url(../image/carnival-1.jpg)"}}>
            <div className="card-content-wrapper overflow-hidden absolute flex flex-col bottom-0 w-full bg-smam1-a-2">
                <span className="ml-auto p-2 text-white text-xs">12 September 2020</span>
                <div className="text-md font-bold text-white px-5 mb-2">
                    1 MUHARRAM, SMAM 1 ADAKAN LOMBA CARNIVAL, PAK CAMAT PUN IKUT HADIR
                </div>
                <div className="news-content px-5 text-white text-sm">Lorem ipsum dolor sit amet 
                consectetur adipisicing elit. Voluptate distinctio laborum id sapiente voluptatum itaque. Saepe ullam, 
                illum labore beatae cupiditate harum natus magni sequi praesentium, dolor doloremque consectetur est ....</div>
                <div className="news-button justify-center items-center mt-5">
                    <div className="flex-1 mx-2 h-0.5 bg-yellow-400"></div>
                    <Link to="#" className="bg-yellow-400 px-2 py-1 rounded text-center text-sm">BACA</Link>
                    <div className="flex-1 mx-2 h-0.5 bg-yellow-400"></div>
                </div>
            </div>
            <div className="news-category absolute left-0 bg-yellow-400 font-bold text-sm px-3">EVENT</div>
        </div>
    );
}
 
export default CardNews;
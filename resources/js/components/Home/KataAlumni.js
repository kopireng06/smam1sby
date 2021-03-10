import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const KataAlumni = (props) => {

    const {foto,nama,jurusan,univ,isi} = props;

    return (
        <div className="outline-none">
            <div className="relative w-11/12 mx-auto h-80 bg-white rounded-lg shadow m-10 p-5">
                <img src="image/petik-biru.png" className="h-8 my-2" alt="" />
                <div id="isi-slider" className="h-40 flex flex-col justify-center">
                    {ReactHtmlParser(isi)}
                </div>
                <span className="block text-center font-bold mt-5 mb-1">{nama}</span>
                <span className="block text-center text-xs">{jurusan} , {univ}</span>
                <div className="absolute-x-center -top-10 bg-center bg-no-repeat bg-cover border-2 border-yellow-300 shadow
                h-24 w-24 rounded-full" style={{backgroundImage:"url("+window.origin+'/images/testimoni/'+foto+")"}}></div>
            </div>
        </div>
    );
}

export default KataAlumni;
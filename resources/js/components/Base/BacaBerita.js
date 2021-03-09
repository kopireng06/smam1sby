import React,{useState,useEffect} from 'react';
import BackgroundNavbar from './BackgroundNavbar';
import Footer from './Footer';
import Artikel from '../Artikel/Artikel';
import {useHistory,useParams} from 'react-router-dom';

const BacaBerita = (props) => {


    const getMainPath = (str)=> {
        const regex = /^\/([^?\/]+)/;
        return str.match(regex)[1];
    }

    const location = getMainPath(useHistory().location.pathname);
    const judul = useParams().judul;

    useEffect(() => {
        //console.log(judul);
        //console.log(location);
    }, []);

    return (  
        <>
            <BackgroundNavbar/>
                <div className="text-4xl text-center mt-5 text-smam1 font-bold mb-8 md:mb-5">
                {
                    (()=>{
                        if(location == 'berita'){
                            return 'BERITA'
                        }
                        if(location == 'pengumuman'){
                            return 'PENGUMUMAN'
                        }
                    })()
                }
            </div>
            <Artikel pembeda={judul} centerPath={location}/>
            <Footer/>
        </>
    )
}


export default BacaBerita;
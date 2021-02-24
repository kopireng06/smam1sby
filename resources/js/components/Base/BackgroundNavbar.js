import React , {useEffect,useState} from 'react';
import { withRouter } from "react-router";
import {Link} from "react-router-dom";

const BackgroundNavbar = (props) => {

    const [navBackground,setNavBackground] = useState();

    useEffect(() => {
        setNavBackground(()=>{
            if(getMainPath(props.location.pathname)=='kumpulan-profil'){
                return(
                    <>
                        <Link to="/" className="text-md md:text-xl text-white font-bold mb-2">HOME</Link>
                        <div className="text-md md:text-xl text-white font-bold mb-2 mx-2">/</div>
                        <Link to="#" className="text-md md:text-xl text-white font-bold mb-2">PROFIL</Link>
                    </>
                )
            }
            if(getMainPath(props.location.pathname)=='berita'){
                return(
                    <>
                        <Link to="/" className="text-md md:text-xl text-white font-bold mb-2">HOME</Link>
                        <div className="text-md md:text-xl text-white font-bold mb-2 mx-2">/</div>
                        <Link to="#" className="text-md md:text-xl text-white font-bold mb-2">BERITA</Link>
                    </>
                )
            }
            if(getMainPath(props.location.pathname)=='kumpulan-prestasi'){
                return(
                    <>
                        <Link to="/" className="text-md md:text-xl text-white font-bold mb-2">HOME</Link>
                        <div className="text-md md:text-xl text-white font-bold mb-2 mx-2">/</div>
                        <Link to="#" className="text-md md:text-xl text-white font-bold mb-2">PRESTASI</Link>
                    </>
                )
            }
            if(getMainPath(props.location.pathname)=='kumpulan-alumni'){
                return(
                    <>
                        <Link to="/" className="text-md md:text-xl text-white font-bold mb-2">HOME</Link>
                        <div className="text-md md:text-xl text-white font-bold mb-2 mx-2">/</div>
                        <Link to="#" className="text-md md:text-xl text-white font-bold mb-2">ALUMNI</Link>
                    </>
                )
            }
            if(getMainPath(props.location.pathname)=='kumpulan-ekstrakurikuler'){
                return(
                    <>
                        <Link to="/" className="text-md md:text-xl text-white font-bold mb-2">HOME</Link>
                        <div className="text-md md:text-xl text-white font-bold mb-2 mx-2">/</div>
                        <Link to="#" className="text-md md:text-xl text-white font-bold mb-2">EKSTRAKURIKULER</Link>
                    </>
                )
            }
            if(getMainPath(props.location.pathname)=='kumpulan-fasilitas'){
                return(
                    <>
                        <Link to="/" className="text-md md:text-xl text-white font-bold mb-2">HOME</Link>
                        <div className="text-md md:text-xl text-white font-bold mb-2 mx-2">/</div>
                        <Link to="#" className="text-md md:text-xl text-white font-bold mb-2">FASILITAS</Link>
                    </>
                )
            }
            if(getMainPath(props.location.pathname)=='pengumuman'){
                return(
                    <>
                        <Link to="/" className="text-md md:text-xl text-white font-bold mb-2">HOME</Link>
                        <div className="text-md md:text-xl text-white font-bold mb-2 mx-2">/</div>
                        <Link to="#" className="text-md md:text-xl text-white font-bold mb-2">PENGUMUMAN</Link>
                    </>
                )
            }
        });
    },[props]);

    const getMainPath = (str)=> {
        const regex = /^\/([^?\/]+)/;
        return str.match(regex)[1];
    }

    return (  

            <div className="w-100 bg-smam1">
                <div className="lg:container px-5 mx-auto h-32 md:h-40 flex items-end">
                    {navBackground}
                </div>
            </div>
        
    );
}
 
export default withRouter(BackgroundNavbar);
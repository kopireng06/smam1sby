import React, { Fragment , useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

const Navbar = () => {

    const[navbarColor,setNavbarColor] = useState('');
    const[linkColor,setLinkColor] = useState(' text-white');
    const[hamburgerColor,setHamburgerColor] = useState(' hamburger-white');
    const[shadowNavbar,setShadowNavbar] = useState(' shadow-none');
    const[windowOrigin,setWindowOrigin] = useState(window.location.origin+'/');
    const[sidebarStat, setSidebarStat] = useState(0);
    const[dataNavbar, setDataNavbar] = useState(0);

    useEffect(() => {

        if(dataNavbar == 0 && window.pageYOffset == 0){
            callDataNavbar().then((res)=>{
                setDataNavbar(res);
            })
        }

        window.onscroll = () => {
            if(window.pageYOffset > 30){
                setNavbarColor(' bg-white');
                setLinkColor(' text-smam1');
                setHamburgerColor(' hamburger-smam1');
                setShadowNavbar(' shadow-md');
            }
            else{
                setNavbarColor('');
                setLinkColor(' text-white');
                setHamburgerColor(' hamburger-white');
                setShadowNavbar(' shadow-none');
            }
        }
    });
    
    const callDataNavbar = async () => {
        var data = {};
        await axios.get(window.origin+'/api/menu')
        .then((res)=>{
            data.eskul = res.data.ekskul[0].judul_konten;
            data.fasilitas = res.data.fasilitas[0].judul_konten;
            data.alumni = res.data.alumni[0].angkatan;
            data.profil = res.data.profil;
            data.link_terkait = res.data.link_terkait;
        });
        return data;
    }

    const changeSidebarStat = () => {
        if(sidebarStat==0){
            setSidebarStat(1);
        }
        else{
            setSidebarStat(0);
        }
    }

    const deliverPropsToSidebar = () => {
        if(sidebarStat==0){
            return '-15rem';
        }
        else{
            return '0';
        }
    }


    return (
        <Fragment>
            {
                (()=>{
                    if(dataNavbar != 0){
                        return(
                        <>
                        <div className={"w-full fixed-x-center z-20"+navbarColor+shadowNavbar}>
                        <div className={"lg:container mx-auto h-12 md:h-20 py-5 px-5 flex items-center justify-between transition-all duratiion-150"}>
                            <img src={windowOrigin+"image/logo-sma-2.png"} className="h-6 md:h-10" alt=""/>
                            <div className="flex items-center">
                                <Link to="/" className={"hidden lg:block font-bold mx-2"+linkColor}>
                                    HOME
                                </Link>
                                <div className={"cursor-pointer multi-link relative hidden lg:block font-bold mx-2"+linkColor}>
                                    PROFIL <span className={"inline-block relative text-xs transform rotate-90"+linkColor}> {'>'} </span>
                                    <div className="sub-link absolute rounded shadow-md w-40 p-3 bg-white flex flex-col">
                                        {
                                            (()=>{
                                                return(
                                                    dataNavbar.profil.map((data,i)=>
                                                        <Link key={i} to={"/kumpulan-profil/"+data.judul_konten} className="block text-smam1 hover:text-yellow-400 text-sm my-1">{data.judul_konten}</Link>
                                                    )
                                                )
                                            })()
                                        }
                                    </div>
                                </div>
                                <div className={"cursor-pointer multi-link relative hidden lg:block font-bold mx-2"+linkColor}>
                                    KABAR <span className={"inline-block relative text-xs transform rotate-90"+linkColor}> {'>'} </span>
                                    <div className="sub-link absolute rounded shadow-md w-40 p-3 bg-white flex flex-col">
                                            <Link to="/berita" className="block text-smam1 hover:text-yellow-400 text-sm my-1">berita</Link>
                                            <Link to="/pengumuman" className="block text-smam1 hover:text-yellow-400 text-sm my-1">pengumuman</Link>
                                    </div>
                                </div>
                                {/* <Link to="/berita" className={"hidden lg:block font-bold mx-2"+linkColor}>
                                    BERITA
                                </Link> */}
                                <Link to="/kumpulan-prestasi" className={"hidden lg:block font-bold mx-2"+linkColor}>
                                    PRESTASI
                                </Link>
                                <Link to={"/kumpulan-alumni/"+dataNavbar.alumni} className={"hidden lg:block font-bold mx-2"+linkColor}>
                                    ALUMNI
                                </Link>
                                <Link to={"/kumpulan-ekstrakurikuler/"+dataNavbar.eskul} className={"hidden lg:block font-bold mx-2"+linkColor}>
                                    EKSTRAKURIKULER
                                </Link>
                                <Link to={"/kumpulan-fasilitas/"+dataNavbar.fasilitas} className={"hidden lg:block font-bold mx-2"+linkColor}>
                                    FASILITAS
                                </Link>
                                <div className={"cursor-pointer multi-link hidden lg:block font-bold mx-2"+linkColor}>
                                    LINK TERKAIT <span className={"inline-block relative text-xs transform rotate-90"+linkColor}> {'>'} </span>
                                    <div className="sub-link absolute rounded shadow-md w-40 p-3 bg-white flex flex-col">
                                        {
                                            (()=>{
                                                return(
                                                    dataNavbar.link_terkait.map((data,i)=>
                                                        <a key={i} href={data.link_web} className="block text-smam1 hover:text-yellow-400 text-sm my-1">{data.nama_web}</a>
                                                    )
                                                )
                                            })()
                                        }
                                        </div>
                                </div>
                                <img src={windowOrigin+"image/hamburger.png"} className={"block lg:hidden ml-8 h-6 md:h-8 cursor-pointer"+hamburgerColor} alt="" onClick={changeSidebarStat}/>
                            </div>
                        </div>
                    </div>
                    <Sidebar sidebarStat={deliverPropsToSidebar()}/>
                    </>
                        )
                    }
                })()
            }
        </Fragment>
    );
}
 
export default Navbar;

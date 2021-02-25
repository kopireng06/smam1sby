import React, { Fragment , useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {

    const[navbarColor,setNavbarColor] = useState('');
    const[linkColor,setLinkColor] = useState(' text-white');
    const[hamburgerColor,setHamburgerColor] = useState(' hamburger-white');
    const[shadowNavbar,setShadowNavbar] = useState(' shadow-none');
    const[windowOrigin,setWindowOrigin] = useState(window.location.origin+'/');
    const[sidebarStat, setSidebarStat] = useState(0);

    useEffect(() => {
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
                                <Link to="/kumpulan-profil/SAMBUTAN KEPSEK" className="block text-smam1 hover:text-yellow-400 text-sm my-1">SAMBUTAN KEPSEK</Link>
                                <Link to="/kumpulan-profil/SMAMSA" className="block text-smam1 hover:text-yellow-400 text-sm my-1">SMAMSA</Link>
                            </div>
                        </div>
                        <Link to="/berita" className={"hidden lg:block font-bold mx-2"+linkColor}>
                            BERITA
                        </Link>
                        <Link to="/kumpulan-prestasi" className={"hidden lg:block font-bold mx-2"+linkColor}>
                            PRESTASI
                        </Link>
                        <Link to="/kumpulan-alumni/2018" className={"hidden lg:block font-bold mx-2"+linkColor}>
                            ALUMNI
                        </Link>
                        <Link to="/kumpulan-ekstrakurikuler/IPM" className={"hidden lg:block font-bold mx-2"+linkColor}>
                            EKSTRAKURIKULER
                        </Link>
                        <Link to="/kumpulan-fasilitas/AULA" className={"hidden lg:block font-bold mx-2"+linkColor}>
                            FASILITAS
                        </Link>
                        <div className={"cursor-pointer multi-link hidden lg:block font-bold mx-2"+linkColor}>
                            LINK TERKAIT <span className={"inline-block relative text-xs transform rotate-90"+linkColor}> {'>'} </span>
                            <div className="sub-link absolute rounded shadow-md w-40 p-3 bg-white flex flex-col">
                                <Link to="#" className="block text-smam1 hover:text-yellow-400 text-sm my-1">PPDB</Link>
                                <Link to="#" className="block text-smam1 hover:text-yellow-400 text-sm my-1">E-LEARNING</Link>
                            </div>
                        </div>
                        <img src={windowOrigin+"image/hamburger.png"} className={"block lg:hidden ml-8 h-6 md:h-8 cursor-pointer"+hamburgerColor} alt="" onClick={changeSidebarStat}/>
                    </div>
                </div>
            </div>
            <Sidebar sidebarStat={deliverPropsToSidebar()}/>
        </Fragment>
    );
}
 
export default Navbar;

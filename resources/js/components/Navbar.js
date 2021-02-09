import React, { Fragment , useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {

    //const[navbarStat,setNavbarStat] = useState('transparent');
    const[navbarColor,setNavbarColor] = useState('');
    const[linkColor,setLinkColor] = useState(' text-white');
    const[hamburgerColor,setHamburgerColor] = useState(' hamburger-white');
    const[shadowNavbar,setShadowNavbar] = useState(' shadow-none');

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

    return (
        <Fragment>
            <div className={"w-full fixed-x-center z-20"+navbarColor+shadowNavbar}>
                <div className={"lg:container mx-auto h-12 md:h-20 py-5 px-5 flex items-center justify-between transition-all duratiion-150"}>
                    <img src="image/logo-sma-2.png" className="h-6 md:h-10" alt=""/>
                    <div className="flex items-center">
                        <Link to="#" className={"hidden md:block font-bold mx-2"+linkColor}>
                            TENTANG
                        </Link>
                        <Link to="#" className={"hidden md:block font-bold mx-2"+linkColor}>
                            BERITA
                        </Link>
                        <Link to="#" className={"hidden md:block font-bold mx-2"+linkColor}>
                            PRESTASI
                        </Link>
                        <img src="image/hamburger.png" className={"block md:hidden ml-8 h-6 md:h-8 cursor-pointer"+hamburgerColor} alt="" onClick={props.changeSidebarStat}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Navbar;

import React, { Fragment , useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {

    //const[navbarStat,setNavbarStat] = useState('transparent');
    const[navbarColor,setNavbarColor] = useState('');
    const[linkColor,setLinkColor] = useState(' text-white');
    const[hamburgerColor,setHamburgerColor] = useState(' hamburger-white');

    useEffect(() => {
        window.onscroll = () => {
            console.log(window.pageYOffset);
            if(window.pageYOffset > 30){
                setNavbarColor(' bg-white');
                setLinkColor(' text-smam1');
                setHamburgerColor(' hamburger-smam1');
            }
            else{
                setNavbarColor('');
                setLinkColor(' text-white');
                setHamburgerColor(' hamburger-white');
            }
        }
    });

    return (
        <Fragment>
            <div className={"fixed-x-center w-full z-20 h-12 md:h-20 py-5 px-5 md:px-14 flex items-center justify-between transition-all duratiion-150" +navbarColor}>
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
        </Fragment>
    );
}
 
export default Navbar;

import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const Sidebar = (props) => {

    const [toggleLeft, setToggleLeft] = useState(props.sidebarStat);
    const [heightSubProfil, setHeightSubProfil] = useState(' h-0');
    const [heightSubLinkTerkait, setHeightSubLinkTerkait] = useState(' h-0');

    useEffect(() => {
        setToggleLeft(props.sidebarStat);
    },[props]);

    const handleClickProfil = () =>{
        if(heightSubProfil == ' h-0'){
            setHeightSubProfil(' h-5');
        }
        else{
            setHeightSubProfil(' h-0');
        }
    } 

    const handleClickLinkTerkait = () =>{
        if(heightSubLinkTerkait == ' h-0'){
            setHeightSubLinkTerkait(' h-5');
        }
        else{
            setHeightSubLinkTerkait(' h-0');
        }
    } 

    return (
        <div className="w-60 transition-all duration-1000 p-7 pt-14 flex flex-col fixed z-20 top-0 h-screen bg-smam1 shadow-md" style={{left:toggleLeft}}>
            <Link to="/" className="font-bold text-white text-sm my-1">
                HOME
            </Link>
            <div className="font-bold cursor-pointer text-white text-sm my-1" onClick={handleClickProfil}>
                PROFIL <span className="text-white ml-1 inline-block relative -top-1 text-xs transform rotate-90"> {'>'} </span>
            </div>
                <Link to="/kumpulan-profil/SAMBUTAN KEPSEK" className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubProfil}>
                    SAMBUTAN KEPSEK
                </Link>
                <Link to="/kumpulan-profil/SMAMSA" className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubProfil}>
                    SMAMSA
                </Link>
            <Link to="/berita" className="font-bold text-white text-sm my-1">
                BERITA
            </Link>
            <Link to="/kumpulan-prestasi" className="font-bold text-white text-sm my-1">
                PRESTASI
            </Link>
            <Link to="/kumpulan-alumni/2018" className="font-bold text-white text-sm my-1">
                ALUMNI
            </Link>
            <Link to="/kumpulan-ekstrakurikuler/IPM" className="font-bold text-white text-sm my-1">
                EKSTRAKURIKULER
            </Link>
            <Link to="/kumpulan-fasilitas/AULA" className="font-bold text-white text-sm my-1">
                FASILITAS
            </Link>
            <div  className="font-bold cursor-pointer text-white text-sm my-1" onClick={handleClickLinkTerkait}>
                LINK TERKAIT <span className="text-white ml-1 inline-block relative -top-1 text-xs transform rotate-90"> {'>'} </span>
            </div>
                <Link to="#" className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubLinkTerkait}>
                    PPDB
                </Link>
                <Link to="#" className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubLinkTerkait}>
                    E-LEARNING
                </Link>
        </div>
    );
}
 
export default Sidebar;
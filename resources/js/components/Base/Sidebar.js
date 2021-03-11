import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const Sidebar = (props) => {

    const [toggleLeft, setToggleLeft] = useState(props.sidebarStat);
    const [heightSubProfil, setHeightSubProfil] = useState(' h-0');
    const [heightSubLinkTerkait, setHeightSubLinkTerkait] = useState(' h-0');
    const [heightSubKabar, setHeightSubKabar] = useState(' h-0');
    const [dataSidebar,setDataSideBar] = useState(0);

    useEffect(() => {
        callDataSideBar().then((res)=>{
            setDataSideBar(res);
        });
        setToggleLeft(props.sidebarStat);
    },[props.sidebarStat]);

    const callDataSideBar = async()=>{
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
    
    const handleClickSubKabar = () =>{
        if(heightSubKabar == ' h-0'){
            setHeightSubKabar(' h-5');
        }
        else{
            setHeightSubKabar(' h-0');
        }
    } 

    return (
        <div className="w-60 transition-all duration-1000 p-7 pt-14 flex flex-col fixed z-20 top-0 h-screen bg-smam1 shadow-md" style={{left:toggleLeft}}>
            {
                (()=>{
                    if(dataSidebar==0){
                        return ''
                    }
                    else{
                        return(
                            <>
                                <Link to="/" className="font-bold text-white text-sm my-1">
                                    HOME
                                </Link>
                                <div className="font-bold cursor-pointer text-white text-sm my-1" onClick={handleClickProfil}>
                                    PROFIL <span className="text-white ml-1 inline-block relative -top-1 text-xs transform rotate-90"> {'>'} </span>
                                </div>
                                    {
                                        (()=>{
                                            return(
                                                dataSidebar.profil.map((data,i)=>
                                                    <Link key={i} to={'/kumpulan-profil/'+data.judul_konten}
                                                     className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubProfil}>{data.judul_konten}</Link>
                                                )
                                            )
                                        })()
                                    }
                                <div className="font-bold cursor-pointer text-white text-sm my-1" onClick={handleClickSubKabar}>
                                    KABAR <span className="text-white ml-1 inline-block relative -top-1 text-xs transform rotate-90"> {'>'} </span>
                                </div>
                                    <Link to="/BERITA" className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubKabar}>
                                        BERITA
                                    </Link>
                                    <Link to="/PENGUMUMAN" className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubKabar}>
                                        PENGUMUMAN
                                    </Link>
                                <Link to="/kumpulan-prestasi" className="font-bold text-white text-sm my-1">
                                    PRESTASI
                                </Link>
                                <Link to={"/kumpulan-alumni/"+dataSidebar.alumni} className="font-bold text-white text-sm my-1">
                                    ALUMNI
                                </Link>
                                <Link to={"/kumpulan-ekstrakurikuler/"+dataSidebar.eskul} className="font-bold text-white text-sm my-1">
                                    EKSTRAKURIKULER
                                </Link>
                                <Link to={"/kumpulan-fasilitas/"+dataSidebar.fasilitas} className="font-bold text-white text-sm my-1">
                                    FASILITAS
                                </Link>
                                <div  className="font-bold cursor-pointer text-white text-sm my-1" onClick={handleClickLinkTerkait}>
                                    LINK TERKAIT <span className="text-white ml-1 inline-block relative -top-1 text-xs transform rotate-90"> {'>'} </span>
                                </div>
                                    {
                                        (()=>{
                                            return(
                                                dataSidebar.link_terkait.map((data,i)=>
                                                    <a key={i} href={data.link_web} target="_blank"
                                                     className={"ml-3 overflow-hidden font-bold text-white text-sm transition-all duration-1000"+heightSubLinkTerkait}>{data.nama_web}</a>
                                                )
                                            )
                                        })()
                                    }

                            </>
                        )
                    }
                })()
            }
        </div>
    );
}
 
export default Sidebar;
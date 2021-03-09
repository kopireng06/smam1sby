import React ,{useState,useEffect} from 'react';
import { useHistory , useParams} from "react-router-dom";
import Artikel from './Artikel';
import JudulArtikel from './JudulArtikel';
import SearchArtikel from './SearchArtikel';
import SidebarArtikel from './SidebarArtikel';
import Footer from '../Base/Footer';
import axios from 'axios';

const ContainerArtikel = () => {
    const history = useHistory();
    const [pembeda,setPembeda] = useState(useParams().lastPath);
    const {centerPath} = useParams();
    const {lastPath} = useParams();
    const [dataOption,setDataOption] = useState();

    const callDataOption = async () =>{
        var data = {};
        
        if(centerPath=='kumpulan-alumni'){
            await axios.get(window.origin+'/api/list-alumni')
            .then((res)=>{
                data = res.data.map((data)=>data.angkatan)
            }); 
        }
        if(centerPath=='kumpulan-fasilitas'){
            await axios.get(window.origin+'/api/list-fasilitas')
            .then((res)=>{
                console.log(res.data[1].judul_konten);
                data = res.data.map((data)=>data.judul_konten);
            }); 
        }
        if(centerPath=='kumpulan-profil'){
            await axios.get(window.origin+'/api/profil')
            .then((res)=>{
                console.log(res.data[1].judul_konten);
                data = res.data.map((data)=>data.judul_konten);
            });   
        }
        if(centerPath=='kumpulan-ekstrakurikuler'){
            await axios.get(window.origin+'/api/list-ekstrakurikuler')
            .then((res)=>{
                console.log(res.data[1].judul_konten);
                data = res.data.map((data)=>data.judul_konten)

            }); 
        }

        return data;
    }

    useEffect(() => {
        callDataOption().then((res)=>{
            setDataOption(res);
            setPembeda(lastPath);
        })
    },[centerPath,lastPath]);

    
    const handleClick = (e) =>{
        history.push("/"+centerPath+"/"+e.target.dataset.value);
        setPembeda(e.target.dataset.value);
    }

    const handleOptionChange = (e) => {
        history.push("/"+centerPath+"/"+e.target.value);
        setPembeda(e.target.value);
    }

    if(dataOption !== undefined && centerPath !== undefined){
        return (  
            <>
            <div className="w-full bg-gray-50">
                <div className="lg:container mx-auto bg-white flex">
                    <SidebarArtikel dataOption={dataOption} centerPath={centerPath} pembeda={pembeda} handleClick={handleClick}/>
                    <div className="w-full md:w-10/12">
                        <JudulArtikel centerPath={centerPath}/>
                        <SearchArtikel dataOption={dataOption} handleOptionChange={handleOptionChange} pembeda={pembeda}/>
                        <Artikel centerPath={centerPath} pembeda={pembeda}/>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        );
    }
    else{
        return(
            <div></div>
        )
    }
}
 
export default ContainerArtikel;
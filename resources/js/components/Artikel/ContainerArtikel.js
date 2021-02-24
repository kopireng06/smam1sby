import React ,{useState,useEffect} from 'react';
import { useHistory , useParams} from "react-router-dom";
import Artikel from './Artikel';
import JudulArtikel from './JudulArtikel';
import SearchArtikel from './SearchArtikel';
import SidebarArtikel from './SidebarArtikel';

const ContainerArtikel = () => {
    const history = useHistory();
    const [pembeda,setPembeda] = useState(useParams().lastPath);
    const {centerPath} = useParams();
    const {lastPath} = useParams();
    const [dataOption,setDataOption] = useState();

    useEffect(() => {
        setDataOption(()=>{
            if(centerPath=='kumpulan-alumni'){
                return [2018,2019,2020]
            }
            if(centerPath=='kumpulan-fasilitas'){
                return ['AULA','KANTOR','MASJID']
            }
            if(centerPath=='kumpulan-profil'){
                return ['SAMBUTAN KEPSEK','SMAMSA']
            }
            if(centerPath=='kumpulan-ekstrakurikuler'){
                return ['IPM','TAHFIDZ','HISTORY CLUB','CLUB JEPANG','TAPAK SUCI','MULTIMEDIA','FUTSAL','BULU TANGKIS']
            }
        })
        setPembeda(()=>{
            return lastPath;
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
        );
    }
    else{
        return(
            <div>keong</div>
        )
    }
}
 
export default ContainerArtikel;
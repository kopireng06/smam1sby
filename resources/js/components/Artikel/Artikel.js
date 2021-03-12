import React ,{useEffect,useState} from 'react';
import SkeletonTabel from './SkeletonTabel';
import Tabel from './Tabel';
import SkeletonArtikel from './SkeletonArtikel';
import Bacaan from './Bacaan';
import axios from 'axios';

const Artikel = (props) => {
    
    const [renderedArtikel,setRenderedArtikel] = useState(0);
    const abortController = new AbortController();

    useEffect(() => {
        renderArtikel();
        return ()=>{
            abortController.abort();
        }
    },[props.pembeda]);
    
    const renderArtikel = () => {
        getDataArtikel().then((result)=>{
            setRenderedArtikel(result);
        });
        setRenderedArtikel(
            ()=>{
                if(props.centerPath=='kumpulan-alumni'){
                    return (<SkeletonTabel/>)
                }
                else{
                    return (<SkeletonArtikel/>)
                }
            }
        );
    }

    const getDataArtikel = async () => {
        var data;
        await axios.get(window.origin+'/api/'+props.centerPath+'/'+props.pembeda)
            .then((res)=>{
                if(props.centerPath=='kumpulan-alumni'){
                    data = (<Tabel data={res.data}/>)
                }
                else{
                    data = (<Bacaan data={res.data} />)
                }
            });
        return data;
    }

    return (
        <>{renderedArtikel}</>
    );
}
 
export default Artikel;
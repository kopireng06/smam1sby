import React ,{useEffect,useState} from 'react';
import SkeletonTabel from './SkeletonTabel';
import Tabel from './Tabel';
import SkeletonArtikel from './SkeletonArtikel';
import Bacaan from './Bacaan';


const Artikel = (props) => {
    
    const [renderedArtikel,setRenderedArtikel] = useState();

    useEffect(() => {
        renderArtikel();
    },[props]);
    
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
        await new Promise((resolve)=>{
            setTimeout(()=>{
                data = ()=>{
                    if(props.centerPath=='kumpulan-alumni'){
                        return (<Tabel/>)
                    }
                    else{
                        return (<Bacaan/>)
                    }
                };
                resolve(0);
            },1000)
        })
        return data;
    }

    return (
        <>{renderedArtikel}</>
    );
}
 
export default Artikel;
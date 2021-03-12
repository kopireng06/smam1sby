import React,{useState,useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Prestasi from '../Home/Prestasi';
import SkeletonPrestasi from './SkeletonPrestasi';
import axios from 'axios';

const InfinitePrestasi = (props) => {
    const [dataPrestasi,setDataPrestasi] = useState(Array.from({length:0}));
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [limit,setLimit] = useState(10);
    const [offset,setOffset] = useState(0);
    const abortController = new AbortController();
    
    useEffect(() => {
        getDataPrestasi();
        return ()=>{
            abortController.abort();
        }
    }, []);

    const callDataPrestasi = async ()=>{
        var data;
        await axios.get(window.origin+'/api/prestasi/'+offset+'/'+limit)
        .then((res)=>{
            data = res.data;
        });
        return data;
    }

    const getDataPrestasi = () => { 
        callDataPrestasi().then((res)=>{
            if(res.length % 10 !=0){
                setHasMoreItems(false);
                setDataPrestasi(dataPrestasi.concat(res));
                setOffset(offset+10);
            }
            else{
                setDataPrestasi(dataPrestasi.concat(res));
                setOffset(offset+10);
            }
        }); 
    }

    return ( 
        <InfiniteScroll
            dataLength={dataPrestasi.length}
            next={getDataPrestasi}
            hasMore={hasMoreItems}
            loader={
                <SkeletonPrestasi/>
            }>
                    {dataPrestasi.map((data, i) => (
                        <Prestasi key={i} pos={i+1} 
                        posActive={props.posActive} changePosActive={props.changePosActive}
                        nama={data.nama_prestasi} juara={data.juara_prestasi} tingkat={data.tingkat_prestasi}
                        />
                    ))}
        </InfiniteScroll>
     );
}
 
export default InfinitePrestasi;
import React,{useState,useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Prestasi from '../Home/Prestasi';
import SkeletonPrestasi from './SkeletonPrestasi';

const InfinitePrestasi = (props) => {
    const [dataPrestasi,setDataPrestasi] = useState(Array.from({length:0}));
    const [hasMoreItems, setHasMoreItems] = useState(true);

    useEffect(() => {
        getDataPrestasi();
    }, []);

    const getDataPrestasi = () => {
        if (dataPrestasi.length >= 30) {
            setHasMoreItems(false);
            return;
          }
          setTimeout(() => {
            setDataPrestasi(dataPrestasi.concat(Array.from({length:10})));
          }, 1000);     
    }

    return ( 
        <InfiniteScroll
            dataLength={dataPrestasi.length}
            next={getDataPrestasi}
            hasMore={hasMoreItems}
            loader={
                <SkeletonPrestasi/>
            }>
                    {dataPrestasi.map((i, index) => (
                        <Prestasi pos={index+1} posActive={props.posActive} changePosActive={props.changePosActive} key={index}/>
                    ))}
        </InfiniteScroll>
     );
}
 
export default InfinitePrestasi;
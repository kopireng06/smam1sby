import React,{useState,useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pengumuman from './Pengumuman';
import SkeletonPengumuman from './SkeletonPengumuman';


const InfinitePengumuman = () => {
    const [dataPengumuman,setDataPengumuman] = useState(Array.from({length:0}));
    const [hasMoreItems, setHasMoreItems] = useState(true);

    useEffect(() => {
        getDataPengumuman();
    }, []);

    const getDataPengumuman = () => {
        if (dataPengumuman.length >= 30) {
            setHasMoreItems(false);
            return;
          }
          setTimeout(() => {
            setDataPengumuman(dataPengumuman.concat(Array.from({length:10})));
          }, 1000);     
    }

    return (  
        <InfiniteScroll
            dataLength={dataPengumuman.length}
            next={getDataPengumuman}
            hasMore={hasMoreItems}
            loader={
                <SkeletonPengumuman/>
            }>
                    {dataPengumuman.map((i, index) => (
                        <Pengumuman key={index}/>
                    ))}
        </InfiniteScroll>
    );
}
 
export default InfinitePengumuman;
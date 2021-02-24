import React ,{useState,useEffect} from 'react';
import Berita from '../Home/Berita';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonBerita from './SkeletonBerita';

const InfiniteBerita = () => {
    const [dataBerita,setDataBerita] = useState(Array.from({length:0}));
    const [hasMoreItems, setHasMoreItems] = useState(true);

    useEffect(() => {
        getDataBerita();
    }, []);

    const getDataBerita = () => {
        if (dataBerita.length >= 30) {
            setHasMoreItems(false);
            return;
          }
          setTimeout(() => {
            setDataBerita(dataBerita.concat(Array.from({length:9})));
          }, 1000);     
    }

    return (  
        <InfiniteScroll
            dataLength={dataBerita.length}
            next={getDataBerita}
            hasMore={hasMoreItems}
            loader={
                <SkeletonBerita length={6}/>
            }
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5"}
            >
                    {dataBerita.map((i, index) => (
                        <Berita key={index}/>
                    ))}
        </InfiniteScroll>
    );
}
 
export default InfiniteBerita;
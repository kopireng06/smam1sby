import React ,{useState,useEffect} from 'react';
import Berita from '../Home/Berita';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonBerita from './SkeletonBerita';

const InfiniteBerita = () => {
    const [dataBerita,setDataBerita] = useState(Array.from({length:0}));
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [limit,setLimit] = useState(9);
    const [offset,setOffset] = useState(0);
    
    
    useEffect(() => {
        var isSubscribed = true;
        callDataBerita().then((res)=>{
            if(isSubscribed){
                if(res.length % 9 != 0){
                    setHasMoreItems(false);
                    setDataBerita(dataBerita.concat(res));
                    setOffset(offset+9);
                }
                else{
                    setDataBerita(dataBerita.concat(res));
                    setOffset(offset+9);
                }
            }
        });  
        return ()=>{
            isSubscribed = false;
        }
    }, []);

    const callDataBerita = async ()=>{
        var data;
        await axios.get(window.origin+'/api/berita/'+offset+'/'+limit)
        .then((res)=>{
            data = res.data;
        });
        return data;
    }

    const getDataBerita = () => {
        callDataBerita().then((res)=>{
            if(res.length % 9 != 0){
                setHasMoreItems(false);
                setDataBerita(dataBerita.concat(res));
                setOffset(offset+9);
            }
            else{
                setDataBerita(dataBerita.concat(res));
                setOffset(offset+9);
            }
        });     
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
                    {dataBerita.map((data ,i)=>
                        <Berita key={i} judul={data.judul_artikel} foto={data.foto_artikel} tanggal={data.created_at}/>
                    )}
        </InfiniteScroll>
    );
}
 
export default InfiniteBerita;
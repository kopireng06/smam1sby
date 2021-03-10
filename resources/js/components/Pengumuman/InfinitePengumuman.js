import React,{useState,useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pengumuman from './Pengumuman';
import SkeletonPengumuman from './SkeletonPengumuman';


const InfinitePengumuman = () => {
    const [dataPengumuman,setDataPengumuman] = useState(Array.from({length:0}));
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [limit,setLimit] = useState(7);
    const [offset,setOffset] = useState(0);

    useEffect(() => {
        getDataPengumuman();
    }, []);

    const callDataPengumuman = async ()=>{
        var data;
        await axios.get(window.origin+'/api/pengumuman/'+offset+'/'+limit)
        .then((res)=>{
            data = res.data;
        });
        return data;
    }

    const getDataPengumuman = () => {
        callDataPengumuman().then((res)=>{
            if(res.length % 7 !=0){
                setHasMoreItems(false);
                setDataPengumuman(dataPengumuman.concat(res));
                setOffset(offset+7);
            }
            else{
                setDataPengumuman(dataPengumuman.concat(res));
                setOffset(offset+7);
            }
        });  
    }

    return (  
        <InfiniteScroll
            dataLength={dataPengumuman.length}
            next={getDataPengumuman}
            hasMore={hasMoreItems}
            loader={
                <SkeletonPengumuman/>
            }>
                    {dataPengumuman.map((data, i) => (
                        <Pengumuman key={i} judul={data.judul_pengumuman} tanggal={data.created_at}/>
                    ))}
        </InfiniteScroll>
    );
}
 
export default InfinitePengumuman;
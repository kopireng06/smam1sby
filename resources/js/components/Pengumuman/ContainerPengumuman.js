import React,{useState,Suspense} from 'react';
import Pengumuman from './Pengumuman';
import InfinitePengumuman from './InfinitePengumuman'
import SkeletonPengumuman from './SkeletonPengumuman';

const ContainerPengumuman = () => {
    const [dataSearch, setDataSearch] = useState('');
    const [dataPost, setDataPost]= useState('');
    const [hasilSearch, setHasilSearch] = useState();


    const handleSubmitSearch = (event) => {
        renderHasilSearch().then(function(done) {
           setHasilSearch(done);
        });

        setDataPost(dataSearch);
        setHasilSearch(
            <SkeletonPengumuman/>
        );

        event.preventDefault();
    }

    const handleChangeSearch = (event) => {
        setDataSearch(event.target.value);
    }

    const renderHasilSearch = async () => { 
        var data;
        await axios.get(window.origin+'/api/pengumuman/search/'+dataSearch)
        .then((res)=>{
            data = res.data.map((data ,i)=>
                <Pengumuman key={i} judul={data.judul_pengumuman} tanggal={data.created_at}/>
            )
        });
        return data;
    }

    const renderPengumuman = () =>{
        if (dataPost != ''){
            return(
                hasilSearch
            )
        }
        else{
            return(
                <InfinitePengumuman/>
            )
        }
    }

    return (
        <div className="lg:container mx-auto">
            <div className="text-4xl text-center px-5 my-5 text-smam1 font-bold">
                PENGUMUMAN
            </div>
            <form onSubmit={handleSubmitSearch} className="w-10/12 md:w-7/12 flex mx-auto mt-2 mb-7 h-10 md:h-14 relative">
                <input type="text" placeholder="CARI PENGUMUMAN" onChange={handleChangeSearch} className="flex-1 bg-white p-3 rounded shadow border-2 border-solid border-gray-300" />
                <div onClick={handleSubmitSearch} className="cursor-pointer absolute-y-center flex justify-center items-center h-8 md:h-12 w-12 bg-smam1 right-1 rounded">
                    <img src="../image/search.svg" className="cursor-pointer h-6 md:h-8" alt=""/>
                </div>
            </form>
            <div className="w-11/12 md:w-7/12 mx-auto bg-smam1 shadow rounded p-2 flex flex-col mb-5">
                {
                   renderPengumuman()
                }
            </div>
        </div>
    );
}
 
export default ContainerPengumuman;
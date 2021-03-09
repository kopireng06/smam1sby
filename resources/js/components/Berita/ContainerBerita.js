import React, { useState } from 'react';
import Berita from '../Home/Berita';
import SkeletonBerita from './SkeletonBerita';
import InfiniteBerita from './InfiniteBerita';

const ContainerBerita = () => {

    const [dataSearch, setDataSearch] = useState('');
    const [dataPost, setDataPost]= useState('');
    const [hasilSearch, setHasilSearch] = useState();

    const handleSubmitSearch = (event) => {
        renderHasilSearch().then(function(done) {
           setHasilSearch(done);
        });
        setDataPost(dataSearch);
        setHasilSearch(wrapperHasilSearch(<SkeletonBerita length={6}/>));
        event.preventDefault();
    }

    const handleChangeSearch = (event) => {
        setDataSearch(event.target.value);
    }

    const renderHasilSearch = async () => { 
        var data;
        await axios.get(window.origin+'/api/berita/search/'+dataSearch)
        .then((res)=>{
            data = res.data.map((data ,i)=>
                <Berita key={i} judul={data.judul_artikel} foto={data.foto_artikel} tanggal={data.created_at}/>
            )
        });
        return wrapperHasilSearch(data);
    }

    const renderBerita = () =>{
        if (dataPost != ''){
            return(
                hasilSearch
            )
        }
        else{
            return(
                <InfiniteBerita/>
            )
        }
    }

    const wrapperHasilSearch = (child) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                {child}
            </div>
        )
    }

    return ( 
        <div className="lg:container mx-auto">
            <div className="text-4xl px-5 my-5 mb-8 text-smam1 font-bold">
                BERITA
            </div>
            <form onSubmit={handleSubmitSearch} className="w-10/12 md:w-7/12 flex mx-auto mt-2 mb-7 h-10 md:h-14 relative">
                <input type="text" placeholder="CARI BERITA" onChange={handleChangeSearch} className="flex-1 bg-white p-3 rounded shadow border-2 border-solid border-gray-300" />
                <div onClick={handleSubmitSearch} className="cursor-pointer absolute-y-center flex justify-center items-center h-8 md:h-12 w-12 bg-smam1 right-1 rounded">
                    <img src="../image/search.svg" className="cursor-pointer h-6 md:h-8" alt=""/>
                </div>
            </form>
                {renderBerita()}
        </div>
     );
}
 
export default ContainerBerita;
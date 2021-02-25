import React ,{useState,useEffect} from 'react';
// import Prestasi from '../Home/Prestasi';
// import SkeletonPrestasi from './SkeletonPrestasi';
import InfinitePrestasi from './InfinitePrestasi';

const ContainerPrestasi = () => {
    const [posActive, setPosActive] = useState('');
    // const [dataSearch, setDataSearch] = useState('');
    // const [dataPost, setDataPost]= useState('');
    // const [hasilSearch, setHasilSearch] = useState();

    const changePosActive = (posActive2) => {
        console.log(posActive2);
        if(posActive2 == posActive){
            setPosActive('');
        }
        else{
            setPosActive(posActive2);
        }
    }

    // const handleSubmitSearch = (event) => {
    //     renderHasilSearch().then(function(done) {
    //        setHasilSearch(done);
    //     });
    //     setDataPost(dataSearch);
    //     setHasilSearch(<SkeletonPrestasi/>);
    //     event.preventDefault();
    // }

    // const handleChangeSearch = (event) => {
    //     setDataSearch(event.target.value);
    // }

    // const renderHasilSearch = async () => { 
    //     var jsonSearch = [1,2,3,4,5,6];
    //     await new Promise((resolve)=>{
    //         setTimeout(()=>{
    //             jsonSearch = 
    //                     jsonSearch.map((i, index) => (
    //                         <Prestasi pos={index+1} posActive={posActive} changePosActive={changePosActive} key={index}/>
    //                     ));
    //             resolve(0);
    //         },1000)
    //     });

    //     return jsonSearch;
    // }

    const renderPrestasi = () =>{
        return(
            <InfinitePrestasi posActive={posActive} changePosActive={changePosActive}/>
        )
    }

    return (  
        <div className="lg:container mx-auto">
            <div className="text-4xl mt-5 text-center text-smam1 text-white font-bold mb-8 md:mb-8">
                PRESTASI
            </div>
            {/* <form onSubmit={handleSubmitSearch} className="w-10/12 md:w-7/12 flex mx-auto mt-2 mb-7 h-10 md:h-14 relative">
                <input type="text" placeholder="CARI BERITA" onChange={handleChangeSearch} className="flex-1 bg-white p-3 rounded shadow border-2 border-solid border-gray-300" />
                <div onClick={handleSubmitSearch} className="cursor-pointer absolute-y-center flex justify-center items-center h-8 md:h-12 w-12 bg-smam1 right-1 rounded">
                    <img src="../image/search.svg" className="cursor-pointer h-6 md:h-8" alt=""/>
                </div>
            </form> */}
            <div className="w-11/12 py-3 lg:w-6/12 mx-auto mb-5 rounded-md bg-white shadow-md flex flex-col">
                {renderPrestasi()}
            </div>
        </div>
    );
}
 
export default ContainerPrestasi;
import React ,{useState,useEffect} from 'react';
import InfinitePrestasi from './InfinitePrestasi';

const ContainerPrestasi = () => {
    const [posActive, setPosActive] = useState('');


    const changePosActive = (posActive2) => {
        console.log(posActive2);
        if(posActive2 == posActive){
            setPosActive('');
        }
        else{
            setPosActive(posActive2);
        }
    }


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
            <div className="w-11/12 py-3 lg:w-6/12 mx-auto mb-5 rounded-md bg-white shadow-md flex flex-col">
                {renderPrestasi()}
            </div>
        </div>
    );
}
 
export default ContainerPrestasi;
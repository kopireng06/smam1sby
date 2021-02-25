import React ,{useState,useEffect} from 'react';
import Prestasi from './Prestasi';
import {Link} from 'react-router-dom';

const ContainerPrestasi = () => {

    const [posActive, setPosActive] = useState('');

    const changePosActive = (posActive2) => {
        if(posActive2 == posActive){
            setPosActive('');
        }
        else{
            setPosActive(posActive2);
        }
    }

    useEffect(() => {
        console.log(posActive);
    });

    return (  
        <div className="relative md:absolute right-0 h-auto pb-5 md:h-full w-full md:w-6/12 lg:w-5/12 bg-yellow-400">
            <div className="text-4xl px-5 mt-5 text-smam1 text-white font-bold mb-8 md:mb-8">
                PRESTASI
            </div>
            <div className="mx-auto xl:ml-8 mb-12 md:mb-0 max-w-md-2 pb-2 rounded-md bg-white shadow-md flex flex-col">
                <Prestasi pos={1} posActive={posActive} changePosActive={changePosActive}/>
                <Prestasi pos={2} posActive={posActive} changePosActive={changePosActive}/>
                <Prestasi pos={3} posActive={posActive} changePosActive={changePosActive}/>
                <Prestasi pos={4} posActive={posActive} changePosActive={changePosActive}/>
            </div>
            <div className="max-w-md-2 w-full md:ml-8 absolute bottom-0 flex justify-end h-10">
                <Link to="/kumpulan-prestasi" className="mr-5 md:mr-0  text-smam1 text-md">prestasi lainnya</Link>
            </div>
        </div>
    );
}
 
export default ContainerPrestasi;
import React ,{useState,useEffect} from 'react';
import Prestasi from './Prestasi';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ContainerPrestasi = () => {

    const [posActive, setPosActive] = useState('');
    const [dataPrestasi, setDataPrestasi] = useState([]);
    const source = axios.CancelToken.source();

    const changePosActive = (posActive2) => {
        if(posActive2 == posActive){
            setPosActive('');
        }
        else{
            setPosActive(posActive2);
        }
    }

    const callDataPrestasi = async () =>{
        var data;
        await axios.get(window.origin+'/api/prestasi'  , { cancelToken: source.token })
            .then((res)=>{
                data = res.data;
            });
        return data;
    }

    useEffect(() => {
        var isSubscribed = true;

        callDataPrestasi().then((res)=>{
            if(isSubscribed){
                setDataPrestasi(res);
            }
        });

        return ()=>{
            isSubscribed = false;
            source.cancel("cancel");
        }

    },[]);

    return (  
        <div className="relative md:absolute right-0 h-auto pb-5 md:h-full w-full md:w-6/12 lg:w-5/12 bg-yellow-400">
            <div className="text-4xl px-5 mt-5 text-smam1 text-white font-bold mb-8 md:mb-16">
                PRESTASI
            </div>
            <div className="mx-auto xl:ml-8 mb-12 md:mb-0 w-11/12 md:max-w-md-2 pb-2 rounded-md bg-white shadow-md flex flex-col">
                {
                    (()=>{
                        return(
                            dataPrestasi.map((data,i)=>
                                <Prestasi key={i} pos={i+1} 
                                posActive={posActive} changePosActive={changePosActive}
                                nama={data.nama_prestasi} juara={data.juara_prestasi} tingkat={data.tingkat_prestasi}
                                />
                            )
                        )
                    })()
                }

            </div>
            <div className="max-w-md-2 w-full md:ml-8 absolute bottom-0 flex justify-end h-10">
                <Link to="/kumpulan-prestasi" className="mr-5 md:mr-0  text-smam1 text-md">prestasi lainnya</Link>
            </div>
        </div>
    );
}
 
export default ContainerPrestasi;
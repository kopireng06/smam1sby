import React,{useEffect,useState} from 'react';
import Pengumuman from './Pengumuman';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ContainerPengumuman = () => {

    const [dataPengumuman,setDataPengumuman] = useState([]);


    const callDataPengumuman = async () =>{
        var data;
        await axios.get(window.origin+'/api/pengumuman/home')
            .then((res)=>{
                data = res.data;
            });
        return data;
    }

    useEffect(() => {
        callDataPengumuman().then((res)=>{
            setDataPengumuman(res);
        })
    }, []);


    return (  
        <div className="w-full lg:w-4/12 px-4 lg:px-0">
            <div className="text-4xl px-5 my-5 mb-12 text-smam1 font-bold">
                PENGUMUMAN
            </div>
            <div className="w-full bg-smam1 shadow rounded p-2 flex flex-col">
                {
                    (()=>{
                        return(
                            dataPengumuman.map((data,i)=>
                                <Pengumuman key={i} judul={data.judul_pengumuman} tanggal={data.created_at}/>
                            )
                        )
                    })()
                }
            </div>
            <div className="w-full flex justify-end mt-5 lg:mt-8">
                <Link to="/pengumuman" className="text-smam1 text-md mr-5 lg:mr-0">pengumuman lainnya</Link>
            </div>
        </div>
    );
}
 
export default ContainerPengumuman;
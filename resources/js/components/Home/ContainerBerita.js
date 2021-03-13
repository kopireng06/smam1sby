import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Berita from './Berita';
import axios from 'axios';

const ContainerBerita = () => {

    const [dataBerita,setDataBerita] = useState([]);
    const source = axios.CancelToken.source();

    const callDataBerita = async () =>{
        var data;
        await axios.get(window.origin+'/api/berita/home' , { cancelToken: source.token })
        .then((res)=>{
            data = res.data;
        });
        return data;
    }

    useEffect(()=>{
        var isSubscribed = true;

        callDataBerita().then((res)=>{
            if(isSubscribed){
                setDataBerita(res);
            }
        });

        return ()=>{
            isSubscribed = false;
            source.cancel("cancel");
        }

    },[])

    return (
        <div className="w-full lg:w-8/12">
            <div className="text-4xl px-5 my-5 mb-8 text-smam1 font-bold">
                BERITA
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    (()=>{                     
                        return(
                            dataBerita.map((data ,i)=>
                                <Berita key={i} judul={data.judul_artikel} foto={data.foto_artikel} tanggal={data.created_at}/>
                            )
                        )
                    })()
                }
            </div>
            <div className="w-full flex justify-end mt-3">
                <Link to="/berita" className="text-smam1 text-md mr-5 lg:mr-0">berita lainnya</Link>
            </div>
        </div>
      );
}
 
export default ContainerBerita;
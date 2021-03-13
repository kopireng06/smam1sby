import React,{useState,useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';

const Keunggulan = () => {

    const [dataKeunggulan,setDataKeunggulan] = useState([]);
    const source = axios.CancelToken.source();

    const callDataKeunggulan = async () =>{
        var data;
        await axios.get(window.origin+'/api/program-unggulan' , { cancelToken: source.token })
        .then((res)=>{
            data = res.data;
        });
        return data;
    }

    useEffect(()=>{
        var isSubscribed = true;

        callDataKeunggulan().then((res)=>{

            if(isSubscribed){
                setDataKeunggulan(res);   
            }
        });

        return ()=>{
            isSubscribed = false;
            source.cancel("cancel");
        }

    },[])

    return ( 
        <div className="w-full bg-gray-100 xl:relative xl:mb-24 xl:h-72 pb-10 xl:pb-0">
            <div className="lg:container mx-auto">
                <div className="text-4xl px-5 py-5 text-center text-smam1 text-white font-bold">
                    SMAM 1 MUHAMMADIYAH SURABAYA
                </div>
                <div className="text-center mb-8 text-xl italic text-smam1">"Excellent With Morality"</div>
                <div className="lg:container  xl:absolute xl:absolute-x-center px-5 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center place-items-center gap-4">
                    {
                        (()=>{
                            return(
                                dataKeunggulan.map((data,i)=>{
                                    return(
                                        <div key={i} className="h-56 w-11/12 bg-smam1 rounded shadow">
                                            <div className="text-smam1 text-xl text-center font-bold py-3 bg-white rounded-t">{ReactHtmlParser(data.judul_konten)}</div>
                                            <div className="text-center text-white text-sm px-5 pt-3">{ReactHtmlParser(data.isi_konten)}</div>
                                        </div>
                                    )
                                })
                            )
                        })()
                    }
                </div>
            </div> 
        </div>
    );
}
 
export default Keunggulan;
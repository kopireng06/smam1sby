import axios from 'axios';
import React,{useEffect,useState} from 'react';
import ReactHtmlParser from 'react-html-parser';

const Footer = () => {

    const [dataFooter,setDataFooter] = useState(0);

    useEffect(() => {
        var isSubscribed = true;
        callDataFooter().then((res)=>{
            if(isSubscribed){
                setDataFooter(res);
            }

        })
        return ()=>{
            isSubscribed=false;
        }
    }, []);

    const callDataFooter = async ()=>{
        var data;
        await axios.get(window.origin+'/api/footer')
            .then((res)=>{
                data = res.data;
            });
        return data;
    }

    return (  
        <>
            <div className="w-full bg-gray-900">
                {
                    (()=>{
                        if(dataFooter==0){
                            return('')
                        }
                        else{
                            return(
                                <>
                                    <div className="lg:container mx-auto grid grid-cols-12 p-5">
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="text-xl font-bold text-white">SMA 1 MUHAMMADIYAH SURABAYA</div>
                                            <div className="text-white text-xs pr-28 py-3">{ReactHtmlParser(dataFooter.profil_footer[0].isi_konten)}</div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 lg:col-span-5">
                                            <div className="text-lg font-bold text-white my-2">KONTAK</div>
                                            <div className="h-0.5 w-10 bg-yellow-400 mb-3"></div>
                                            <div className="w-full flex items-center">
                                                <img src="../image/pin.svg" className="h-5 w-5 my-1" alt=""/>
                                                <span className="text-xs text-white mt-1 mx-3">{ReactHtmlParser(dataFooter.lokasi[0].isi_konten)}</span>
                                            </div>
                                            <div className="w-full flex items-center">
                                                <img src="../image/email.svg" className="h-5 w-5 my-1" alt=""/>
                                                <span className="text-xs text-white mx-3">{ReactHtmlParser(dataFooter.email[0].isi_konten)}</span>
                                            </div>
                                            <div className="w-full flex items-center">
                                                <img src="../image/wa.svg" className="h-5 w-5 my-1" alt=""/>
                                                <span className="text-xs text-white mx-3">{ReactHtmlParser(dataFooter.whatsapp[0].isi_konten)}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-12 lg:col-span-3">
                                            <div className="text-lg font-bold text-white my-2">YOUTUBE</div>
                                            <div className="h-0.5 w-10 bg-yellow-400 mb-3"></div>
                                            <div className="container-yt">
                                                <iframe src={dataFooter.youtube} frameBorder="0" allowFullScreen className="video"></iframe>
                                            </div>
                                        </div>
                                    </div> 
                                </>
                            )
                        }
                    })()
                }
            </div>
            <div className="w-full bg-yellow-400">
                <div className="lg:container mx-auto h-8 text-center pt-2 text-xs font-bold">Copyright © SMAMSA . All Right Reserved.</div>
            </div>
            
        </>
    );
}
 
export default Footer;
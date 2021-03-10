import React ,{useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';

const Bacaan = (props) => {

    useEffect(() => {
        console.log(props.data[0].created_at);
    }, []);

    return (
        (()=>{
            if(props.data[0].foto_artikel){
                return (
                    <>
                        <div className="w-11/12 md:w-7/12 mx-auto my-2">
                            <div className="w-full pt-60p bg-center bg-cover bg-no-repeat" 
                            style={{backgroundImage:'url('+window.origin+'/images/artikel/'+props.data[0].foto_artikel+')'}}></div>
                            <div className="text-smam1 text-xl md:text-2xl text-center font-bold mt-5 mb-2">{props.data[0].judul_artikel}</div>
                            <div className="text-smam1 text-sm mb-5 font-semibold">{props.data[0].created_at}</div>
                        </div>
                        <div className="w-11/12 md:w-7/12 mx-auto mb-5">
                            {ReactHtmlParser(props.data[0].isi_artikel)}
                        </div>
                    </>
                )
            }
            if(props.data[0].judul_pengumuman){
                return(
                    <>
                        <div className="w-11/12 md:w-7/12 mx-auto my-2">
                            <div className="text-smam1 text-xl md:text-2xl text-center font-bold my-5">{props.data[0].judul_pengumuman}</div>
                            <div className="text-smam1 text-sm mb-5 font-semibold">{props.data[0].created_at}</div>
                        </div>
                        <div className="w-11/12 md:w-7/12 mx-auto mb-5">
                            {ReactHtmlParser(props.data[0].isi_pengumuman)}
                        </div>
                    </>
                )
            }
            else{
               return(
                   <>
                        <div className="w-11/12 md:w-7/12 mx-auto my-2">
                            <div className="text-smam1 text-xl md:text-2xl text-center font-bold my-5">{props.data[0].judul_konten}</div>
                        </div>
                        <div className="w-11/12 md:w-8/12 mx-auto mb-5">
                            {ReactHtmlParser(props.data[0].isi_konten)}
                        </div>
                   </>
               )
            }
        })()
    );
}
 
export default Bacaan;
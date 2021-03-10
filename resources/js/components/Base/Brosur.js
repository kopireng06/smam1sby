import React,{useEffect, useState} from 'react';

const Brosur = () => {

    const[displayBrosur,setDisplayBrosur] = useState(' flex');
    const [dataGambar,setDataGambar] = useState('');
    const [linkGambar,setLinkGambar] = useState('');

    const changeDisplayBrosur = () =>{
        setDisplayBrosur(' hidden');
    }

    const callDataBrosur = async () => {
        var data;
        await axios.get(window.origin+'/api/brosur')
          .then((res)=>{
            data = res.data;
            console.log(data);
          })
        return data;
      }
      useEffect(()=>{
        callDataBrosur().then((res)=>{
            setDataGambar(res.foto);
            setLinkGambar(res.judul);
        })
      },[])

    return (
        <div className={"fixed z-30 top-0 bottom-0 w-full p-10 flex-col justify-center items-center"+displayBrosur} style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
            <div className="bg-red-600 h-10 w-10 mb-0 flex justify-center items-center pb-2 cursor-pointer" onClick={changeDisplayBrosur}>
                <div className="text-2xl text-white leading-none">x</div>
            </div>
            <a href={linkGambar} className="w-full mx-auto h-3/6 md:h-4/6 bg-center bg-contain bg-no-repeat relative" style={{backgroundImage:"url("+window.origin+"/"+dataGambar+")"}}></a>
        </div>
    )

}
 
export default Brosur;
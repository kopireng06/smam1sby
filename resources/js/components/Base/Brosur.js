import React,{useState} from 'react';

const Brosur = () => {

    const[displayBrosur,setDisplayBrosur] = useState(' flex');

    const changeDisplayBrosur = () =>{
        setDisplayBrosur(' hidden');
    }

    return (
        <div className={"fixed z-30 top-0 bottom-0 w-full p-10 flex-col justify-center items-center"+displayBrosur} style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
            <div className="bg-red-600 h-10 w-10 mb-0 flex justify-center items-center pb-2 cursor-pointer" onClick={changeDisplayBrosur}>
                <div className="text-2xl text-white leading-none">x</div>
            </div>
            <div className="w-full mx-auto h-3/6 md:h-4/6 bg-center bg-contain bg-no-repeat relative" style={{backgroundImage:"url("+window.origin+"/images/brosur.jpeg)"}}></div>
        </div>
    )

}
 
export default Brosur;
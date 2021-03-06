import React, {useEffect,useState } from 'react';

const Prestasi = (props) => {

    const [classHeight, setClassHeight] = useState(' h-0');
    const [iconDropDown, setIconDropDown] = useState('+');
    const {juara,nama,tingkat} = props;

    useEffect(() => {
        if(props.pos==props.posActive){
            setClassHeight(' h-20');
            setIconDropDown('-');
        }
        else{
            setClassHeight(' h-0');
            setIconDropDown('+');
        }
    });

    return (  
        <>
            <div className="m-2 mb-0 flex justify-between items-center px-3 h-14 bg-yellow-400">
                <div className="font-bold text-smam1 text-sm uppercase">{nama}</div>
                <div className="text-smam1 cursor-pointer" onClick={()=>props.changePosActive(props.pos)}>{iconDropDown}</div>
            </div>
            <div className={"mx-2 mt-0 px-3 flex flex-col justify-center bg-smam1 text-sm overflow-hidden transition-all duration-1000"+classHeight}>
                {/* <div className="h-20 w-16 my-1 border-2 border-white bg-cover bg-no-repeat bg-center" style={{backgroundImage:'url(image/menang.jpg)'}}></div> */}
                <span className="text-white">Juara : {juara}</span>
                <span className="text-white">Tingkat : {tingkat}</span>
            </div> 
        </> 
    );
}
 
export default Prestasi;

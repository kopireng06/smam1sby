import React,{useEffect, useState} from 'react';
import Prestasi from '../Home/Prestasi';

const ResultSearchPrestasi = (props) => {
    
    const [keong,setKeong] = useState(            props.hasilSearch.map((index) => (
        <Prestasi pos={index+1} posActive={props.posActive} changePosActive={props.changePosActive} key={index}/>
    )))

    return(
        keong
    )
}
 
export default ResultSearchPrestasi;
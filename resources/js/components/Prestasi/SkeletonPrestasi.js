import React,{useState} from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonPrestasi = () => {

    const [length,setLength] = useState([1,2,3,4,5,6,7]);

    return (  
        <>
        {
            (()=>{
                return(
                    length.map((i)=>
                    <div key={i} className="m-2 mb-0 shadow rounded flex justify-between items-center px-3 h-14 bg-white">
                        <div className="w-7/12">
                            <Skeleton width={'100%'}/>
                        </div>
                        <Skeleton circle={true} width={30} height={30}/>
                    </div>
                )
            )

            })()
        }
        </>
    );
}
 
export default SkeletonPrestasi;
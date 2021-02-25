import React,{useState} from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonPengumuman = () => {
    
    const [length,setLength] = useState([1,2,3]);

    return (
        <>
            {
                (()=>{
                    return(
                        length.map((i)=>
                            <div key={i} className="cursor-pointer transition-all duration-200 bg-white shadow rounded flex flex-col justify-between p-3 h-28 my-1"> 
                                <div className="text-smam1 text-md md:text-lg font-medium">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="self-end w-20">
                                    <Skeleton/>
                                </div>
                            </div>
                        )
                    )
                })()
            }
        </>
    );
}
 
export default SkeletonPengumuman;
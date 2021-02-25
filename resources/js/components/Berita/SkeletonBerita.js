import React ,{useState} from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonBerita = (props) => {
    
    const [skeletonLength,setSkeletonLength] = useState(Array(props.length).fill(null).map((u, i) => i));

    return (
        skeletonLength.map((index) => (
            <div key={index} className="card-news relative w-10/12 h-96 mx-auto my-3 shadow bg-white">
                <div className="w-11/12 pt-2 h-72 mx-auto">
                    <Skeleton height={'100%'}/>
                </div>
                <div className="w-11/12 pt-2 mx-auto">
                    <Skeleton count={3}/>
                </div>
            </div>
        ))    
    );
}
 
export default SkeletonBerita;

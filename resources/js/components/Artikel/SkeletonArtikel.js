import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonArtikel = () => {
    return (  
        <>
            <div className="w-10/12 mx-auto h-96 rounded mt-10">
                <Skeleton width={'100%'} height={'100%'}/>
            </div>
            <div className="w-10/12 mx-auto h-auto my-2 mb-10">
                <Skeleton count={5}/>
            </div>
        </>
    );
}
 
export default SkeletonArtikel;
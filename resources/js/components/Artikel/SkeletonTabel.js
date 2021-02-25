import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonTabel = () => {
    return (
        <div className="w-10/12 mx-auto p-2 mb-10 h-80 rounded shadow">
            <div className="w-full h-10 mb-2">
                <Skeleton width={'100%'} height={'100%'}/>
            </div>
            <div className="w-full h-64 mt-2">
                <Skeleton width={'100%'} height={'100%'}/>
            </div>
        </div>
    );
}
 
export default SkeletonTabel;
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonPengumuman = () => {
    return (
        <SkeletonTheme color="#FFFFFF" highlightColor="#D8D8D8">
            <div className="cursor-pointer transition-all duration-200 bg-gray-100 shadow rounded flex flex-col justify-between p-3 h-28 my-1"> 
                <div className="text-smam1 text-md md:text-lg font-medium">
                    <Skeleton count={2}/>
                </div>
                <div className="self-end w-20">
                    <Skeleton/>
                </div>
            </div>
        </SkeletonTheme>
    );
}
 
export default SkeletonPengumuman;
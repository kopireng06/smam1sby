import React from 'react';
import {Link} from 'react-router-dom';
import CardNews from './CardNews';

const ContainerNews = () => {
    return (
        <div className="w-full lg:w-8/12">
            <div className="text-4xl px-5 my-5 mb-8 text-smam1 font-bold">
                BERITA
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardNews/>
                <CardNews/>
            </div>
            <div className="w-full flex justify-end mt-3">
                <Link to="#" className="text-smam1 text-md mr-5 lg:mr-0">berita lainnya</Link>
            </div>
        </div>
      );
}
 
export default ContainerNews;
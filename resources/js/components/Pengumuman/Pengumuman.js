import React from 'react';
import {Link} from 'react-router-dom';

const Pengumuman = () => {
    return (
        <Link to="#" className="cursor-pointer bg-white transition-all duration-200 hover:bg-gray-50 shadow rounded flex flex-col justify-between p-3 h-28 my-1"> 
            <div className="text-smam1 text-md md:text-lg font-medium">
                Surat edaran kelulusan angkatan 2020/2021
            </div>
            <div className="text-xs md:text-md text-smam1 text-right">
                12 Desember 2020
            </div>
        </Link>
      );
}
 
export default Pengumuman;
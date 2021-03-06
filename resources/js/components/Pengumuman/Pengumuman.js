import React from 'react';
import {Link} from 'react-router-dom';

const Pengumuman = (props) => {

    const {judul,tanggal} = props;
    const date = tanggal.split(" ")[0];

    return (
        <Link to={"/pengumuman/"+judul} className="cursor-pointer bg-white transition-all duration-200 hover:bg-gray-50 shadow rounded flex flex-col justify-between p-3 h-28 my-1"> 
            <div className="text-smam1 text-md md:text-lg font-medium">
                {judul}
            </div>
            <div className="text-xs md:text-md text-smam1 text-right">
                {date}
            </div>
        </Link>
      );
}
 
export default Pengumuman;
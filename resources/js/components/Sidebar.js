import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const Sidebar = (props) => {

    const [toggleLeft, setToggleLeft] = useState(props.sidebarStat);

    useEffect(() => {
        setToggleLeft(props.sidebarStat);
    });

        return (
            <div className="w-60 transition-all duration-1000 p-7 flex flex-col fixed z-20 bottom-0 h-screen bg-smam1 shadow-md" style={{left:toggleLeft}}>
                <Link to="#" className="font-bold text-white my-1">
                    TENTANG
                </Link>
                <Link to="#" className="font-bold text-white my-1">
                    BERITA
                </Link>
                <Link to="#" className="font-bold text-white my-1">
                    PRESTASI
                </Link>
            </div>
        );
}
 
export default Sidebar;
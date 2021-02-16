import React ,{useState} from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const HomePage = loadable(() => import('../Home/HomePage'));
const PengumumanPage = loadable(() => import('../Pengumuman/PengumumanPage'));

const Root = () => {
    const [sidebarStat, setSidebarStat] = useState(0);
    
    const changeSidebarStat = () => {
        if(sidebarStat==0){
            setSidebarStat(1);
        }
        else{
            setSidebarStat(0);
        }
    }

    const deliverPropsToSidebar = () => {
        if(sidebarStat==0){
            return '-15rem';
        }
        else{
            return '0';
        }
    }

    return(
        <Router>
            <Navbar changeSidebarStat={changeSidebarStat}/>
            <Sidebar sidebarStat={deliverPropsToSidebar()}/>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/pengumuman" component={PengumumanPage} />
        </Router> 
    );
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}

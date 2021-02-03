import React ,{useState} from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Home = loadable(() => import('./Home'));
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
            <Route path="/" component={Home} />
        </Router> 
    );
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}

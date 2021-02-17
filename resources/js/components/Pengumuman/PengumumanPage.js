import React , { Component }from 'react';
import Footer from '../Base/Footer';
import BackgroundNavbar from '../Base/BackgroundNavbar';
import ContainerPengumuman from './ContainerPengumuman';

class PengumumanPage extends Component {
    render() {
        return (
            <>  
                <BackgroundNavbar/>
                <ContainerPengumuman/>
                <Footer/>
            </>
        )
    }
}

export default PengumumanPage;

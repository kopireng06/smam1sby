import React, { Component } from 'react'
import ContainerBerita from './ContainerBerita';
import BackgroundNavbar from '../Base/BackgroundNavbar';
import Footer from '../Base/Footer';

class BeritaPage extends Component {

    render() {
        return (
            <>
                <BackgroundNavbar/>
                <ContainerBerita/>
                <Footer/>
            </>
        )
    }
}

export default BeritaPage;

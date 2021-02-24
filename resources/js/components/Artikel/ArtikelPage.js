import React, { Component } from 'react';
import BackgroundNavbar from '../Base/BackgroundNavbar';
import Footer from '../Base/Footer';
import ContainerArtikel from './ContainerArtikel';

export class ArtikelPage extends Component {
    
    render() {
        return (
            <>
                <BackgroundNavbar/>
                <ContainerArtikel/>
                <Footer/>
            </>
        )
    }
}

export default ArtikelPage;

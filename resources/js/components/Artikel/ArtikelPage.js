import React, { Component } from 'react';
import BackgroundNavbar from '../Base/BackgroundNavbar';

import ContainerArtikel from './ContainerArtikel';

export class ArtikelPage extends Component {
    
    render() {
        return (
            <>
                <BackgroundNavbar/>
                <ContainerArtikel/>
            </>
        )
    }
}

export default ArtikelPage;

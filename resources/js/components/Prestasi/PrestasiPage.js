import React, { Component } from 'react'
import Footer from '../Base/Footer';
import BackgroundNavbar from '../Base/BackgroundNavbar';
import ContainerPrestasi from './ContainerPrestasi';

export class PrestasiPage extends Component {
    render() {
        return (
            <>
                <BackgroundNavbar/>
                <ContainerPrestasi/>
                <Footer/>
            </>
        )
    }
}

export default PrestasiPage

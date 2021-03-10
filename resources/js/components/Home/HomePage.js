import React, { Component,Fragment } from 'react'
import Carousel from './Carousel';
import ContainerKabar from './ContainerKabar';
import ContainerKaPres from './ContainerKaPres';
import Keunggulan from './Keunggulan';
import Footer from '../Base/Footer';

class HomePage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {stat:0}
    }

    render() {
        return (
            <Fragment>
                <Carousel/>
                <Keunggulan/>
                <ContainerKabar/>
                <ContainerKaPres/>
                <Footer/>
            </Fragment>
        )
    }
}

export default HomePage;

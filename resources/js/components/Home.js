import React, { Component,Fragment } from 'react'
import Carousel from './Carousel';
import ContainerCardNews from './ContainerCardNews';
import ContainerKaPres from './ContainerKaPres';


export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {stat:0}
    }

    render() {
        
        return (
            <Fragment>
                <Carousel/>
                <ContainerCardNews/>
                <ContainerKaPres/>
            </Fragment>
        )
    }
}

export default Home;

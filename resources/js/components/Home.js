import React, { Component,Fragment } from 'react'
import Carousel from './Carousel';
import ContainerCard from './ContainerCard';

export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {stat:0}
    }

    

    render() {
        return (
            <Fragment>
                <Carousel/>
                <ContainerCard/>
            </Fragment>
        )
    }
}

export default Home;

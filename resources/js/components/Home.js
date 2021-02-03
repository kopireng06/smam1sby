import React, { Component,Fragment } from 'react'
import Carousel from './Carousel';

export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {stat:0}
    }

    

    render() {
        return (
            <Fragment>
                <Carousel/>
                <div>HALO</div>
                <div>HALO</div>
                <div>HALO</div>
                <div>HALO</div>
                <div>HALO</div>
            </Fragment>
        )
    }
}

export default Home;

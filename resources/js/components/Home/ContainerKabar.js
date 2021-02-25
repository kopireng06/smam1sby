import React, { useState, useEffect } from 'react';
import ContainerBerita from './ContainerBerita';
import ContainerPengumuman from './ContainerPengumuman';

const ContainerKabar = () => {
    
    return (
        <div className="lg:container flex flex-col lg:flex-row mx-auto">
            <ContainerPengumuman/>
            <ContainerBerita/>
        </div>
    );
}
 
export default ContainerKabar;


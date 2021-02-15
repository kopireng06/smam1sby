import React, { useState, useEffect } from 'react';
import ContainerNews from './ContainerNews';
import ContainerPengumuman from './ContainerPengumuman';

const ContainerKabar = () => {
    
    return (
        <div className="lg:container flex flex-col lg:flex-row mx-auto">
            <ContainerPengumuman/>
            <ContainerNews/>
        </div>
    );
}
 
export default ContainerKabar;


import React  from 'react';
import SliderKataAlumni from './SliderKataAlumni';
import ContainerPrestasi from './ContainerPrestasi';

const ContainerKaPres = () => {

    return (  
        <div className="relative w-full my-8 bg-smam1">
            <div className="lg:container flex flex-col md:flex-row mx-auto">
                <SliderKataAlumni/>
                <ContainerPrestasi/>
            </div>
        </div>
    );
}
 
export default ContainerKaPres;
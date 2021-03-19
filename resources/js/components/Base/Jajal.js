import React,{useEffect,useState,Suspense} from 'react';

const Navbar = React.lazy(()=>import('./Navbar'));

// const useWindowsWidth = () => {
//     const [isScreenSmall, setIsScreenSmall] = useState(false);
  
//     let checkScreenSize = () => {
//       setIsScreenSmall(window.innerWidth < 600);
//     };
//     useEffect(() => {
//       checkScreenSize();
//       window.addEventListener("resize", checkScreenSize);
//       //console.log(isScreenSmall);
  
//       return () => window.removeEventListener("resize", checkScreenSize);
//     });
  
//     return isScreenSmall;
//   };


const Jajal = () => {
    
    useEffect(() => {
       
    });

    return ( 
      <>
          <div onClick={()=>{}}>HALO</div>
          <Suspense fallback={<div>sek entenono</div>}>
            <Navbar/>
          </Suspense>
      </>
     )
}
 
export default Jajal;
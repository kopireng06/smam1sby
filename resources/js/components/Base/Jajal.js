import React,{useEffect,useState} from 'react';

const useWindowsWidth = () => {
    const [isScreenSmall, setIsScreenSmall] = useState(false);
  
    let checkScreenSize = () => {
      setIsScreenSmall(window.innerWidth < 600);
    };
    useEffect(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      //console.log(isScreenSmall);
  
      return () => window.removeEventListener("resize", checkScreenSize);
    });
  
    return isScreenSmall;
  };


const Jajal = () => {
    
    const onSmallScreen = useWindowsWidth();
    const keong = useState(0);
     
    useEffect(() => {
       console.log(onSmallScreen);
       return ()=>{
           console.log(onSmallScreen);
       }
    });

    return ( 
        <div onClick={()=>{}}>HALO</div>
     )
}
 
export default Jajal;
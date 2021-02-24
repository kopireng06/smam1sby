import React,{useState,useEffect} from 'react';


const SidebarArtikel = (props) => {
    const [option,setOption] = useState();

    useEffect(() => {
        setOption(()=>{
            var option = [];
            props.dataOption.forEach((i)=>{
                if(i==props.pembeda){
                    option.push(<div key={i} className="text-smam1 text-md my-2 font-medium text-center cursor-pointer bg-yellow-400" data-value={i} onClick={props.handleClick}>{i}</div>)
                }
                else{
                    option.push(<div key={i} className="text-smam1 text-md my-2 font-medium text-center cursor-pointer" data-value={i} onClick={props.handleClick}>{i}</div>)
                }
            })
            return option;
        })
    }, [props]);


    return(
        <div className="min-h-screen hidden md:block w-2/12 bg-white shadow-md">
            <div className="text-xl mt-5 text-center text-smam1 font-bold mb-8 md:mb-8">
                {
                    (()=>{
                        if(props.centerPath == 'kumpulan-alumni'){
                            return 'TAHUN LULUS'
                        }
                        if(props.centerPath == 'kumpulan-fasilitas'){
                            return 'FASILITAS'
                        }
                        if(props.centerPath == 'kumpulan-profil'){
                            return 'PROFIL'
                        }
                        if(props.centerPath == 'kumpulan-ekstrakurikuler'){
                            return 'EKSTRA'
                        }
                    })()
                }
            </div>
            {option}
        </div>
    )
}
 
export default SidebarArtikel;

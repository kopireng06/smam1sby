import React from 'react';

const JudulArtikel = (props) => {
    return (  
        <div className="text-4xl text-center mt-5 text-smam1 font-bold mb-8 md:mb-5">
            {
                (()=>{
                    if(props.centerPath == 'kumpulan-alumni'){
                        return 'ALUMNI'
                    }
                    if(props.centerPath == 'kumpulan-fasilitas'){
                        return 'FASILITAS'
                    }
                    if(props.centerPath == 'kumpulan-profil'){
                        return 'PROFIL'
                    }
                    if(props.centerPath == 'kumpulan-ekstrakurikuler'){
                        return 'EKSTRAKURIKULER'
                    }
                })()
            }
        </div>
    );
}
 
export default JudulArtikel;
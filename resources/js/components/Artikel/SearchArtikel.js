import React,{useEffect} from 'react';

const SearchArtikel = (props) => {

    useEffect(() => {
        console.log(props.dataOption);
    }, [props]);

    return ( 
        <select className="w-8/12 block md:hidden mx-auto mb-4 py-3 pl-1 rounded shadow border-smam1" value={props.pembeda} onChange={props.handleOptionChange}> 
            {
                (()=>{
                    return(
                        props.dataOption.map((data,i)=>
                            <option key={i} value={data}>{data}</option>
                        )
                    )
                })()
            }
        </select>
     );
}
 
export default SearchArtikel;
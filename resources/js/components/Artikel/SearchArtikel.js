import React from 'react';

const SearchArtikel = (props) => {

    return ( 
        <select className="w-8/12 block md:hidden mx-auto mb-4 py-3 pl-1 rounded shadow border-smam1" value={props.pembeda} onChange={props.handleOptionChange}> 
            {
                (()=>{
                    var option = [];
                    props.dataOption.forEach((i)=>{
                        option.push(<option key={i} value={i}>{i}</option>);
                    })
                    return option;
                })()
            }
        </select>
     );
}
 
export default SearchArtikel;
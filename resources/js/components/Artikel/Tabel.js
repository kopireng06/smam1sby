import React ,{useEffect} from 'react';



const Tabel = (props) => {

    useEffect(() => {
        console.log(props.data);
    },[]);

    return ( 
        <table className="w-10/12 mx-auto mb-10">
            <thead>
                <tr className="bg-smam1 text-white">
                    <th>Nama Lengkap</th>
                    <th>Universitas</th>
                    <th>Jurusan</th>
                </tr>
            </thead>
            <tbody>
                {
                    (()=>
                        props.data.map((data,i)=>
                            <tr key={i}>
                                <td>{data.nama_alumni}</td>
                                <td>{data.univ_alumni}</td>
                                <td>{data.jurusan_alumni}</td>
                            </tr>
                        )
                    )()
                }
            </tbody>
        </table>
    );
}
 
export default Tabel;
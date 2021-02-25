import React from 'react';

const Tabel = () => {
    return ( 
        <table className="w-10/12 mx-auto mb-10">
            <thead>
                <tr className="bg-smam1 text-white">
                    <th>Nama Lengkap</th>
                    <th>Jurusan</th>
                    <th>Universitas</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
                <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                </tr>
                <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                </tr>
                <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                </tr>
                <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                </tr>
            </tbody>
        </table>
    );
}
 
export default Tabel;
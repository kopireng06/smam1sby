<?php

namespace App\Imports;

use App\Models\Alumni;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class AlumniImport implements ToModel,WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Alumni([
            "nama_alumni" => $row["nama"],
            "univ_alumni" => $row["universitas"],
            "jurusan_alumni" => $row["jurusan"],
            "angkatan" => $row["angkatan"],
        ]);
    }
}

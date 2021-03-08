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
            "nama_alumni" => $row["nama_alumni"],
            "univ_alumni" => $row["univ_alumni"],
            "jurusan_alumni" => $row["jurusan_alumni"],
            "angkatan" => $row["angkatan"],
        ]);
    }
}

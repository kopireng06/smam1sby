<?php

namespace App\Imports;

use App\Models\Prestasi;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PrestasiImport implements ToModel,WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Prestasi([
            "nama_prestasi" => $row["nama_prestasi"],
            "juara_prestasi" => $row["juara_prestasi"],
            "tingkat_prestasi" => $row["tingkat_prestasi"],
        ]);
    }
}

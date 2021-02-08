<?php

namespace App\Imports;

use App\Models\Testi;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TestiImport implements ToModel,WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Testi([
            "nama_testi" => $row["nama_testi"],
            "isi_testi" => $row["isi_testi"],
            "pekerjaan_testi" => $row["pekerjaan_testi"],
            "jurusan_testi" => $row["jurusan_testi"],
            "fakultas_testi" => $row["fakultas_testi"],
            "universitas_testi" => $row["universitas_testi"],
        ]);
    }
}

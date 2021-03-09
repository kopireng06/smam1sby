<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konten extends Model
{
    use HasFactory;
    protected $table = "konten";
    protected $primaryKey = "id_konten";
    protected $fillable = ["judul_konten","kelompok_konten","isi_konten"];

    public function kelompok(){
        return $this->belongsTo(KelKonten::class, 'kelompok_konten');
    }
}

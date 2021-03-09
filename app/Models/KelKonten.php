<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelKonten extends Model
{
    use HasFactory;
    protected $table = 'kelompok_konten';
    protected $primaryKey = 'id_kelompok_konten';
    protected $fillable = ['id_kelompok_konten','nama_kelompok_konten'];

    public function konten(){
        return $this->hasMany(Konten::class);
    }
}

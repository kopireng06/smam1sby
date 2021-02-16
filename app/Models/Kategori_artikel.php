<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori_artikel extends Model
{
    use HasFactory;

    protected $table = 'kategori_artikel';

    protected $primaryKey = 'id_kategoriartikel';

    protected $fillable = [
        'nama_kategoriartikel',    
    ];
    
    public function artikel(){
        return $this->hasMany(Artikel::class);
    }
}

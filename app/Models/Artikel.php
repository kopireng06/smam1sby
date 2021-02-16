<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    use HasFactory;
    protected $table = 'artikel';

    protected $primaryKey = 'id_artikel';

    protected $fillable = [
        'judul_artikel',
        'isi_artikel',
        'penulis_artikel',
        'id_kategoriartikel',
        'foto_artikel',

    ];
    
    public function kategori(){
        return $this->belongsTo(Kategori_artikel::class, 'id_kategoriartikel');
    }

    public function user(){
        return $this->belongsTo(User::class, 'penulis_artikel');
    }
}

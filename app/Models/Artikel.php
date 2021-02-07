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
    
    public function kategori_artikel(){
        return $this->belongsTo('App\Kategori_artikel');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }
}

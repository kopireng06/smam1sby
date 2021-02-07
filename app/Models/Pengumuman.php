<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    use HasFactory;

    protected $table = 'pengumumen';

    protected $primaryKey = 'id_pengumuman';

    protected $fillable = [
        'judul_pengumuman',
        'isi_pengumuman',
        'tanggal_pengumuman',
        'foto_pengumuman',
        'penulis_pengumuman',
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
}

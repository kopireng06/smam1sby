<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testi extends Model
{
    use HasFactory;

    protected $table = 'testimoni';

    protected $primaryKey = 'id_testi';

    protected $fillable = [
        'nama_testi',
        'isi_testi',
        'jurusan_testi',        
        'universitas_testi',
        'pekerjaan_testi',
        'foto_testi',
        'penulis_testi',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'penulis_testi');
    }

}

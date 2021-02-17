<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $table = 'quotes';

    protected $primaryKey = 'id_quote';

    protected $fillable = [
        'nama_quote',
        'jabatan_quote',
        'isi_quote',
        'penulis_quote',
        'foto_quote',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'penulis_quote');
    }
}

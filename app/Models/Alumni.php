<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class alumni extends Model
{
    use HasFactory;
    protected $table = 'alumni';
    protected $primaryKey = 'id_alumni';
    protected $fillable = ['id_alumni','nama_alumni','univ_alumni','jurusan_alumni','angkatan'];
}

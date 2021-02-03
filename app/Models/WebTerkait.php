<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebTerkait extends Model
{
    use HasFactory;

    protected $table = 'web_terkait';
    protected $primaryKey = 'id_web';
    protected $fillable = ['id_web','nama_web','link_web'];
}

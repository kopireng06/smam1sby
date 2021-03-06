<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengumumenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pengumumen', function (Blueprint $table) {
            $table->increments('id_pengumuman');
            $table->string('judul_pengumuman');
            $table->text('isi_pengumuman');
            $table->integer('penulis_pengumuman')->unsigned();
            $table->foreign('penulis_pengumuman')->references('id')->on('users')            
            ->onUpdate('cascade')
            ->onDelete('restrict');
            $table->timestamps();
            
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pengumumen');
    }
}

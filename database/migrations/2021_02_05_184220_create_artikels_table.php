<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtikelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artikel', function (Blueprint $table) {
            $table->increments('id_artikel');
            $table->string('judul_artikel');
            $table->text('isi_artikel');
            $table->string('foto_artikel')->nullable();
            $table->integer('penulis_artikel')->unsigned();
            $table->foreign('penulis_artikel')->references('id')->on('users')
            ->onUpdate('cascade')
            ->onDelete('restrict');
            $table->integer('id_kategoriartikel')->unsigned();
            $table->foreign('id_kategoriartikel')->references('id_kategoriartikel')->on('kategori_artikel')
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
        Schema::dropIfExists('artikel');
    }
}

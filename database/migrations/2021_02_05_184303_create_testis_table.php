<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('testi', function (Blueprint $table) {
            $table->increments('id_testi');
            $table->string('nama_testi');
            $table->text('isi_testi');
            $table->string('pekerjaan_testi')->nullable();
            $table->string('jurusan_testi')->nullable();
            $table->string('fakultas_testi')->nullable();
            $table->string('universitas_testi')->nullable();
            $table->string('foto_testi')->nullable();
            $table->integer('penulis_testi')->unsigned();
            $table->foreign('penulis_testi')->references('id')->on('users')            
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
        Schema::dropIfExists('testi');
    }
}

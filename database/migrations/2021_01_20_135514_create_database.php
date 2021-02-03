<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDatabase extends Migration
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
            $table->string('kategori_artikel');
            $table->string('judul_artikel');
            $table->string('penulis_artikel');
            $table->text('isi_artikel');
            $table->timestamps();
        });

        Schema::create('kategori_artikel', function (Blueprint $table) {
            $table->increments('id_kelompok_artikel');
            $table->string('nama_kelompok_artikel');
            $table->timestamps();
        });

        Schema::create('konten', function (Blueprint $table) {
            $table->increments('id_konten');
            $table->string('judul_konten');
            $table->string('kelompok_konten');
            $table->text('isi_konten');
            $table->timestamps();
        });

        Schema::create('kelompok_konten', function (Blueprint $table) {
            $table->increments('id_kelompok_konten');
            $table->string('nama_kelompok_konten');
            $table->timestamps();
        });

        Schema::create('pengumuman', function (Blueprint $table) {
            $table->increments('id_pengumuman');
            $table->string('judul_pengumuman');
            $table->text('isi_pengumuman');
            $table->datetime('tanggal_pengumuman');
            $table->timestamps();
        });

        Schema::create('alumni', function (Blueprint $table) {
            $table->increments('id_alumni');
            $table->string('nama_alumni');
            $table->string('univ_alumni');
            $table->string('jurusan_alumni');
            $table->timestamps();
        });

        Schema::create('testi_alumni', function (Blueprint $table) {
            $table->increments('id_testi');
            $table->string('foto_testi');
            $table->string('nama_testi');
            $table->string('jurusan_testi');
            $table->string('fakultas_testi');
            $table->string('univ_testi');
            $table->text('testi');
            $table->timestamps();
        });

        Schema::create('prestasi', function (Blueprint $table) {
            $table->increments('id_prestasi');
            $table->string('nama_prestasi');
            $table->integer('juara_prestasi');
            $table->string('tingkat_prestasi');
            $table->timestamps();
        });

        Schema::create('quotes', function (Blueprint $table) {
            $table->increments('id_quotes');
            $table->string('nama_quotes');
            $table->string('jabatan_quotes');
            $table->text('isi_quotes');
            $table->string('foto_quotes');
            $table->timestamps();
        });

        
        Schema::create('web_terkait', function (Blueprint $table) {
            $table->increments('id_web');
            $table->string('nama_web');
            $table->string('link_web');
            $table->timestamps();
        });

        Schema::create('carousel', function (Blueprint $table) {
            $table->increments('id_car');
            $table->string('foto_car');
            $table->string('judul_car');
            $table->text('isi_car');
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
        Schema::dropIfExists('kategori_artikel');
        Schema::dropIfExists('konten');
        Schema::dropIfExists('kelompok_konten');
        Schema::dropIfExists('pengumuman');
        Schema::dropIfExists('alumni');
        Schema::dropIfExists('testi_alumni');
        Schema::dropIfExists('prestasi');
        Schema::dropIfExists('quotes');
        Schema::dropIfExists('web_terkait');
        Schema::dropIfExists('carousel');
    }
}
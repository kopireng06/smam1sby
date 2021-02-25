<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->increments('id_quote');
            $table->string('nama_quote');
            $table->string('jabatan_quote');
            $table->text('isi_quote');
            $table->string('foto_quote')->nullable();
            $table->integer('penulis_quote')->unsigned();
            $table->foreign('penulis_quote')->references('id')->on('users')
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
        Schema::dropIfExists('quotes');
    }
}

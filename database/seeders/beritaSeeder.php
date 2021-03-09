<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class beritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('artikel')->insert([
            'judul_artikel' => Str::random(10),
            'isi_artikel' => Str::random(10).'@gmail.com',
            'foto_artikel' => '1615216297.jpg',
            'penulis_artikel' => 1,
            'id_kategoriartikel' => 1
        ]);
    }
}

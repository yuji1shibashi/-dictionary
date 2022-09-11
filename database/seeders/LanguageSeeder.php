<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("languages")->insert([
            [
                "id" => 1,
                "code" => 'ja',
                "name" => '日本語'
            ],
            [
                "id" => 2,
                "code" => 'en',
                "name" => '英語'
            ],
        ]);
    }
}

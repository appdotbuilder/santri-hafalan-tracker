<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'santri',
                'display_name' => 'Santri',
                'description' => 'Siswa yang belajar hafalan Al-Quran',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ustadz',
                'display_name' => 'Ustadz',
                'description' => 'Guru yang mengajar dan menilai hafalan santri',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Administrator yang mengelola sistem',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('roles')->insert($roles);
    }
}
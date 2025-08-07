<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
        ]);

        // Create admin user
        \App\Models\User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@tahfidz.com',
            'role_id' => 3, // admin role
            'status' => 'active',
        ]);

        // Create sample ustadz
        \App\Models\User::factory()->create([
            'name' => 'Ustadz Ahmad',
            'email' => 'ustadz@tahfidz.com',
            'role_id' => 2, // ustadz role
            'status' => 'active',
        ]);

        // Create sample santri
        \App\Models\User::factory()->create([
            'name' => 'Muhammad Yusuf',
            'email' => 'santri@tahfidz.com',
            'role_id' => 1, // santri role
            'status' => 'active',
        ]);
    }
}

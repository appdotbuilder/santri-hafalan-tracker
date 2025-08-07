<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Models\TahfidzRecord;
use App\Models\MemorizationProgress;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TahfidzSystemTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->seed(\Database\Seeders\RoleSeeder::class);
    }

    public function test_welcome_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
        );
    }

    public function test_authenticated_user_can_access_dashboard(): void
    {
        $role = Role::where('name', 'santri')->first();
        $user = User::factory()->create([
            'role_id' => $role->id,
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('dashboards/santri')
                ->has('user')
                ->has('recentRecords')
                ->has('progress')
                ->has('stats')
        );
    }

    public function test_ustadz_can_create_tahfidz_record(): void
    {
        $ustadzRole = Role::where('name', 'ustadz')->first();
        $santriRole = Role::where('name', 'santri')->first();
        
        $ustadz = User::factory()->create(['role_id' => $ustadzRole->id]);
        $santri = User::factory()->create(['role_id' => $santriRole->id]);

        $data = [
            'santri_id' => $santri->id,
            'juz' => 1,
            'page' => 1,
            'type' => 'tahfidz',
            'score' => 85,
            'notes' => 'Good progress',
            'recorded_date' => today()->format('Y-m-d'),
            'details' => []
        ];

        $response = $this->actingAs($ustadz)->post('/tahfidz', $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('tahfidz_records', [
            'santri_id' => $santri->id,
            'ustadz_id' => $ustadz->id,
            'juz' => 1,
            'page' => 1,
            'type' => 'tahfidz'
        ]);
    }

    public function test_santri_cannot_create_tahfidz_record(): void
    {
        $santriRole = Role::where('name', 'santri')->first();
        $santri = User::factory()->create(['role_id' => $santriRole->id]);

        $data = [
            'santri_id' => $santri->id,
            'juz' => 1,
            'page' => 1,
            'type' => 'tahfidz',
            'score' => 85,
            'notes' => 'Good progress',
            'recorded_date' => today()->format('Y-m-d'),
            'details' => []
        ];

        $response = $this->actingAs($santri)->post('/tahfidz', $data);

        $response->assertStatus(403);
    }

    public function test_progress_is_updated_when_record_created(): void
    {
        $ustadzRole = Role::where('name', 'ustadz')->first();
        $santriRole = Role::where('name', 'santri')->first();
        
        $ustadz = User::factory()->create(['role_id' => $ustadzRole->id]);
        $santri = User::factory()->create(['role_id' => $santriRole->id]);

        $data = [
            'santri_id' => $santri->id,
            'juz' => 1,
            'page' => 1,
            'type' => 'tahfidz',
            'score' => 85,
            'notes' => 'Good progress',
            'recorded_date' => today()->format('Y-m-d'),
            'details' => []
        ];

        $this->actingAs($ustadz)->post('/tahfidz', $data);

        $this->assertDatabaseHas('memorization_progress', [
            'santri_id' => $santri->id,
            'juz' => 1,
        ]);
    }

    public function test_user_roles_work_correctly(): void
    {
        $santriRole = Role::where('name', 'santri')->first();
        $ustadzRole = Role::where('name', 'ustadz')->first();
        $adminRole = Role::where('name', 'admin')->first();

        $santri = User::factory()->create(['role_id' => $santriRole->id]);
        $ustadz = User::factory()->create(['role_id' => $ustadzRole->id]);
        $admin = User::factory()->create(['role_id' => $adminRole->id]);

        $this->assertTrue($santri->isSantri());
        $this->assertFalse($santri->isUstadz());
        $this->assertFalse($santri->isAdmin());

        $this->assertTrue($ustadz->isUstadz());
        $this->assertFalse($ustadz->isSantri());
        $this->assertFalse($ustadz->isAdmin());

        $this->assertTrue($admin->isAdmin());
        $this->assertFalse($admin->isSantri());
        $this->assertFalse($admin->isUstadz());
    }
}
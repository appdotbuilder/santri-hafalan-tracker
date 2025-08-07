<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TahfidzRecord>
 */
class TahfidzRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['tahfidz', 'tahsin', 'tasmi']);
        $details = [];
        
        if ($type === 'tahsin') {
            $details = [
                'fluency' => fake()->numberBetween(1, 5),
                'makhraj' => fake()->numberBetween(1, 5),
                'nun_mim_rules' => fake()->numberBetween(1, 5),
                'mad_rules' => fake()->numberBetween(1, 5),
            ];
        } elseif ($type === 'tahfidz') {
            $details = [
                'obstacles' => fake()->optional()->sentence(),
            ];
        }

        return [
            'santri_id' => User::factory(),
            'ustadz_id' => User::factory(),
            'juz' => fake()->numberBetween(1, 30),
            'page' => fake()->numberBetween(1, 604),
            'type' => $type,
            'score' => fake()->optional(0.8)->numberBetween(60, 100),
            'notes' => fake()->optional()->paragraph(2),
            'details' => empty($details) ? null : $details,
            'recorded_date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
        ];
    }
}
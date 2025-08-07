<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MemorizationProgress>
 */
class MemorizationProgressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalPages = 20; // Standard pages per juz
        $completedPages = fake()->numberBetween(0, $totalPages);
        $isCompleted = $completedPages >= $totalPages && fake()->boolean(70);
        
        return [
            'santri_id' => User::factory(),
            'juz' => fake()->numberBetween(1, 30),
            'total_pages' => $totalPages,
            'completed_pages' => $completedPages,
            'average_score' => $completedPages > 0 ? fake()->randomFloat(2, 70, 95) : null,
            'is_completed' => $isCompleted,
            'last_updated' => fake()->dateTimeBetween('-6 months', 'now'),
        ];
    }
}
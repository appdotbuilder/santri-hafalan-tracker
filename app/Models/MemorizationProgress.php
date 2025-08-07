<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MemorizationProgress
 *
 * @property int $id
 * @property int $santri_id
 * @property int $juz
 * @property int $total_pages
 * @property int $completed_pages
 * @property float|null $average_score
 * @property bool $is_completed
 * @property \Illuminate\Support\Carbon $last_updated
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $santri
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress query()
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereAverageScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereCompletedPages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereIsCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereJuz($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereLastUpdated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereSantriId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereTotalPages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MemorizationProgress whereUpdatedAt($value)
 * @method static \Database\Factories\MemorizationProgressFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MemorizationProgress extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'santri_id',
        'juz',
        'total_pages',
        'completed_pages',
        'average_score',
        'is_completed',
        'last_updated',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'average_score' => 'decimal:2',
        'is_completed' => 'boolean',
        'last_updated' => 'datetime',
    ];

    /**
     * Get the santri that owns the progress.
     */
    public function santri(): BelongsTo
    {
        return $this->belongsTo(User::class, 'santri_id');
    }

    /**
     * Calculate progress percentage for this juz.
     *
     * @return float
     */
    public function getProgressPercentageAttribute(): float
    {
        if ($this->total_pages === 0) {
            return 0;
        }
        
        return ($this->completed_pages / $this->total_pages) * 100;
    }
}
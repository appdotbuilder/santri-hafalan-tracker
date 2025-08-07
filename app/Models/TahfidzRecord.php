<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TahfidzRecord
 *
 * @property int $id
 * @property int $santri_id
 * @property int $ustadz_id
 * @property int $juz
 * @property int $page
 * @property string $type
 * @property int|null $score
 * @property string|null $notes
 * @property array|null $details
 * @property \Illuminate\Support\Carbon $recorded_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $santri
 * @property-read User $ustadz
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord query()
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereJuz($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord wherePage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereRecordedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereSantriId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord whereUstadzId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TahfidzRecord byType($type)
 * @method static \Database\Factories\TahfidzRecordFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TahfidzRecord extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'santri_id',
        'ustadz_id',
        'juz',
        'page',
        'type',
        'score',
        'notes',
        'details',
        'recorded_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'recorded_date' => 'date',
        'details' => 'array',
        'score' => 'integer',
    ];

    /**
     * Get the santri that owns the record.
     */
    public function santri(): BelongsTo
    {
        return $this->belongsTo(User::class, 'santri_id');
    }

    /**
     * Get the ustadz that created the record.
     */
    public function ustadz(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ustadz_id');
    }

    /**
     * Scope a query to filter by type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}
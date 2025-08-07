<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property int $role_id
 * @property string|null $phone
 * @property \Illuminate\Support\Carbon|null $birth_date
 * @property string|null $address
 * @property string $status
 * @property array|null $metadata
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Role $role
 * @property-read \Illuminate\Database\Eloquent\Collection<int, TahfidzRecord> $tahfidzRecords
 * @property-read \Illuminate\Database\Eloquent\Collection<int, TahfidzRecord> $ustadzRecords
 * @property-read \Illuminate\Database\Eloquent\Collection<int, MemorizationProgress> $progress
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $santriStudents
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $ustadzTeachers
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User active()
 * @method static \Illuminate\Database\Eloquent\Builder|User byRole($role)
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'phone',
        'birth_date',
        'address',
        'status',
        'metadata',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
            'metadata' => 'array',
        ];
    }

    /**
     * Get the role that the user belongs to.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class)->withDefault();
    }

    /**
     * Get the tahfidz records for this user as a santri.
     */
    public function tahfidzRecords(): HasMany
    {
        return $this->hasMany(TahfidzRecord::class, 'santri_id');
    }

    /**
     * Get the tahfidz records created by this user as an ustadz.
     */
    public function ustadzRecords(): HasMany
    {
        return $this->hasMany(TahfidzRecord::class, 'ustadz_id');
    }

    /**
     * Get the memorization progress for this user.
     */
    public function progress(): HasMany
    {
        return $this->hasMany(MemorizationProgress::class, 'santri_id');
    }

    /**
     * Get the santri students assigned to this ustadz.
     */
    public function santriStudents(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'santri_ustadz_assignments', 'ustadz_id', 'santri_id')
                    ->wherePivot('is_active', true);
    }

    /**
     * Get the ustadz teachers for this santri.
     */
    public function ustadzTeachers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'santri_ustadz_assignments', 'santri_id', 'ustadz_id')
                    ->wherePivot('is_active', true);
    }

    /**
     * Scope a query to only include active users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to filter users by role.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $role
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByRole($query, $role)
    {
        return $query->whereHas('role', function ($q) use ($role) {
            $q->where('name', $role);
        });
    }

    /**
     * Check if user has specific role.
     *
     * @param  string  $role
     * @return bool
     */
    public function hasRole($role): bool
    {
        return $this->role->name === $role;
    }

    /**
     * Check if user is a santri.
     *
     * @return bool
     */
    public function isSantri(): bool
    {
        return $this->hasRole('santri');
    }

    /**
     * Check if user is an ustadz.
     *
     * @return bool
     */
    public function isUstadz(): bool
    {
        return $this->hasRole('ustadz');
    }

    /**
     * Check if user is an admin.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }
}
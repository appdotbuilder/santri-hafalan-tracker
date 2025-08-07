<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTahfidzRecordRequest;
use App\Models\TahfidzRecord;
use App\Models\MemorizationProgress;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TahfidzController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = TahfidzRecord::with(['santri', 'ustadz']);
        
        if ($user->isSantri()) {
            $query->where('santri_id', $user->id);
        } elseif ($user->isUstadz()) {
            $query->where('ustadz_id', $user->id);
        }
        
        $records = $query->latest('recorded_date')
            ->paginate(20);

        return Inertia::render('tahfidz/index', [
            'records' => $records,
            'user' => $user->load('role'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        
        if (!$user->isUstadz() && !$user->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $santriList = User::byRole('santri')->active()->get();

        return Inertia::render('tahfidz/create', [
            'santriList' => $santriList,
            'user' => $user->load('role'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTahfidzRecordRequest $request)
    {
        $record = TahfidzRecord::create([
            ...$request->validated(),
            'ustadz_id' => $request->user()->id,
        ]);

        // Update progress
        $this->updateProgress($record);

        return redirect()->route('tahfidz.show', $record)
            ->with('success', 'Data tahfidz berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TahfidzRecord $tahfidz)
    {
        $tahfidz->load(['santri', 'ustadz']);

        return Inertia::render('tahfidz/show', [
            'record' => $tahfidz,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TahfidzRecord $tahfidz, Request $request)
    {
        $user = $request->user();
        
        if (!$user->isUstadz() && !$user->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $santriList = User::byRole('santri')->active()->get();

        return Inertia::render('tahfidz/edit', [
            'record' => $tahfidz,
            'santriList' => $santriList,
            'user' => $user->load('role'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTahfidzRecordRequest $request, TahfidzRecord $tahfidz)
    {
        $tahfidz->update($request->validated());

        // Update progress
        $this->updateProgress($tahfidz);

        return redirect()->route('tahfidz.show', $tahfidz)
            ->with('success', 'Data tahfidz berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TahfidzRecord $tahfidz)
    {
        $tahfidz->delete();

        return redirect()->route('tahfidz.index')
            ->with('success', 'Data tahfidz berhasil dihapus.');
    }

    /**
     * Update memorization progress based on record.
     *
     * @param  \App\Models\TahfidzRecord  $record
     */
    protected function updateProgress(TahfidzRecord $record)
    {
        $progress = MemorizationProgress::firstOrCreate([
            'santri_id' => $record->santri_id,
            'juz' => $record->juz,
        ], [
            'total_pages' => 20, // Standard pages per juz
            'completed_pages' => 0,
            'average_score' => 0,
            'is_completed' => false,
        ]);

        // Recalculate progress
        $juzRecords = TahfidzRecord::where('santri_id', $record->santri_id)
            ->where('juz', $record->juz)
            ->where('score', '>=', 70) // Minimum passing score
            ->get();

        $completedPages = $juzRecords->pluck('page')->unique()->count();
        $averageScore = $juzRecords->avg('score');

        $progress->update([
            'completed_pages' => $completedPages,
            'average_score' => $averageScore,
            'is_completed' => $completedPages >= 20 && $averageScore >= 80,
            'last_updated' => now(),
        ]);
    }
}
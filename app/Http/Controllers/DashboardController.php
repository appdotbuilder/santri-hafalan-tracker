<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\TahfidzRecord;
use App\Models\MemorizationProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isSantri()) {
            return $this->santriDashboard($user);
        } elseif ($user->isUstadz()) {
            return $this->ustadzDashboard($user);
        } elseif ($user->isAdmin()) {
            return $this->adminDashboard($user);
        }

        return Inertia::render('dashboard', [
            'user' => $user->load('role'),
        ]);
    }

    /**
     * Display santri dashboard.
     *
     * @param  \App\Models\User  $santri
     */
    protected function santriDashboard(User $santri)
    {
        $recentRecords = $santri->tahfidzRecords()
            ->with('ustadz')
            ->latest('recorded_date')
            ->take(10)
            ->get();

        $progress = $santri->progress()
            ->orderBy('juz')
            ->get();

        $stats = [
            'total_records' => $santri->tahfidzRecords()->count(),
            'completed_juz' => $progress->where('is_completed', true)->count(),
            'average_score' => $santri->tahfidzRecords()->avg('score'),
            'current_juz' => optional($progress->where('is_completed', false)->first())->juz ?? 1,
        ];

        return Inertia::render('dashboards/santri', [
            'user' => $santri->load('role'),
            'recentRecords' => $recentRecords,
            'progress' => $progress,
            'stats' => $stats,
        ]);
    }

    /**
     * Display ustadz dashboard.
     *
     * @param  \App\Models\User  $ustadz
     */
    protected function ustadzDashboard(User $ustadz)
    {
        $students = $ustadz->santriStudents()
            ->with(['progress', 'tahfidzRecords' => function ($query) {
                $query->latest('recorded_date')->take(5);
            }])
            ->get();

        $recentRecords = $ustadz->ustadzRecords()
            ->with('santri')
            ->latest('recorded_date')
            ->take(10)
            ->get();

        $stats = [
            'total_students' => $students->count(),
            'total_records' => $ustadz->ustadzRecords()->count(),
            'records_today' => $ustadz->ustadzRecords()->whereDate('recorded_date', today())->count(),
            'average_score' => $ustadz->ustadzRecords()->avg('score'),
        ];

        return Inertia::render('dashboards/ustadz', [
            'user' => $ustadz->load('role'),
            'students' => $students,
            'recentRecords' => $recentRecords,
            'stats' => $stats,
        ]);
    }

    /**
     * Display admin dashboard.
     *
     * @param  \App\Models\User  $admin
     */
    protected function adminDashboard(User $admin)
    {
        $stats = [
            'total_santri' => User::byRole('santri')->count(),
            'total_ustadz' => User::byRole('ustadz')->count(),
            'total_records' => TahfidzRecord::count(),
            'records_today' => TahfidzRecord::whereDate('recorded_date', today())->count(),
        ];

        $recentActivity = TahfidzRecord::with(['santri', 'ustadz'])
            ->latest('recorded_date')
            ->take(10)
            ->get();

        $progressOverview = MemorizationProgress::with('santri')
            ->where('is_completed', true)
            ->latest('last_updated')
            ->take(10)
            ->get();

        return Inertia::render('dashboards/admin', [
            'user' => $admin->load('role'),
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'progressOverview' => $progressOverview,
        ]);
    }
}
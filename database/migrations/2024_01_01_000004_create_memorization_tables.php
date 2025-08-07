<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tahfidz (Memorization) records
        Schema::create('tahfidz_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('santri_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ustadz_id')->constrained('users')->onDelete('cascade');
            $table->integer('juz')->comment('Juz number (1-30)');
            $table->integer('page')->comment('Page number in mushaf');
            $table->enum('type', ['tahfidz', 'tahsin', 'tasmi'])->comment('Type of memorization activity');
            $table->integer('score')->nullable()->comment('Score out of 100');
            $table->text('notes')->nullable()->comment('Notes from ustadz');
            $table->json('details')->nullable()->comment('Additional details based on type');
            $table->date('recorded_date')->comment('Date of memorization activity');
            $table->timestamps();
            
            $table->index(['santri_id', 'recorded_date']);
            $table->index(['ustadz_id', 'recorded_date']);
            $table->index(['type', 'recorded_date']);
            $table->index('juz');
        });

        // Progress tracking
        Schema::create('memorization_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('santri_id')->constrained('users')->onDelete('cascade');
            $table->integer('juz')->comment('Juz number (1-30)');
            $table->integer('total_pages')->default(0)->comment('Total pages memorized in this juz');
            $table->integer('completed_pages')->default(0)->comment('Pages completed with good scores');
            $table->decimal('average_score', 5, 2)->nullable()->comment('Average score for this juz');
            $table->boolean('is_completed')->default(false)->comment('Is this juz fully memorized');
            $table->timestamp('last_updated')->useCurrent();
            $table->timestamps();
            
            $table->unique(['santri_id', 'juz']);
            $table->index(['santri_id', 'is_completed']);
        });

        // Student-Ustadz assignments
        Schema::create('santri_ustadz_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('santri_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ustadz_id')->constrained('users')->onDelete('cascade');
            $table->boolean('is_active')->default(true);
            $table->date('assigned_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
            
            $table->unique(['santri_id', 'ustadz_id', 'is_active']);
            $table->index(['ustadz_id', 'is_active']);
            $table->index('assigned_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('santri_ustadz_assignments');
        Schema::dropIfExists('memorization_progress');
        Schema::dropIfExists('tahfidz_records');
    }
};
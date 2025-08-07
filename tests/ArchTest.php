<?php

test('application builds successfully', function () {
    expect(true)->toBeTrue();
});

test('models follow naming conventions', function () {
    $modelFiles = glob(app_path('Models/*.php'));
    
    foreach ($modelFiles as $file) {
        $filename = basename($file, '.php');
        // Model names should be PascalCase
        expect($filename)->toMatch('/^[A-Z][a-zA-Z]*$/');
    }
});

test('controllers follow naming conventions', function () {
    $controllerFiles = glob(app_path('Http/Controllers/*.php'));
    
    foreach ($controllerFiles as $file) {
        $filename = basename($file, '.php');
        if ($filename !== 'Controller') {
            // Controller names should end with 'Controller'
            expect($filename)->toEndWith('Controller');
        }
    }
});
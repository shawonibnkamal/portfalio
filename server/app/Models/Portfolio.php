<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
        'logo',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DishCategory extends Model
{

    use SoftDeletes;

    protected $table = 'dish_category';

    protected $fillable = [
        'name'
    ];

    /**
    * @codeCoverageIgnore
    */
    public function dish()
    {
        return $this->hasMany(Dish::class);
    }
}

<?php

namespace App\Interfaces;

interface StatusTypesInterface
{
    const TYPE_ORDERED = 'ordered';
    const TYPE_IN_PROGRESS = 'in progress';
    const TYPE_FINISHED = 'finished';
    const TYPES = [
        self::TYPE_ORDERED,
        self::TYPE_IN_PROGRESS,
        self::TYPE_FINISHED
    ];
}

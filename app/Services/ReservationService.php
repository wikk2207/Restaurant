<?php


namespace App\Services;

use App\Models\Reservation;
use App\Models\Table;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;


class ReservationService
{
    private const STATUS_CURRENT = 'current';
    private const STATUS_FINISHED = 'finished';

    /**
     * Check if time for new reservation is after now
     * @param string $time
     * @param string $date
     * @return bool
     */
    public function timeForSameDay(string $time, string $date): bool
    {
        if (Carbon::now()->format('Y-m-d') < $date) {
            return true;
        } elseif ($time >= date('H:i', strtotime(config('reservation.timeForSameDay')))) {
            return true;
        }
        return false;

    }

    /**
     * One reservation a day for customer
     * @param string $date
     * @param string $email
     * @return bool
     */
    public function oneADay(string $date, string $email): bool
    {
        if (Reservation::where('email', $email)->where('date', $date)->first()) {
            return false;
        }
        return true;
    }

    /**
     * @param string $time
     * @return bool
     */
    public function openHours(string $time): bool
    {
        if ($time < config('reservation.openTime') || $time > config('reservation.lastReservation')) {
            return false;
        }
        return true;
    }

    /**
     * @param $id
     * @param $date
     * @param $time
     * @return bool
     */
    public function isTableAvailable($id, $date, $time): bool
    {
        try {
            if(Carbon::now()->format('Y-m-d')==$date){
                $table= Table::where('id',$id)->where('occupied_since',null)->whereDoesntHave('reservation', function ($query) use ($date,$time) {
                    $query->where('date', 'like', $date)->where('start_time','>=',$time);
                })->first();

            }else{
                $table= Table::where('id',$id)->whereDoesntHave('reservation', function ($query) use ($date) {
                    $query->where('date', 'like', $date);
                })->first();
            }
            if($table)
            {
                return true;
            }
        } catch (\Exception$exception) {
        }
        return false;
    }

    /**
     * @return array
     */
    public function reservationWithStatus(): array
    {
        //$auth=Auth::user(); todo: odkomentować jak będzie autoryzacja
        $auth = User::findOrFail(1);
        $reservations = Reservation::where('email', $auth->email)->get();
        $reservationWithStatus = [];
        foreach ($reservations as $reservation) {
            $status = self::STATUS_CURRENT;
            $nowDate = Carbon::now()->format('Y-m-d');
            if ($nowDate > $reservation->date) {
                $status = self::STATUS_FINISHED;
            }
            if ($nowDate == $reservation->date && Carbon::now()->format('H:i') > $reservation->start_time) {
                $status = self::STATUS_FINISHED;
            }
            array_push($reservationWithStatus, ['reservation' => $reservation, 'status' => $status]);
        }
        return $reservationWithStatus;
    }

}

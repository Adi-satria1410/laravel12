<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class SocialiteController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $socialUser = Socialite::driver($provider)->user();
        $registeredUser = User::where("google_id", $socialUser->id)->first();
        if ($registeredUser) {
            Auth::login($registeredUser);
            return redirect()->intended('/dashboard');
        }

        $user = User::createandUpdate([
                    'google_id' => $socialUser->id,
                    'name' => $socialUser->name,
                    'email' => $socialUser->email,
                    'password' => bcrypt('password'),
                    'google_token' => $socialUser->token,
                    'google_refresh_token' => $socialUser->refreshToken,
                    'email_verified_at' => now(),
                ]);

        Auth::login($user);

        return redirect()->intended('/dashboard');
    }
}

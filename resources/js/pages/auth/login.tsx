import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail, ShoppingBag, Sparkles, Shield, TrendingUp, Users } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <Head title="Login - Toko Online" />

            {/* Left Side - Branding */}
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 lg:flex lg:w-1/2">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                />

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-white/5 blur-3xl"></div>
                <div className="absolute right-16 bottom-32 h-40 w-40 animate-pulse rounded-full bg-white/5 blur-3xl delay-1000"></div>
                <div className="absolute top-1/2 left-10 h-24 w-24 animate-pulse rounded-full bg-white/5 blur-2xl delay-500"></div>

                <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
                    {/* Logo */}
                    <div className="relative mb-8">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                            <ShoppingBag className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400">
                            <Sparkles className="h-3 w-3 text-yellow-800" />
                        </div>
                    </div>

                    {/* Welcome Text */}
                    <h1 className="mb-4 text-center text-3xl font-bold leading-tight">
                        Selamat Datang Kembali!
                    </h1>
                    <p className="max-w-sm text-center text-lg leading-relaxed text-blue-100 opacity-90">
                        Kelola toko online Anda dengan mudah dan tingkatkan penjualan dengan fitur-fitur canggih kami.
                    </p>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-3 gap-6 text-center">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10">
                            <div className="mb-1 text-xl font-bold">1000+</div>
                            <div className="text-xs text-blue-100 opacity-80">Produk</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10">
                            <div className="mb-1 text-xl font-bold">500+</div>
                            <div className="text-xs text-blue-100 opacity-80">Pelanggan</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10">
                            <div className="mb-1 text-xl font-bold">99%</div>
                            <div className="text-xs text-blue-100 opacity-80">Uptime</div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center space-x-3 text-sm text-blue-100">
                            <Shield className="h-4 w-4" />
                            <span>Keamanan tingkat enterprise</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-blue-100">
                            <TrendingUp className="h-4 w-4" />
                            <span>Analytics real-time</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-blue-100">
                            <Users className="h-4 w-4" />
                            <span>Support 24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="mb-8 text-center lg:hidden">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                            <ShoppingBag className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Toko Online</h1>
                    </div>

                    {/* Form Header */}
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                            Masuk ke Akun Anda
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 lg:text-base">
                            Silakan masukkan detail akun Anda untuk melanjutkan
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
                            <div className="text-center text-sm font-medium text-emerald-800 dark:text-emerald-400">
                                {status}
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Alamat Email
                            </Label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail
                                        className={`h-5 w-5 transition-colors duration-200 ${
                                            focusedField === 'email' 
                                                ? 'text-blue-500' 
                                                : 'text-gray-400 dark:text-gray-500'
                                        }`}
                                    />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="nama@email.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`h-11 pl-10 transition-all duration-200 ${
                                        errors.email
                                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-900/20'
                                            : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800'
                                    }`}
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Kata Sandi
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Lupa kata sandi?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock
                                        className={`h-5 w-5 transition-colors duration-200 ${
                                            focusedField === 'password' 
                                                ? 'text-blue-500' 
                                                : 'text-gray-400 dark:text-gray-500'
                                        }`}
                                    />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`h-11 pr-10 pl-10 transition-all duration-200 ${
                                        errors.password
                                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-900/20'
                                            : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800'
                                    }`}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                            />
                            <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                                Ingat saya
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="h-11 w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                'Masuk ke Dashboard'
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                                    Atau masuk dengan
                                </span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="pt-6 text-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Belum punya akun? </span>
                            <TextLink
                                href={route('register')}
                                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Daftar sekarang
                            </TextLink>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <a 
                                href="#" 
                                className="transition-colors hover:text-gray-700 hover:underline dark:hover:text-gray-300"
                            >
                                Bantuan
                            </a>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <a 
                                href="#" 
                                className="transition-colors hover:text-gray-700 hover:underline dark:hover:text-gray-300"
                            >
                                Privasi
                            </a>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <a 
                                href="#" 
                                className="transition-colors hover:text-gray-700 hover:underline dark:hover:text-gray-300"
                            >
                                Syarat
                            </a>
                        </div>
                        <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
                            © 2024 Toko Online. Semua hak dilindungi.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

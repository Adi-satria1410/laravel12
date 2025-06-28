import '@/scripts/register.js';
import '@/style/login.css';
import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface RegisrerForm {
    name: string;
    email: string;
    password: string;
}

export default function RegisterPage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const inputs = document.querySelectorAll<HTMLInputElement>('.form-control');
        inputs.forEach((input) => {
            input.addEventListener('focus', function () {
                this.parentElement!.style.transform = 'translateY(-2px)';
            });
            input.addEventListener('blur', function () {
                this.parentElement!.style.transform = 'translateY(0)';
            });
        });

        const formGroups = document.querySelectorAll<HTMLElement>('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            setTimeout(() => {
                group.style.transition = 'all 0.6s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, []);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();

        const button = document.querySelector('.login-btn') as HTMLElement;
        const loading = document.querySelector('.loading') as HTMLElement;
        const btnText = document.querySelector('.btn-text') as HTMLElement;

        if (loading) loading.style.display = 'inline-block';
        if (btnText) btnText.textContent = 'Signing In...';
        if (button) button.style.pointerEvents = 'none';

        // Kirim data ke Laravel backend
        post('/register', {
            onSuccess: () => {
                // Animasi sukses
                if (loading) loading.style.display = 'none';
                const successCheck = document.querySelector('.success-checkmark') as HTMLElement;
                if (successCheck) successCheck.style.display = 'inline-block';
                if (btnText) btnText.textContent = 'Welcome to Sweet Bakery!';
                if (button) button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';

                setTimeout(() => {
                    router.visit('/');
                }, 200);
            },
            onError: (errors) => {
                // Reset button state jika error
                if (loading) loading.style.display = 'none';
                if (btnText) btnText.textContent = 'Masuk ke Toko Roti';
                if (button) {
                    button.style.pointerEvents = 'auto';
                    button.style.background = '';
                }
                console.error('Login errors:', errors);
            },
        });
    };

    const socialLogin = (provider: string) => {
        window.location.href = `/auth/${provider}/redirect`;
    };

    return (
        <div className="page-wrapper">
            <div className="bg-overlay" />

            <div className="floating-icons">
                {['bread-slice', 'cookie-bite', 'birthday-cake', 'stroopwafel', 'bread-slice', 'cookie', 'cake-candles', 'pizza-slice'].map(
                    (icon, index) => (
                        <i key={index} className={`fas fa-${icon} floating-icon`} />
                    ),
                )}
            </div>

            <div className="particles">
                {[...Array(9)].map((_, index) => (
                    <div key={index} className="particle" style={{ left: `${(index + 1) * 10}%`, animationDelay: `${index * 2}s` }} />
                ))}
            </div>

            <div className="login-container">
                <div className="bakery-logo">
                    <i className="fas fa-birthday-cake"></i>
                </div>

                <div className="login-header">
                    <h1>Sweet Bakery</h1>
                    <h2>Please Create Your Account</h2>
                    <h2>For Magic Cook</h2>

                    <p>Sign in to your bakery account and start baking magic!</p>
                </div>

                <form id="registerForm" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <div className="input-wrapper">
                            <input
                                type="name"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter your name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <i className="fas fa-envelope input-icon"></i>
                        </div>
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <i className="fas fa-envelope input-icon"></i>
                        </div>
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <i className="fas fa-lock input-icon"></i>
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`} onClick={togglePassword}></i>
                        </div>
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>
                    <button type="submit" className="login-btn" disabled={processing}>
                        <span className="loading"></span>
                        <span className="success-checkmark"></span>
                        <span className="btn-text">{processing ? 'Process Create an Account' : 'Create Account'}</span>
                    </button>
                </form>

                <div className="divider">
                    <span>or continue with</span>
                </div>

                <div className="social-login">
                    <button className="social-btn google" onClick={() => socialLogin('google')}>
                        <i className="fab fa-google"></i> Google
                    </button>
                    <button className="social-btn facebook" onClick={() => socialLogin('facebook')}>
                        <i className="fab fa-facebook-f"></i> Facebook
                    </button>
                </div>

                <div className="signup-link">
                    Already have an account? <a href="/register">Go for the magic cook!</a>
                </div>
            </div>
        </div>
    );
}

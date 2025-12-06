import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginData>();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginData) => {
        try {
            // Basic login for MVP
            const res = await api.post('/auth/login', data);
            localStorage.setItem('token', res.data.token); // Fallback if cookies fail (simple auth)
            // Ideally trigger global auth state update here
            navigate('/');
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setError('root', { message: error.response?.data?.message || 'Login failed' });
        }
    };

    return (
        <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>NAMI</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <input {...register('email', { required: true })} placeholder="Email" type="email" />
                    {errors.email && <span className="text-sm" style={{ color: 'var(--color-danger)' }}>Required</span>}
                </div>
                <div>
                    <input {...register('password', { required: true })} placeholder="Password" type="password" />
                    {errors.password && <span className="text-sm" style={{ color: 'var(--color-danger)' }}>Required</span>}
                </div>

                {errors.root && <div className="text-center" style={{ color: 'var(--color-danger)' }}>{errors.root.message}</div>}

                <button disabled={isSubmitting} className="btn btn-primary w-full">
                    {isSubmitting ? '...' : 'Login'}
                </button>
            </form>
            <div className="text-center mt-4">
                <Link to="/register" className="text-sm text-muted">Don't have an account? Sign up</Link>
            </div>
        </div>
    );
}

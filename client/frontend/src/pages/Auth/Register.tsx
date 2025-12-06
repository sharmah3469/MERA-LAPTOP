import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';

interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export default function Register() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterData>();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterData) => {
        try {
            await api.post('/auth/register', data);
            navigate('/login');
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setError('root', { message: error.response?.data?.message || 'Registration failed' });
        }
    };

    return (
        <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Join NAMI</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input {...register('name', { required: true })} placeholder="Full Name" />
                <input {...register('email')} placeholder="Email" type="email" />
                <input {...register('phone')} placeholder="Phone (+91...)" />
                <input {...register('password', { required: true })} placeholder="Password" type="password" />

                {errors.root && <div className="text-center" style={{ color: 'var(--color-danger)' }}>{errors.root.message as string}</div>}

                <button disabled={isSubmitting} className="btn btn-primary w-full">
                    {isSubmitting ? '...' : 'Sign Up'}
                </button>
            </form>
            <div className="text-center mt-4">
                <Link to="/login" className="text-sm text-muted">Already have an account? Login</Link>
            </div>
        </div>
    );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { loginSchema, type SigninFormValues } from '../core/constants';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../api';
import { toast } from 'sonner';
import { TextField } from '@/components/fields/TextField';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken, setUser } from '../slice';
import { useAppSelector } from '@/_redux/hooks';

export default function SigninForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const { isAuthenticated, token } = useAppSelector((state) => state.auth);

    // Move to Dashboard page if already logged in
    useEffect(() => {
        if (isAuthenticated || token) {
            navigate("/dashboard", { replace: true })
        }
    }, [isAuthenticated, token, navigate]);

    const form = useForm<SigninFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        }
    })

    const handleLogin = async (values: SigninFormValues) => {
        try {

            const response = await login(values).unwrap();

            // Store the token
            dispatch(setAuthToken(response.token));

            // Store the user
            dispatch(setUser(response.user));

            toast.success("Login successful");
            navigate("/dashboard");
        } catch (error: any) {
            console.log('Login error: ', error);
            if (error?.data?.message != '') {
                toast.error(error.data.message);
            } else {
                toast.error("Login Failed");
            }
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-indigo-100 to-purple-100'>
            <Card className='w-full border-0 shadow-xl max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-3xl font-bold text-center text-blue-600'>
                        Welcome Back
                    </CardTitle>
                    <CardDescription className='text-center'>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleLogin)}
                            className='space-y-5'>
                            <TextField
                                control={form.control}
                                name="identifier"
                                label="Username or Email"
                                required
                                icon={<User className="h-5 w-5" />}
                                renderInput={(field) => (
                                    <Input
                                        placeholder="username or email"
                                        {...field} />
                                )}
                            />

                            <TextField
                                control={form.control}
                                name="password"
                                label="Password"
                                required
                                icon={<Lock className="h-5 w-5" />}
                                renderInput={(field) => (
                                    <div className="relative">
                                        <Input
                                            placeholder="******"
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                            className={`${field.className} pr-10`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                )}
                            />

                            <Button
                                type="submit"
                                className='w-full bg-blue-500 hover:bg-blue-600'
                                disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex justify-center pb-6'>
                    <p className='text-sm text-gray-600'>Don't have an account?{' '}
                        <Link to="/auth/signup" className='text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors'>
                            Sign up
                        </Link >
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
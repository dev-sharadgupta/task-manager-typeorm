import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lock, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { signupSchema, type SignupFormValues } from '../core/constants';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from '../api';
import { toast } from 'sonner';
import { TextField } from '@/components/fields/TextField';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/_redux/hooks';

export default function SignupForm() {
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { isAuthenticated, token } = useAppSelector((state) => state.auth);

    // Move to Dashboard page if already logged in
    useEffect(() => {
        if (isAuthenticated || token) {
            navigate("/dashboard", { replace: true })
        }
    }, [isAuthenticated, token, navigate]);

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const handleSignup = async (values: SignupFormValues) => {
        try {
            const { confirmPassword, ...payload } = values;

            await signup(payload).unwrap();
            toast.success("Signup successful. Please login.");
            navigate("/login");
        } catch (error: any) {
            console.log('Form submission error: ', error);
            if (error?.data?.message != '') {
                toast.error(error.data.message);
            } else {
                toast.error("Failed to submit the form. Please try again.");
            }
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-indigo-100 to-purple-100'>
            <Card className='w-full border-0 shadow-xl max-w-md'>
                <CardHeader className='space-y-10'>
                    <CardTitle className='text-3xl font-bold text-center text-blue-600'>
                        Create an Account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSignup)}
                            className='space-y-5'>
                            <TextField
                                control={form.control}
                                name="username"
                                label="Username"
                                required
                                icon={<User className="h-5 w-5" />}
                                renderInput={(field) => (
                                    <Input
                                        placeholder="John"
                                        {...field} />
                                )}
                            />

                            <TextField
                                control={form.control}
                                name="email"
                                label="Email"
                                required
                                icon={<Mail className="h-5 w-5" />}
                                renderInput={(field) => (
                                    <Input placeholder="abc@abc.com" {...field} />
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

                            <TextField
                                control={form.control}
                                name="confirmPassword"
                                label="Confirm Password"
                                required
                                icon={<Lock className="h-5 w-5" />}
                                renderInput={(field) => (
                                    <div className="relative">
                                        <Input
                                            placeholder="******"
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...field}
                                            className={`${field.className} pr-10`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            {showConfirmPassword ? (
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
                                {isLoading ? "Creating account..." : "Sign Up"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex justify-center pb-6'>
                    <p className='text-sm text-gray-600'>Already have an account?{' '}
                        <Link to="/auth/login" className='text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors'>
                            Login
                        </Link >
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
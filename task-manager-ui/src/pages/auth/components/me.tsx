import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";
import { useMeQuery } from '../api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { LogOut, Mail, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../slice';


export default function Me() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isLoading, error } = useMeQuery();

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        toast.error((error as any)?.data?.message);
        return <div className="text-center mt-10 text-red-500">Failed to load user</div>;
    }

    const handleLogout = async () => {
        try {
            dispatch(logout());
            toast.success('Logged out successfully');
            navigate('/auth/login', { replace: true });
        } catch (err: any) {
            toast.error(err?.data?.message || 'Logout failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 px-4">
            <Card className="w-full max-w-md border-0 shadow-2xl backdrop-blur bg-white/80">
                <CardHeader className="text-center space-y-3">
                    {/* Avatar */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                        <User size={36} />
                    </div>

                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Welcome, {data?.user.username}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 justify-center">
                        <Mail size={16} />
                        <span>{data?.user.email}</span>
                    </div>
                </CardContent>

                <CardFooter className="pt-4">
                    <Button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                    >
                        <LogOut size={16} />
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
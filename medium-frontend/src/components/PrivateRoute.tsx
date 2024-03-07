
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
export default function PrivateRoute(){
    const { user } = useSelector((state: any) => state.user);

    return user.id ? <Outlet /> : <Navigate to='/signin' />
}


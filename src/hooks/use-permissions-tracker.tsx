// React
import { useSelector } from 'react-redux';
import { currentUser } from '../services/auth/authSlice';
import { useMemo } from "react";


export const usePermissionsChecker = () => {
    // Contexts
    const auth = useSelector(currentUser);
    console.log('current user:', auth);

    // Memo
    // const permissionsSet = useMemo(() => {
    //     // convert the permissions to a set of strings
    //     return new Set(permissions.map(permission => permission.toString()));
    // }, [permissions]);

    const isAuthorized = useMemo(() => {
        // if auth is not defined, then return false
        if(!auth) return false;

        // return true if any of the user permissions is in the defined permissions
        // return auth.permissions.some(permission => permissionsSet.has(permission.toString()));
    }, [auth]);

    // if user is not authorized, return null
    if (!isAuthorized) return null;

    // otherwise, return the children
    return (
        <>
            PERMISSIONS VALID
        </>
    );
};
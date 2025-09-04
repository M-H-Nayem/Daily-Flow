import React, { use } from 'react';
import { AuthContext } from '../../../AuthContext';
// import AuthProvider from '../../AuthProvider';

const useAuth = () => {
    let authInfos = use(AuthContext)
    return authInfos
};

export default useAuth;
import { SignUp } from '@clerk/clerk-react';
import React from 'react';

const Register = () => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <SignUp signInUrl="/login" />
        </div>
    );
};

export default Register;

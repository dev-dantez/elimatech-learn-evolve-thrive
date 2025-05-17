
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Logo from '@/components/common/Logo';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-elimu-primary/10 to-elimu-accent/10 p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Logo size="large" />
        </div>
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;

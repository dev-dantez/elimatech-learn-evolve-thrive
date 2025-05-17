
import React from 'react';
import { Link } from 'react-router-dom';
import { Graduation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'text-lg';
      case 'large':
        return 'text-3xl';
      default:
        return 'text-xl';
    }
  };

  const iconSize = size === 'small' ? 18 : size === 'large' ? 28 : 24;

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="rounded-lg bg-gradient-to-br from-elimu-primary to-elimu-accent p-1 text-white">
        <Graduation size={iconSize} />
      </div>
      <h1 className={cn('font-bold flex', getSize(), className)}>
        <span className="text-elimu-primary">Elimu</span>
        <span className="text-elimu-accent">Tech</span>
      </h1>
    </Link>
  );
};

export default Logo;

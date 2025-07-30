import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold tracking-tighter text-gray-800">
        FaydaHealth
      </span>
    </div>
  );
};
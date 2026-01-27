
import React from 'react';
import { SecurityContext, SecurityStatus } from './SecurityContext.tsx';

interface SecurityLayerProps {
  children: React.ReactNode;
  threatLevel: 'LOW' | 'ELEVATED' | 'CRITICAL';
  coreImmutability: 'LOCKED' | 'SYNCING' | 'DEVIATION_DETECTED';
}

export const SecurityLayer: React.FC<SecurityLayerProps> = ({ children, threatLevel, coreImmutability }) => {
  let status: SecurityStatus = 'SECURE';
  
  if (threatLevel === 'CRITICAL' || coreImmutability === 'DEVIATION_DETECTED') {
    status = 'CRITICAL_LOCKDOWN';
  } else if (threatLevel === 'ELEVATED' || coreImmutability === 'SYNCING') {
    status = 'WARNING';
  }

  const validateAction = (action: string): boolean => {
    if (status === 'CRITICAL_LOCKDOWN') {
      console.error(`[SECURITY BLOCK] Action '${action}' denied due to system lockdown.`);
      // Optional: Dispatch a global event or toast here
      return false;
    }
    if (status === 'WARNING') {
      console.warn(`[SECURITY WARN] Action '${action}' permitted under elevated threat.`);
    }
    return true;
  };

  return (
    <SecurityContext.Provider value={{ status, validateAction }}>
      {children}
    </SecurityContext.Provider>
  );
};

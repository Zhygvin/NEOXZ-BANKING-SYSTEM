
import { createContext, useContext } from 'react';

export type SecurityStatus = 'SECURE' | 'WARNING' | 'CRITICAL_LOCKDOWN';

export interface SecurityContextType {
  status: SecurityStatus;
  validateAction: (action: string) => boolean;
}

export const SecurityContext = createContext<SecurityContextType>({
  status: 'SECURE',
  validateAction: () => true
});

export const useSecurity = () => useContext(SecurityContext);

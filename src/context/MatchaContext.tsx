import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { MatchaLog } from '../types';
import { storageSave, storageLoad } from '../services/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface MatchaContextType {
  logs: MatchaLog[];
  addLog: (log: Omit<MatchaLog, 'id' | 'createdAt'>) => void;
  updateLog: (id: string, updates: Partial<MatchaLog>) => void;
  deleteLog: (id: string) => void;
}

export const MatchaContext = createContext<MatchaContextType | undefined>(undefined);

interface MatchaProviderProps {
  children: ReactNode;
}

export const MatchaProvider = ({ children }: MatchaProviderProps) => {
  const [logs, setLogs] = useState<MatchaLog[]>([]);

  useEffect(() => {
    storageLoad().then(setLogs);
  }, []);

  useEffect(() => {
    storageSave(logs);
  }, [logs]);

  const addLog = (log: Omit<MatchaLog, 'id' | 'createdAt'>) => {
    setLogs(prev => [{
      ...log,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    }, ...prev]);
  };

  const updateLog = (id: string, updates: Partial<MatchaLog>) => {
    setLogs(prev => prev.map(log => log.id === id ? { ...log, ...updates } : log));
  };

  const deleteLog = (id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  };

  return (
    <MatchaContext.Provider value={{ logs, addLog, updateLog, deleteLog }}>
      {children}
    </MatchaContext.Provider>
  );
};

// Custom hook for easy access
export const useMatcha = () => {
  const context = React.useContext(MatchaContext);
  if (!context) {
    throw new Error('useMatcha must be used within MatchaProvider');
  }
  return context;
};
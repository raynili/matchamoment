import AsyncStorage from '@react-native-async-storage/async-storage';
import { MatchaLog } from '../types';

const STORAGE_KEY = '@matcha_logs';

export const storageSave = async (logs: MatchaLog[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
};

export const storageLoad = async (): Promise<MatchaLog[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { authService } from '../services/authService';

export const useDebugAuth = () => {
  const authState = useSelector((state: RootState) => (state as any).auth);
  
  const getAllUsers = () => {
    return authService.getAllUsers();
  };
  
  const clearAllUsers = () => {
    authService.clearUsers();
  };
  
  return {
    authState,
    getAllUsers,
    clearAllUsers,
  };
};
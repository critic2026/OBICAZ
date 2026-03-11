import { useUser } from '../context/UserContext';
import t from './translations';

export function useT() {
  const { preferredLanguage } = useUser();
  return t[preferredLanguage];
}

import { createContext, useContext, useState, ReactNode } from 'react';

type UserStatus = 'guest' | 'registered' | 'verified';
export type PreferredLanguage = 'fr' | 'nl';

interface UserContextType {
  userStatus: UserStatus;
  setUserStatus: (status: UserStatus) => void;
  preferredLanguage: PreferredLanguage;
  setPreferredLanguage: (lang: PreferredLanguage) => void;
}

// Provide sensible defaults so components never crash when rendered outside the provider
const UserContext = createContext<UserContextType>({
  userStatus: 'guest',
  setUserStatus: () => {},
  preferredLanguage: 'fr',
  setPreferredLanguage: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userStatus, setUserStatus] = useState<UserStatus>('guest');
  const [preferredLanguage, setPreferredLanguage] = useState<PreferredLanguage>('fr');

  return (
    <UserContext.Provider value={{ userStatus, setUserStatus, preferredLanguage, setPreferredLanguage }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

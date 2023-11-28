import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [responseData, setResponseData] = useState(null);

  const setResponse = (data) => {
    setResponseData(data);
  };

  return (
    <AuthContext.Provider value={{ responseData, setResponse }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

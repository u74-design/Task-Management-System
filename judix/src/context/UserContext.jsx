import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserData = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
  try {
    await axios.post("http://localhost:3001/logout", {}, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  } finally {
    setUser(null);
  }
};
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/me", {
          withCredentials: true,
        });

        if (res.data.loggedIn) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

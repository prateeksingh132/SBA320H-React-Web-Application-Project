import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // logic: using reactcookie for jwt implementation like in the warmup excercise we did in class
    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // logic: check if we already have a token when the app loads so the user stays logged in
        if (cookies.jwt_token) {
            ////////////TESTING
            // console.log('TESTING: found jwt token in cookies');
            ////////////
            setUser({ username: 'admin' });
        }
    }, [cookies]);

    const login = (username, password) => {
        ////////////TESTING
        // console.log('TESTING: logging in with: ', username);
        ////////////

        // logic: faking an api call that returns a jwt token
        setCookie('jwt_token', 'fake-jwt-token-12345', { path: '/' });
        setUser({ username });
    };

    const logout = () => {
        removeCookie('jwt_token', { path: '/' });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


////// BUG: cookie do not persists on reload
// FUTUREWORK: check this later, user is supposed to be logged in when refresh is done, but it seems user is logged out..find out why later..
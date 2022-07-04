import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
// import { AuthContext } from '../AuthContext/AuthContext';
// import { AuthContext } from "../Contexts/AuthContext";

const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;
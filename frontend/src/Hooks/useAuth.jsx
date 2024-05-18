import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Components/store/slices/AuthSlice.js';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.CurrentUser.CurrentUser);

  

  useEffect(() => {
    const cookies = document.cookie.split(';');
    console.log(cookies);
    let token = '';

    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name === 'token') {
        token = value;
      }
    });

    if (!token && user) {
      dispatch(setCurrentUser(null));
      navigate('/');
    }

    if (token) {
        console.log('token found');
      const tokenExpiration = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
      if (tokenExpiration < new Date()) {
        dispatch(setCurrentUser(null));
        navigate('/login'); 
      }
    }

  }, []);
};

export default useAuth;

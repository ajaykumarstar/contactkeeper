import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { resetP, error, clearErrors, isSent } = authContext;

  let query = useQuery();

  useEffect(() => {

    if(!isSent) {
      let resetlink = query.get("q");
      resetP({resetlink});
      }

    if(isSent) {

      if (error === 'Password Reset Link is invalid.') {
        setAlert(error, 'danger', 20000);
        clearErrors();
        props.history.push('/login');
  
      }
    
     // props.history.push('/login');
    }

    

    
    // eslint-disable-next-line
  }, [error, isSent, props.history]);

  const [user, setUser] = useState({
    newp: '',
    confirmp: ''
  });

  const { newp, confirmp } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (newp === '' || confirmp === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      

    }
  };

     

  return (
    <div className='form-container'>
      <h1>
        Reset <span className='text-primary'>Password</span>
      </h1>
      <form onSubmit={onSubmit} >
        <div className='form-group'>
          <label htmlFor='newp'>New Password</label>
          <input
            id='newp'
            type='password'
            name='newp'
            value={newp}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmp'>Confirm Password</label>
          <input
            id='confirmp'
            type='password'
            name='confirmp'
            value={confirmp}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Submit'
          className='btn btn-success btn-block'
        />
      </form>
    </div>
  );

};

export default ResetPassword;
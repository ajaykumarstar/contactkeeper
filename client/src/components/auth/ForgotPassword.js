import React, {Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const ForgotPassword = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { forgotP, error, clearErrors, isSent, user, loadUser } = authContext;
  const { abc } = 'abcd';

  useEffect(() => {
   if (isSent) {
    //  props.history.push('/');
    setAlert('Password reset link is sent to your email address', 'primary');
  }

    if (error === 'Password reset link is sent to your email address') {
      setAlert(error, 'primary', 30000);
      clearErrors();
    }

  
    // eslint-disable-next-line
  }, [error, isSent, props.history]);

  const [user1, setUser1] = useState({
    email: ''
  });

  const [logincrd, setlogincrd] = useState({
    email: 'testlogin3@email.com',
    password: 'testlogin@123',
    resetlink: 'RwImCqtwiwajj4sqSctppB8qh2jzpHbz'
  });

  const { email } = user1;

  const onChange = e => setUser1({ ...user1, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
     forgotP({email});
     //setAlert('Password reset link is sent to your email address', 'primary', 30000);

    

    }
  };

     

  return (
    <div className='form-container'>
      <h1>
        Forgot <span className='text-primary'>Password</span>
      </h1>
      <ul>
      <Fragment>
      <li>Hello {user && user.name}</li>
    </Fragment>
       </ul>
      <form onSubmit={onSubmit} >
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
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

export default ForgotPassword;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import False from '../images/False.svg';
import LoginForm from './LoginForm';

function Login({ handleLogin, setStatus, handleInfoTooltip }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        setFormValue({ email: '', password: '' });
        handleLogin();
        
        navigate('/', { replace: true });
        localStorage.setItem('email', formValue.email);
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
        setStatus({
          image: False,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  };

  return (
    <section className='auth'>
      <h3 className='auth__title'>Вход</h3>
      <LoginForm
        submitText='Войти'
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
      />
    </section>
  );
}

export default Login;

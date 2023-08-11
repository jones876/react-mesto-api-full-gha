import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import True from '../images/True.svg';
import False from '../images/False.svg';
import LoginForm from './LoginForm';
function Register({ handleInfoTooltip, setStatus }) {
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
    auth
      .register(formValue.email, formValue.password)
      .then(() => {
        handleInfoTooltip();
        setStatus({
          image: True,
          text: 'Вы успешно зарегистрировались!',
        });
        navigate('/sign-in', { replace: true });
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
      <h3 className='auth__title'>Регистрация</h3>

      <LoginForm
        submitText='Зарегистрироваться'
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formValue={formValue}
      />
      <div className='auth__wrap'>
        <p className='auth__text'>Уже зарегистрированы?</p>
        <Link to='/signin' className='auth__link'>
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;

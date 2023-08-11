function LoginForm({ submitText, handleSubmit, handleChange, formValue }) {
  return (
    <form className='auth__form' onSubmit={handleSubmit}>
      <input
        className='auth__input'
        name='email'
        type='email'
        placeholder='Email'
        value={formValue.email}
        onChange={handleChange}
        required
      ></input>
      <input
        className='auth__input'
        type='password'
        name='password'
        placeholder='Пароль'
        value={formValue.password}
        onChange={handleChange}
        required
      ></input>
      <button
        className='auth__submit-btn'
        type='submit'
        onSubmit={handleSubmit}
      >
        {submitText}
      </button>
    </form>
  );
}
export default LoginForm;

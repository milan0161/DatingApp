import { useAppDispatch } from '../../../app/hooks/hooks';
import { useRegisterMutation } from '../../account/api/accountApi';
import React from 'react';
import { onLogin } from '../../account/state/accountSlice';
import { showApiError, showSucces } from '../../../app/utils/ToastMsg';
import { useForm } from 'react-hook-form';
import { saveToken } from '../../../app/utils/saveToken';
import { decodedAToken } from '../../../app/utils/decodeTokens';
import { useNavigate } from 'react-router-dom';

type RegisterFormProps = {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  knownAs: string;
  city: string;
  country: string;
  dateOfBirth: string;
};

const RegisterForm = ({ setRegister }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const { register, handleSubmit, formState, watch } = useForm<FormValues>({
    defaultValues: {
      gender: 'male',
    },
  });
  const { errors } = formState;

  const registerHandler = (data: FormValues) => {
    console.log(data);

    registerUser(data)
      .unwrap()
      .then((data) => {
        const decodedToken = decodedAToken(data.token);
        saveToken(data.token, decodedToken!.exp);
        showSucces('You have successfully registered');
        dispatch(onLogin(data));
        navigate('/members');
      })
      .catch((err) => showApiError(err));
  };

  return (
    <form
      className=" flex flex-col gap-3 w-[350px] mx-auto my-10"
      onSubmit={handleSubmit(registerHandler)}
    >
      <h2 className="text-blue-600 text-[35px] text-center mb-2">Sign up</h2>
      <hr />
      <div>
        <label className="font-bold">I am a: </label>
        <label className="m-1">
          <input
            className=" accent-purple-500"
            type="radio"
            {...register('gender')}
            value={'male'}
          />{' '}
          Male
        </label>
        <label className="m-1">
          <input
            className=" accent-orange-600"
            type="radio"
            {...register('gender')}
            value="female"
          />{' '}
          Female
        </label>
      </div>
      <div className="">
        <input
          className={
            errors.username
              ? 'register_input validation_invalid'
              : 'register_input'
          }
          // ref={usernameRef}
          type="text"
          placeholder="Username"
          {...register('username', {
            required: 'Username is required',
          })}
        />
        {errors.username && (
          <p className="validation_error">{errors.username?.message}</p>
        )}
      </div>
      <div className="">
        <input
          className={
            errors.knownAs
              ? 'register_input validation_invalid'
              : 'register_input'
          }
          type="text"
          placeholder="Known As"
          {...register('knownAs', {
            required: 'Known As is required',
          })}
        />
        {errors.knownAs && (
          <p className="validation_error">{errors.knownAs?.message}</p>
        )}
      </div>
      <div className="">
        <input
          className={
            errors.dateOfBirth
              ? 'register_input validation_invalid'
              : 'register_input'
          }
          type="date"
          placeholder="Date of Birth"
          {...register('dateOfBirth', {
            // valueAsDate: true,
            required: 'Date of Birth is required',
            validate: (value) => {
              const maxDate = new Date();
              maxDate.setFullYear(maxDate.getFullYear() - 18);
              const maxDateAsString = maxDate.toISOString();
              if (value >= maxDateAsString) {
                return 'You must be at least 18 years old';
              }
            },
          })}
        />
        {errors.dateOfBirth && (
          <p className="validation_error">{errors.dateOfBirth?.message}</p>
        )}
      </div>
      <div className="">
        <input
          className={
            errors.city ? 'register_input validation_invalid' : 'register_input'
          }
          type="text"
          placeholder="City"
          {...register('city', {
            required: 'City is required',
          })}
        />
        {errors.city && (
          <p className="validation_error">{errors.city?.message}</p>
        )}
      </div>
      <div className="">
        <input
          className={
            errors.country
              ? 'register_input validation_invalid'
              : 'register_input'
          }
          type="text"
          placeholder="Country"
          {...register('country', {
            required: 'Country is required',
          })}
        />
        {errors.country && (
          <p className="validation_error">{errors.country?.message}</p>
        )}
      </div>
      <div>
        <input
          className={
            errors.password
              ? 'register_input validation_invalid'
              : 'register_input'
          }
          // ref={passwordRef}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Password must contain minimum 4 characters',
            },
            maxLength: {
              value: 8,
              message: 'Password must contain maximum 8 characters',
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="validation_error">{errors.password?.message}</p>
        )}
      </div>
      <div>
        <input
          className={
            errors.confirmPassword
              ? 'register_input validation_invalid'
              : 'register_input'
          }
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm password is required',
            },
            validate: (value) => {
              if (watch('password') !== value) {
                return 'Your password does not match';
              }
            },
          })}
          // ref={passwordRef}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="validation_error">{errors.confirmPassword?.message}</p>
        )}
      </div>
      <div className="flex justify-center gap-2">
        <button
          // disabled={!isValid}
          type="submit"
          className="bg-green-700 text-white px-2 py-1 rounded disabled:bg-green-400"
        >
          Register
        </button>
        <button type="button" onClick={() => setRegister(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

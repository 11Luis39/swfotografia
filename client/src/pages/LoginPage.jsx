import { useForm } from 'react-hook-form';
import { useAuth } from '../context/Auth.Context';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const roles = await signin(data);

    if (roles.includes('Organizador')) {
      navigate('/eventos');
    } else if (roles.includes('Fotografo')) {
      navigate('/fotografos');
    } else if (roles.includes('Invitado')) {
      navigate('/Invitados');
    }
  }




  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-2xl font-bold'> Login </h1>
          <input type="email" {...register("email", { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email" />

          <input type="password" {...register("password", { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña" />

          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
          <p className='flex gap-x-2 justify-between'>
            No tienes una cuenta? <Link to="/register"
              className='text-sky-500'>Registrate</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getRoles, registerRequest } from '../api/auth';
import { useAuth } from '../context/Auth.Context'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [roles, setRoles] = useState([]);
    const { signup, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();



    useEffect(() => {
        const loadRoles = async () => {
            const rolesData = await getRoles();
            setRoles(rolesData);
        };

        loadRoles();
    }, []);

    useEffect(() => {
        if (isAuthenticated && user && user.roles) {
            console.log(user.roles);
            if (user.roles.includes('Organizador')) {
                navigate('/eventos');
            } else if (user.roles.includes('Fotografo')) {
                navigate('/fotografos');
            } else if (user.roles.includes('Invitado')) {
                navigate('/invitados');
            }
        }
    }, [isAuthenticated, user, navigate]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        console.log(FormData)
        if (data.roles) {
            formData.append('roles', data.roles);
        }

        if (data.profilePictures && data.profilePictures.length) {
            for (const file of data.profilePictures) {
                formData.append('profilePictures', file[0]);
            }
        }
        try {

            await signup(formData);
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };


    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username", { required: true })}
                    className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username" />

                <input type="email" {...register("email", { required: true })}
                    className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Email" />

                <input type="password" {...register("password", { required: true })}
                    className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Contraseña" />

                <select {...register("roles")}
                    className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2">
                    <option value="">Selecciona un rol</option>
                    {roles.map(role => (
                        <option key={role._id} value={role.name}>{role.name}</option>
                    ))}
                </select>

                {[...Array(3).keys()].map(index => (
                    <input key={index} type="file" {...register(`profilePictures[${index}]`)}
                        className="w-full text-white px-4 py-2 my-2"
                        accept="image/*" />
                ))}

                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
                    Registrarse
                </button>
                <p className='flex gap-x-2 justify-between'>
                    ya tienes una cuenta? <Link to="/login"
                        className='text-sky-500'>Inicia Sesion</Link>
                </p>
            </form>
        </div>
    );
}




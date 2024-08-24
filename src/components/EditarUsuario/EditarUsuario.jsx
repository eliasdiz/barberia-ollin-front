import React, { useEffect, useState } from 'react'
import actionsUsuarios from '../../Store/Usuarios/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Switch, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { urlLocal } from '../../urlHost'
import toast, { Toaster } from 'react-hot-toast'


const { getUsuario, getTodos } = actionsUsuarios

export default function EditarUsuario() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector(store => store.captureId.id)
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    const usuario = usuarios?.find( item => item._id === id)
    const [ nombres, setNombres ] = useState('') 
    const [ apellidos, setApellidos ] = useState('') 
    const [ email, setEmail ] = useState('')
    const [ telefono, setTelefono ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ barbero, setBarbero ] = useState(usuario?.barbero)


    const handleCancelar = () => {
        navigate('/admin/usuarios')
    }

    const handleEditar = () => {
        let token = localStorage.getItem('token')
        let headers = { headers: { Authorization: `Bearer ${token}`}}
        let data = {
            nombres: nombres || usuario.nombres,
            apellidos: apellidos || usuario.apellidos,
            email: email || usuario.email,
            telefono: Number(telefono) || usuario.telefono,
            barbero: barbero,
        }
        password === '' ? data : data.password = password
        // console.log(data)
        let promesa = axios.put(`${urlLocal}usuarios/usuario/${id}`,data,headers)
        toast.promise(
            promesa,
            {
                loading: 'editando usuario',
                success: (res) => {
                    setTimeout(() => {
                        navigate('/admin/usuarios')
                        dispatch(getTodos({parametro: '', nombres: ''}))
                    }, 2500);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    return <>{error.response.data.message}</>
                }
            },
            {
                success: { duration: 1500},   
                style: { 
                    background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'
                }
            }
        )

    }


    useEffect(
        () => {
            dispatch(getUsuario())
            !usuario || !id ? navigate('/admin/usuarios') : null 
        },
        [dispatch]
    )

    return (
        <>
            {
                usuario ? 
                <>
                    <div className='flex justify-center'>
                        <div 
                            className='w-full bg-blue-gray-400 p-4 rounded-xl md:w-[60%]'
                        >
                            <div className='p-3'>
                                <Typography variant='h5' className='text-center capitalize text-white'>
                                    editar usuario
                                </Typography>

                                <Typography variant='lead' className='text-center capitalize '>
                                    {usuario.nombres} {usuario.apellidos}
                                </Typography>
                            </div>


                            <div className='flex flex-wrap justify-center gap-5 p-4 '>

                                <div className='xxsm:w-full w-[45%]  capitalize '>
                                    <Input
                                        color='white'
                                        label='nombre'
                                        defaultValue={usuario.nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='apellidos'
                                        defaultValue={usuario.apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='email'
                                        defaultValue={usuario.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='telefono'
                                        type='number'
                                        defaultValue={usuario.telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%] flex justify-around  capitalize'>
                                    <div className='flex flex-col items-center '>
                                        <Typography 
                                            variant="lead"
                                            className='capitalize'
                                            color='white'
                                        >
                                            barbero
                                        </Typography>
                                        <Switch
                                            color='blue'
                                            defaultChecked={usuario.barbero ? true : false}
                                            onChange={(e) => setBarbero(e.target.checked)}
                                        />
                                    </div>

                                    <Button
                                        size='sm'
                                        color='red'
                                        variant='gradient'
                                        onClick={handleCancelar}
                                    >
                                        cancelar
                                    </Button>

                                    <Button
                                        size='sm'
                                        color='green'
                                        onClick={handleEditar}
                                    >
                                        editar
                                    </Button>


                                </div>
                            </div>
                        </div>
                    <Toaster />
                    </div>
                </>
                :
                <></>
            }
        </>
    )
}

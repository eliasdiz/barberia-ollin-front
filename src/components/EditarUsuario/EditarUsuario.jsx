import React, { useEffect } from 'react'
import actionsUsuarios from '../../Store/Usuarios/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Switch, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'


const { getUsuario, getTodos } = actionsUsuarios

export default function EditarUsuario() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector(store => store.captureId.id)
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    const usuario = usuarios?.find( item => item._id === id)

    const handleCancelar = () => {
        navigate('/admin/usuarios')
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
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='apellidos'
                                        defaultValue={usuario.apellidos}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='email'
                                        defaultValue={usuario.email}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='telefono'
                                        defaultValue={usuario.telefono}
                                    />
                                </div>

                                <div className='xxsm:w-full w-[45%]  capitalize'>
                                    <Input
                                        color='white'
                                        label='password'
                                        defaultValue={usuario.password}
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
                                    >
                                        editar
                                    </Button>


                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <></>
            }
        </>
    )
}

import React from 'react'


export default function InputTexto(props) {
    return (
    <>
        <div className="flex flex-col mb-6">
            <label htmlFor="text" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">{props.name}</label>
            <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    {props.icono}
                    {/* <TbAbc className='w-7 h-7' />    */}
                </div>
                <input
                ref={props.parentRef}
                type={props.tipo}
                placeholder={props.placeHold}      
                className="sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 " 
                />
            </div>
        </div>
    </>
    )
}

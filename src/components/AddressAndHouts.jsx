import React from 'react'


function AddressAndHouts() {
  return (
    <div className='flex justify-center text-white mt-10 md:hidden' >
    <div className="text-center">
            <h2 className="font-bold text-2xl pb-2">Dirección</h2>
            <p className="pb-2">Cra. 16a #41-04, Montería, Córdoba</p>
            <iframe
                className="rounded-lg xxsm:w-80"
                title="Ubicación de Barberia Ollin"
                width="500"
                height="400"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3943.3430502813408!2d-75.8690719!3d8.7537574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2f3b2645fae7%3A0xa18047bd9380ea9b!2sBarberia%20Ollin!5e0!3m2!1sen!2sco!4v1700339914566!5m2!1sen!2sco"
            ></iframe>
            <div
                className="flex justify-evenly mt-10 items-center"
            >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWxJREFUSEvFVYttQjEMvJukZZKWSVomKZ2kbFKYpGzi6p7syC8vH5CKGgkFgePz+S4O8eDFB+fHFMDMXgG8ANCuzxXA2fcLSX3vri6AmT0D+PKkoxwC3JPUvllNADP7AHD0aB08AViqdWAxeQLwDkCFLDEkP2uEDUCV/Ng6FEkc7C0Vs4lfAfiBH08g2sP+JiAx+nYmh3yuBlCQgkX3UNM1M9NvJEfMryR3cbYEmpn6KVFXARlkApBNUdhngBC22/cRgApJ+pUcGUDVi4V6KNds1g0AocWZ5H5pZxJK4ormrufpANhY0TVJJilt/lMAb9PKCBkgHHSzPRsuC6MUF94l8mwwzkQulyX7eJa0snF0oRglM8g+bl60EZiZhQuLg1YucoEEEqOia9dG74O9/lpp2LryIZSCh8OuulzN+BaAWOQJGQ/MxR8aJVKMHqEY191i/ufBqea9qo2K1Wutwmo20qdv8j02bcU+HOAXvmrVGU8PvfYAAAAASUVORK5CYII=" />
                <p className="">Abierto hoy 08:30 AM - 08:00 PM</p>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAK5JREFUSEvtk9ENgzAMRO82KZvQUTpJu0lhElZhE1cnpRKkSWwqIbVS+EFCznv2mRAnPzyZjy5wE+4R/XhEZnYHMJNcS62a2QXASHKqjVJdcoI/AAh+zSUJ/pQAwK0maQnU3QJA750kg68kh8MT6EAC7SQJ9O68CVetew8KEk2jWFx4SFCYRJ9C8LAgk6CVeb4LN6LtAcVV+2W/WrJ7TQMFhyYI8D5KusBN7f8jegHXUToZ2Xag4AAAAABJRU5ErkJggg==" />
            </div>
            <div className='flex justify-center'>
            <table className="mt-5 text-white">
            <thead>
            <tr>
                <th>Día</th>
                <th>Apertura</th>
                <th>Cierre</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Lunes</td>
                <td className="px-10 py-2">10:00 AM</td>
                <td>08:00 PM</td>
            </tr>
            <tr>
                <td>Martes</td>
                <td className="px-5 py-2">10:00 AM</td>
                <td>08:00 PM</td>
            </tr>
            <tr>
                <td>Miercoles</td>
                <td className="px-5 py-2">10:00 AM</td>
                <td>08:00 PM</td>
            </tr>
            <tr>
                <td>Jueves</td>
                <td className="px-5 py-2">10:00 AM</td>
                <td>08:00 PM</td>
            </tr>
            <tr>
                <td>Viernes</td>
                <td className="px-5 py-2">10:00 AM</td>
                <td>08:00 PM</td>
            </tr>
            <tr>
                <td>Sabado</td>
                <td className="px-5 py-2">10:00 AM</td>
                <td>08:00 PM</td>
            </tr>
            </tbody>
            </table>
            </div>
    </div>
    </div>
  )
}

export default AddressAndHouts
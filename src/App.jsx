import './App.css'
import Carousel from './components/Carousel'

function App() {
  return (
    <>
      <div>
      <header className="h-[50vh] flex justify-center mt-10">
      <div className=' flex justify-center items-center w-1/4 bg-white mr-5 rounded-lg'>
        <h1 className='font-bold text-2xl'> Logo Barberia Ollin</h1>
      </div>
        <Carousel/>
      </header>
      </div>
    </>
  )
}

export default App

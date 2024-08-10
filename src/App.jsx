
import Videouploder from "./componets/videouploder"
import toast, { Toaster } from 'react-hot-toast';



function App() {

  return (
    <>
      <Toaster />
      <div className=' space-y-5 flex flex-col py-9 '>
        <Videouploder />
      </div>
    </>
  )
}

export default App

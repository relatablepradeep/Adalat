import {Outlet} from 'react-router-dom'
import Navbar from './Components/Headers/Navbar'
import Footer from './Components/Footer/Footer'
import Text from './Components/Highlight/Highlight'
import Lang from './Components/Global/Lang'

export default function Root(){

    return(


        <>

<div className="flex flex-col min-h-screen">
      <Navbar />
      <Text/>
      <Lang/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
        
        
        </>

        
    )
}
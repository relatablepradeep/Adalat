import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import Root from './Root'
import Home from './Components/Adalat/Home'
import Laws from './Components/Apka-adhikar/Laws';
import Courts from './Components/Nearby/Courts';
import Ques from './Components/Sawal-Jawab/Ques';
import Story from './Components/Haq-ki-khaniay/Story';
import Ngo from './Components/Ngo/Ngo'
import News from './Components/Laws/News';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path='/Laws' element={<Laws />} />
      <Route path='/kanooni-madad/courts' element={<Courts/>}/>
      <Route path='/kanun-seekho/sawal-jawab' element={<Ques/>}/>
      <Route path='kanun-seekho/scenarios' element={<Story/>}/>
      <Route path="/kanooni-madad/aid" element={<Ngo/>}/>
      <Route path="/kanooni-khabrein/laws" element={<News/>}/>

      
  

      



    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />

);

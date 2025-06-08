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
import Translate from './Components/Translator/TranslateText';
import Blog from './Components/naya-samuday/Blog';
import Lawyer from './Components/Lawyer/Lawyer';
import Ruling from './Components/Courts/Ruling';
import Schemes from './Components/Schemes/Schemes';
import Bot from './Components/Naya-bot/Bot';
import Game from './Components/Game/Game';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path='/Laws' element={<Laws />} />
      <Route path='/kanooni-madad/courts' element={<Courts/>}/>
      <Route path='/kanun-seekho/sawal-jawab' element={<Ques/>}/>
      {/* <Route path="/tax-laws" element={} */}
      <Route path='kanun-seekho/scenarios' element={<Story/>}/>
      <Route path="/kanooni-madad/aid" element={<Ngo/>}/>
      <Route path="/kanooni-khabrein/laws" element={<News/>}/>
      <Route path='/Translate' element={<Translate/>}/>
      <Route path='community' element={<Blog/>}/>
      <Route path="kanooni-madad/lawyers" element={<Lawyer/>}/>
      <Route path="kanooni-khabrein/rulings" element={<Ruling/>}/>
      <Route path="kanooni-khabrein/Schemes" element={<Schemes/>}/>
      <Route path="bot" element={<Bot/>}/>
      <Route path="/kanun-seekho/gamified" element={<Game/>}/>


      
  

      



    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />

);

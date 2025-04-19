import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import Root from './Root'
import Home from './Components/Adalat/Home'
import Laws from './Components/Apka-adhikar/Laws';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path='/Laws' element={<Laws />} />
  

      



    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />

);

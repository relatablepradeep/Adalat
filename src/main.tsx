
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import Root from './Root.tsx';
import Home from './components/home/Home.tsx'





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
     



    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />

);

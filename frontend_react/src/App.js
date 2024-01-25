import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutSite from "./layouts/LayoutSite";
import LayoutAdmin from "./layouts/LayoutAdmin";
import AppRouter from "./router";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutSite />}>
        {AppRouter.RouterSite.map(function(route,index){
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />
        })}
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        {AppRouter.RouterAdmin.map(function(route,index){
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />
        })}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
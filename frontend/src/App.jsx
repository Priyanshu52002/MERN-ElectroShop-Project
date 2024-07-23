import { Route,Routes } from "react-router-dom"
import Admin from "./pages/Admin"
import EditProduct from "./pages/EditProduct"
import DeleteProduct from "./pages/DeleteProduct"
import CreateProduct from "./pages/CreateProduct"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Shop from "./pages/Shop"
import Success from "./pages/Success"
import Cancel from "./pages/Cancel"
import Login from "./pages/Login"
import Register from "./pages/Register"


function App() {
  return (<>
  <Routes>
  <Route path='/admin/*' element={<AdminRoutes/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/success' element={<Success/>}/>
    <Route path='/cancel' element={<Cancel/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>
    </>
  )
}
const AdminRoutes=()=>{
  return(
  <Routes>
    <Route path="/" element={<Admin/>}></Route>
    <Route path='/product/create' element={<CreateProduct/>}/>
    <Route path='/product/edit/:id' element={<EditProduct/>}/>
    <Route path='/product/delete/:id' element={<DeleteProduct/>}/>
  </Routes>
  )
}
export default App

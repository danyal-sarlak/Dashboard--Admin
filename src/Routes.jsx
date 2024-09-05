import Products from "./pages/Products";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Offs from "./pages/Offs";
import Login from "./pages/Login"; 
import Home from "./pages/Home";
import Signup from './pages/Signup'
import Page404 from "./pages/Page404";

const routeList = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "products", element: <Products /> },
      { path: "comments", element: <Comments /> },
      { path: "users", element: <Users /> },
      { path: "orders", element: <Orders /> },
      { path: "offs", element: <Offs /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/*",
    element: <Page404 />,
  },
];

export default routeList;


import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import  {Provider}  from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import {
  AddPost,
  AllPosts,
  AuthLayout,
  EditPost,
  Login,
  Post,
  SignupForm,
} from "./components/index.js";

console.log("Store detailes", store)

const router = createBrowserRouter([
  {
    path: "/megablog/",
    element: <App />,
    children: [
      {
        path: "/megablog/home",
        element: <Home />,
      },
      {
        path: "/megablog/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/megablog/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupForm />
          </AuthLayout>
        ),
      },
      {
        path: "/megablog/all-posts",
        element: (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/megablog/add-post",
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/megablog/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/megablog/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);

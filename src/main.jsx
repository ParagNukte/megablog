import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
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
import NotFound from "./pages/NotFound.jsx";

console.log("Store detailes", store);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "signup",
          element: (
            <AuthLayout authentication={false}>
              <SignupForm />
            </AuthLayout>
          ),
        },
        {
          path: "all-posts",
          element: (
            <AuthLayout authentication={true}>
              <AllPosts />
            </AuthLayout>
          ),
        },
        {
          path: "add-post",
          element: (
            <AuthLayout authentication={true}>
              <AddPost />
            </AuthLayout>
          ),
        },
        {
          path: "edit-post/:slug",
          element: (
            <AuthLayout authentication={true}>
              <EditPost />
            </AuthLayout>
          ),
        },
        {
          path: "post/:slug",
          element: <Post />,
        },
        {
          path: "*",
          element: <NotFound />, // Add a NotFound component to handle 404 errors
        },
      ],
    },
  ],
  { basename: "/megablog" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);

console.log("Router configuration", router);

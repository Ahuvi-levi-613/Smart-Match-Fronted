import { createBrowserRouter, RouterProvider, Navigate } from "react-router"
import { HomePage } from "../pages/HomeManPage"
import { ProductsPage } from "../pages/ProductsPage"
import { AuthPage } from "../pages/AuthPage"
import { LoginPage } from "../pages/LoginPage"
import { SignUpPage } from "../pages/SignUpPage"
import { Layout } from "../layouts/Layout"
import { Paths } from "./paths"
import AuthGuard from "../auth/AuthGuard"
import GuestGuard from "../auth/guestGuard"
import { RoleType } from "../types/user.types"

const Router = () => {
    const router = createBrowserRouter([
        {
            element: <Layout />,
            // element: <AuthGuard ><Layout /></AuthGuard>,
            children: [
                {
                    path: Paths.home,
                    element: <HomePage />
                },
                {
                    path: Paths.products,
                    element: <AuthGuard roles={[RoleType.Admin]} ><ProductsPage  /></AuthGuard>
                },
            ]
        },
        {
            path: '*',
            element: <h1>404 Not Found</h1>
        },
        {
            path: 'auth',
            element: <GuestGuard><AuthPage /></GuestGuard>,
            children: [
                {
                    path: Paths.login,
                    element: <LoginPage />,
                },
                {
                    path: 'sign-up',
                    element: <SignUpPage />,
                }
            ]
        },
        {
            index: true,
            element: <Navigate to='/home' />
        },
    ])

    return <RouterProvider router={router} />
}

export default Router
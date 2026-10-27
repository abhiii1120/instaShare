import { createBrowserRouter } from "react-router";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";
import GuestRoute from "../components/common/GuestRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
	{
		element: <GuestRoute />,
		children: [
			{
				element: <AuthLayout />,
				children: [
					{
						path: "/login",
						element: <Login />,
					},
					{
						path: "/register",
						element: <Register />,
					},
				],
			},
		],
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				element: <MainLayout />,
				children: [
					{
						path: "/",
						element: <Home />,
					},
				],
			},
		],
	},
]);
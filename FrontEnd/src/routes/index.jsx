import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from './../pages/RegisterPage/index';
import { DashboardPage } from './../pages/DashboardPage/index';
import { PrivateRoutes } from './PrivateRoutes/index';
import { ContactsProvider } from "../providers/contactsProvider";

export const RoutesMain = () => {
    
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoutes />}>
                {<Route path="/dashboard" element={<ContactsProvider ><DashboardPage/> </ContactsProvider>} />}
            </Route>
        </Routes>
    )
}

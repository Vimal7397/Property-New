import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import HomePage from './page';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';
const MainLayout = ({children}) => {
    return(
        <AuthProvider>
            <GlobalProvider>
    <html>
        <body>
            <main>
                <Navbar />
        {children}
            </main>
            <Footer />
            <ToastContainer/>
        </body>
    </html>
    </GlobalProvider>
    </AuthProvider>
    );
    };
    
    export default MainLayout;
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

import logo from "./assets/image/NEWRR_Logo.png";
import { navigation} from "./constants/constant.js";

import Button from "./Button.js"
import MenuSvg from "./assets/svg/MenuSvg.js"

import AuthService from '../../services/AuthService.js';

const Header = () => {
    const pathname = useLocation();
    const [openNavigation, setOpenNavigation] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    const handleClick = () => {
        if (!openNavigation) return;
        enablePageScroll();
        setOpenNavigation(false);
    };

    const handleLogout = () => {
        AuthService.logout();
        setIsAuthenticated(false);  // Update authentication state after logging out
    };

    return (
        <div className={`fixed top-0 left-0 w-full z-50 border-b border-n-3 lg:bg-transparent/50 bg:backdrop-blur-sm" 
        ${openNavigation ? 'bg-transparent/50' : 'bg-transparent/50 backdrop-blur-sm'}`}>

            <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg: py-4">
                <a className="block w-[5rem] xl:mr-5" href='https://www.newrr.org'>
                    <img src={logo} width={100} height={40} alt="My Website"></img>
                </a>

                <nav className={`${openNavigation ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-transparent/70 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                        {navigation.map((item) => (
                            <a key={item.id}
                                href={item.url}
                                onClick={handleClick}
                                className={`block relative font-code 
                            text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""}
                            px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-lg lg:font-semibold ${item.url === pathname.hash ? 'z-2 lg:text-n-1' : 'lg:text-n-8'}
                            lg:leading-5 xl:pl-12`}
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>

                </nav>

                {isAuthenticated ? (
                    <Button className="hidden lg:flex" onClick={handleLogout}>
                        SIGN OUT
                    </Button>
                ) : (
                    <Button className="hidden lg:flex" href='login'>
                        SIGN IN
                    </Button>
                )}

                <Button className="ml-auto lg:hidden" px='px-3' onClick={toggleNavigation}>
                    <MenuSvg openNavigation={openNavigation} />
                </Button>

            </div>

        </div>
    )
}

export default Header

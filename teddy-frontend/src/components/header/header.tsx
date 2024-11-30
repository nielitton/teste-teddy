import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { userStore } from "../../stores/users/user.store";
import { HeaderContainer, NavBar, NavBarLi, SidebarOverlay } from "./style";
import { useLocation } from "react-router-dom";
import SideBar from "../sidebar/sidebar";

function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Controla se o menu lateral está aberto
    const username = userStore((state) => state.username);
    const logout = userStore((state) => state.logout);
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        logout();
    };

    const selectedLocation = location.pathname;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Alterna o estado do sidebar
    };

    return (
        <HeaderContainer>
            <div className="menu-logo">
                <AiOutlineMenu className="menu-iconz" onClick={toggleSidebar} />
                <img className="logo-image" src="images/logo.png" alt="Logo" />
            </div>

            <NavBar className="navbar">
                <ul className="ul-nav">
                    <NavBarLi>
                        <a href="/" className={selectedLocation === "/" ? "active" : "disable"}>
                            Clientes
                        </a>
                    </NavBarLi>
                    <NavBarLi>
                        <a href="/selected-clients" className={selectedLocation === "/selected-clients" ? "active" : "disable"}>
                            Clientes selecionados
                        </a>
                    </NavBarLi>
                    <NavBarLi onClick={handleLogout}>
                        <a href="/login" className="disable">
                            Sair
                        </a>
                    </NavBarLi>
                </ul>
            </NavBar>

            <SideBar handleLogout={handleLogout} sideBarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {sidebarOpen && <SidebarOverlay onClick={toggleSidebar} />}

            <p className="user-welcome">
                Olá, <span className="span-welcome"> {username}!</span>
            </p>
        </HeaderContainer>
    );
}

export default Header;

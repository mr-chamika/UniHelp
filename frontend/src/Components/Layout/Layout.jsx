import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="c-layout">
            <TopBar />
            <SideBar />
            <div className="content"><Outlet /></div>
        </div>
    );
};

export default Layout;
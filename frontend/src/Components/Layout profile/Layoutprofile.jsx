import { Outlet } from "react-router-dom";
import TopBar from "../TopBar/TopBar";

const Layoutprofile = () => {
    return (
        <div className="c-layout">
            <TopBar />
            <div className="content"><Outlet /></div>
        </div>
    );
};

export default Layoutprofile;
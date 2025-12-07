import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        // Giả lập logout (tuỳ context bạn có thể gọi useAuth().logout())
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="layout-wrapper">
            {/* ===== Sidebar ===== */}
            <aside className={`layout-sidebar ${isSidebarOpen ? "open" : ""}`}>
                <button
                    className="layout-sb-toggle mt-1"
                    aria-label="Mở/đóng sidebar"
                    onClick={toggleSidebar}
                >
                    <i className="fa-solid fa-bars"></i>
                    <span className="layout-sb-label fw-semibold">Thu gọn / Mở rộng</span>
                </button>

                <ul className="layout-sb-menu mt-2">
                    <li>
                        <NavLink to="/departments" className={({ isActive }) => `layout-sb-link ${isActive ? "active" : ""}`}>
                            <i className="fas fa-users"></i>
                            <span className="layout-sb-label">Quản lý phòng ban</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/accounts" className={({ isActive }) => `layout-sb-link ${isActive ? "active" : ""}`}>
                            <i className="far fa-user-circle"></i>
                            <span className="layout-sb-label">Quản lý nhân viên</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>

            {/* ===== Header ===== */}
            <header
                className="layout-topbar d-flex align-items-center justify-content-between"
                style={{ marginLeft: isSidebarOpen ? "260px" : "72px" }}
            >
                <div className="layout-brand-wrap">
                    <img
                        src="https://vti.com.vn/wp-content/uploads/2025/03/Logo-white.svg"
                        alt="VTI Academy Logo"
                        style={{ height: "36px" }}
                    />
                    <h1 className="layout-greet">Quản lý nhân sự</h1>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <button className="layout-icon-btn" title="Thông báo">
                        <i className="fa-regular fa-bell"></i>
                    </button>
                    <img
                        className="layout-avatar"
                        src="https://i.pinimg.com/736x/50/70/77/5070770094960235fa3fff38e4785164.jpg"
                        alt="user"
                    />
                    <button className="layout-icon-btn" title="Logout" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </header>

            {/* ===== Content ===== */}
            <main
                className="layout-page"
                style={{ marginLeft: isSidebarOpen ? "260px" : "72px" }}
            >
                <Outlet />
            </main>

            {/* ===== Footer ===== */}
            <footer className="layout-footer">
                Copyright © 2021 VTI ACADEMY
            </footer>
        </div>
    );
};

export default MainLayout;
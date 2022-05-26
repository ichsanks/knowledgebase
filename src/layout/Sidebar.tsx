import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Button } from "components";
import { useAuthState } from "store";
import useWindowDimensions from "utils/ScreenSize";

export default function Sidebar() {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState<boolean>(width >= 1025);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(width >= 1025);
  }, [width]);

  return (
    <div id="sidebar" className={open ? "open" : "close"}>
      <h3 className="nav-brand">KNOWLEDGE BASE</h3>
      <Navigation />
      <div id="sidebar-toggle">
        <Button
          type="button"
          variant="transparent"
          aria-label="Toggle menu"
          onClick={handleClick}
        >
          <FaBars />
        </Button>
      </div>
    </div>
  );
}

const Navigation = () => {
  const { userinfo } = useAuthState();
  const { access } = userinfo;
  const isAdmin = access.some((item: string) =>
    ["KNOWLEDGE_VIEW_ALL", "KNOWLEDGE_CRUD_ALL"].includes(item)
  );
  const isInternal = access.includes("INTERNAL_USER");

  return (
    <div id="navigation">
      <NavLink
        className="nav__item"
        style={({ isActive }) => (isActive ? {} : {})}
        to="/database"
      >
        Knowledge Database
      </NavLink>
      <NavLink
        className="nav__item"
        style={({ isActive }) => (isActive ? {} : {})}
        to="/program"
      >
        Knowledge Program
      </NavLink>
      {isInternal && (
        <>
          <NavLink
            className="nav__item"
            style={({ isActive }) => (isActive ? {} : {})}
            to="/evaluation"
          >
            Evaluation
          </NavLink>
        </>
      )}
      {isAdmin && (
        <>
          <NavLink
            className="nav__item"
            style={({ isActive }) => (isActive ? {} : {})}
            to="/internship"
          >
            Internship
          </NavLink>
          <NavLink
            className="nav__item"
            style={({ isActive }) => (isActive ? {} : {})}
            to="/cost"
          >
            Biaya
          </NavLink>
        </>
      )}
    </div>
  );
};

import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/members": "Members",
  "/settings": "Settings",
};

function Header() {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-border ">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </header>
  );
}

export default Header;

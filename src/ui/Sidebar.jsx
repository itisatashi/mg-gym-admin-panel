import AdminInfo from "./AdminInfo";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <div className="bg-bg-secondary h-screen flex flex-col">
      <Logo />
      <MainNav />
      <AdminInfo />
    </div>
  );
}

export default Sidebar;

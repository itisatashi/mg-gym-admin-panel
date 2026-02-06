import AdminInfo from "./AdminInfo";
import Logo from "./Logo";
import MainNav from "./MainNav";



function Sidebar() {
  return (
    <div className="bg-bg-secondary row-span-2 flex flex-col h-full">
      <Logo />
      <MainNav />
      <AdminInfo />
    </div>
  );
}

export default Sidebar;

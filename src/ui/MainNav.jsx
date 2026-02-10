import NavItem from "./NavItem";

import {
  HiOutlineChartBarSquare,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

function MainNav() {
  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      <ul className="flex flex-col gap-2">
        <li>
          <NavItem
            to="/dashboard"
            icon={<HiOutlineChartBarSquare className="text-2xl" />}
          >
            Dashboard
          </NavItem>
        </li>
        <li>
          <NavItem
            to="/members"
            icon={<HiOutlineUserGroup className="text-2xl" />}
          >
            Members
          </NavItem>
        </li>
        <li>
          <NavItem
            to="/settings"
            icon={<HiOutlineCog6Tooth className="text-2xl" />}
          >
            Settings
          </NavItem>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

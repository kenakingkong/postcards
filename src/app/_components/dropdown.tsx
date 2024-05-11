import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export default function Dropdown({
  trigger,
  menuItems,
}: {
  trigger: React.ReactNode;
  menuItems: React.ReactNode[];
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex btn-secondary-outline">
          {trigger}
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map((item: React.ReactNode, index: number) => (
            <MenuItem key={`menu-item-${index}`}>{item}</MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}

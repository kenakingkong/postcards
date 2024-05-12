import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import IPostcard from "@/_lib/postcard/models/postcard";
import { onDelete, onToggleDisplay } from "./dropdownActions";

export default async function Dropdown({ postcard }: { postcard: IPostcard }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          title="options"
          className="text-xl px-2 rounded border-[2.5px] border-transparent hover:bd-secondary hover:bg-white data-[active]:bd-secondary data-[active]:bg-white"
        >
          ···
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded bg-white bd-secondary shadow-lg focus:outline-none divide-y">
          <MenuItem>
            <Link href={`/postcard/${postcard.id}`} className="menu-item">
              see download options
            </Link>
          </MenuItem>
          <form method="POST" action={onToggleDisplay} className="w-full">
            <MenuItem>
              <button
                type="submit"
                className="menu-item w-full cursor-disabled"
                disabled
              >
                {postcard.show_in_gallery
                  ? "hide in gallery (do not use)"
                  : "show in gallery (do not use)"}
              </button>
            </MenuItem>
          </form>
          <form method="POST" action={onDelete} className="w-full">
            <MenuItem>
              <button
                type="submit"
                className="menu-item w-full cursor-disabled"
                disabled
              >
                delete postcard (do not use)
              </button>
            </MenuItem>
          </form>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

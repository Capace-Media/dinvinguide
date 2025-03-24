"use client";

import { Search } from "@/components/icons";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { forwardRef } from "react";

const PhoneMenu = ({ menuItems }: any) => {
  return (
    <Menu as="div" className="flex lg:hidden w-[45px]">
      {({ open }) => (
        <>
          <Menu.Button
            as="button"
            aria-label="Burger menu"
            className={`nav_button relative ${open ? "click" : ""}`}
            id="nav_button"
          >
            <div className={`line`}></div>
            <div className={`line`}></div>
            <div className={`line`}></div>
          </Menu.Button>

          <Transition
            as="div"
            className={`fixed left-0 w-full h-full top-[65px] duration-75 ease-in-out `}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="pb-6 pt-8 px-4 items-start flex-col flex gap-8 bg-white shadow-xl ">
              {menuItems?.menu?.map((item: any) => {
                return (
                  <Menu.Item key={item?.id}>
                    <MyLink href={item?.uri}>{item?.label}</MyLink>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

// eslint-disable-next-line react/display-name
const MyLink = forwardRef((props: any, ref: any) => {
  let { href, children, ...rest } = props;

  return (
    <Link href={href} as={href} legacyBehavior>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

export default PhoneMenu;

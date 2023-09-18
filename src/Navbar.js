import React from "react";
import "./skeleton.css";
import "./App.css";
import Logo from './assets/logo_top.png'

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";


const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
};

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Invest", href: "/invest", current: false },
  { name: "Transactions", href: "/transactions", current: false },
  { name: "withdrawals", href: "/withdrawals", current: false },
];

const userNavigation = [
  { name: "Settings", href: "/settings" },
 
];
const userNavigation2 = [
  { name: "Sign out", href: "" },
];
const userNavigation3 = [
  { name: "Change Password", href: "/resetpassword" },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  
  const navigate = useNavigate();
  const login_status1 = sessionStorage.getItem("login_status");
  const login_status2 = localStorage.getItem("login_status");
  // console.log(login_status1, login_status2)



  const signout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  }
  return (
    // <div className="min-h-full">
    //   <div className="bg-indigo-600 pb-32">
    <Disclosure
      as="nav"
      className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <img
                    className="block h-8 w-8"
                    src={Logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden lg:ml-10 lg:block">
                  <div className="flex space-x-4">
                    <div className="hidden lg:ml-10 lg:block">
                      <div className="flex space-x-4">
                      {navigation.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.href}
                              style={({ isActive }) => { return { backgroundColor: isActive ? '  rgb(67 56 202)' : 'none' } }}
                              className={classNames(
                                item.current
                                  ? 'bg-indigo-700 text-white'
                                  : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                'rounded-md py-2 px-3 text-sm font-medium'
                              )}
                              
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </NavLink>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  {/* <div className="relative text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <input
                            id="search"
                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div> */}
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  {/* <button
                          type="button"
                          className="flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                         {userNavigation2.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a 
                                onClick={signout}
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                          {userNavigation3.map((item) => (
                          <Menu.Item key={item.name}>
                            {({  }) => (
                              <a 
                               
                                href={item.href}
                                className={classNames(
                               login_status1 !== true && login_status2 !== null ? "hidden bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-indigo-700 text-white"
                      : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-indigo-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-indigo-300">
                    {user.email}
                  </div>
                </div>
                {/* <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                  {userNavigation2.map((item) => (
                  <Disclosure.Button
                    onClick={signout}
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      login_status1 !== true && login_status2 !== null ? "block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75" : "",
                         "block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75" 
                       )}
                   
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {userNavigation3.map((item) => (
                  <Disclosure.Button
                   
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      login_status1 !== true && login_status2 !== null ? "hidden bg-gray-100" : "",
                         "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                       )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

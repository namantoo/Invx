import React from "react";
import Apiurl from "./apiurl";
import { useEffect, useState } from "react";
import CountrySelector from "./selector";
import { COUNTRIES } from "./countries";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function Registerpg4() {
  const apiu = Apiurl();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState("IN");
  const [code, setCode] = useState("");

  const tradingexp = [
    { id: 1, name: "Novice" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Experienced" },
  ];

  const portfoliosize = [
    { id: 1, name: "$0 - $10K" },
    { id: 2, name: "$10K - $100K" },
    { id: 3, name: "> $100K" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [selectedexp, setSelectedexp] = useState(tradingexp[0]);
  const [portfsize, setPortfsize] = useState(portfoliosize[0]);

  useEffect(() => {
    console.log(country);
    COUNTRIES.forEach((cntry) => {
      if (cntry.value == country) {
        // console.log(String(cntry.code));
        if (String(cntry.code) !== "undefined") {
          setCode(cntry.code);
        } else {
          setCode("");
        }
      }
    });
  }, [country]);

  function handlephoneChange() {}

  return (
    <>
      <div className="fill-window bg-gray-50">
        <div className="container">
          <div className="row h-screen">
            <div className="columns two h-full hidden sm:block" style={{}}>
              &nbsp;
            </div>
            <div className="columns eight h-full" style={{}}>
              <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Congratulations! Your account is created.
                  </h2>
                  <h3 className="mt-6 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
                    We would like to know you more!
                  </h3>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                  <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        ></label>
                        <div className={"justify-center items-center"}>
                          <div className={""}>
                            <label className="block text-sm font-medium text-gray-700">
                              Select a country
                            </label>
                            <CountrySelector
                              id={"country-selector"}
                              open={isOpen}
                              onToggle={() => setIsOpen(!isOpen)}
                              onChange={setCountry}
                              selectedValue={COUNTRIES.find(
                                (option) => option.value === country
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone number
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                            {code}
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="123-456-789"
                          />
                        </div>
                      </div>

                      <div>
                        <Listbox value={selectedexp} onChange={setSelectedexp}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                Trading Experience
                              </Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                  <span className="block truncate">
                                    {selectedexp.name}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {tradingexp.map((texp) => (
                                      <Listbox.Option
                                        key={texp.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "bg-indigo-600 text-white"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={texp}
                                      >
                                        {({ selectedexp, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                selectedexp
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {texp.name}
                                            </span>

                                            {selectedexp ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <div>
                        <Listbox value={portfsize} onChange={setPortfsize}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                How much have you invested in crypto ?
                              </Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                  <span className="block truncate">
                                    {portfsize.name}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {portfoliosize.map((pfsize) => (
                                      <Listbox.Option
                                        key={pfsize.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "bg-indigo-600 text-white"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={pfsize}
                                      >
                                        {({ portfsize, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                portfsize
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {pfsize.name}
                                            </span>

                                            {portfsize ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <div className="columns-2 items-center justify-between">
                        <div className="flex items-center">
                        <button
                          
                          className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Skip
                        </button>
                        </div>
                        <div className="flex items-center">
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Continue
                        </button>
                        </div>
                                               
                    
                      </div>

                      
                    </form>
                    
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="columns two h-full hidden sm:block" style={{}}>
              &nbsp;
            </div>
          </div>
          <div className="">&nbsp;</div>
        </div>
      </div>
    </>
  );
}

export default Registerpg4;

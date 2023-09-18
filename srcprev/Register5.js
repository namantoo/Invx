import React from "react";
import Apiurl from "./apiurl";
import { useEffect } from "react";
import $ from "jquery";

function Registerpg5() {
  const apiu = Apiurl();

  useEffect(() => {
    // Use jQuery to manipulate the DOM
    const $inp = $(".ap-otp-input");

    $inp.on({
      paste(ev) {
        // Handle Pasting

        const clip = ev.originalEvent.clipboardData.getData("text").trim();
        // Allow numbers only
        if (!/\d{6}/.test(clip)) return ev.preventDefault(); // Invalid. Exit here
        // Split string to Array or characters
        const s = [...clip];
        // Populate inputs. Focus last input.
        $inp
          .val((i) => s[i])
          .eq(5)
          .focus();
      },
      input(ev) {
        // Handle typing

        const i = $inp.index(this);
        if (this.value) $inp.eq(i + 1).focus();
      },
      keydown(ev) {
        // Handle Deleting

        const i = $inp.index(this);
        if (!this.value && ev.key === "Backspace" && i) $inp.eq(i - 1).focus();
      },
    });
  }, []);

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
                    Verify your phone no
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                  <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" action="#" method="POST">
                      <div className="w-full">
                        <div className="bg-white h-64 py-3 rounded text-center">
                          <h1 className="text-2xl font-bold">
                            OTP Verification
                          </h1>
                          <div className="flex flex-col mt-4">
                            <span>Enter the OTP you received at</span>
                            <span className="font-bold">+91-97******00</span>
                          </div>

                          <div
                            data-username="otibij"
                            data-channel="email"
                            data-nonce="0-8bf87e338f"
                            data-length="6"
                            data-form="registration"
                            className="flex flex-row justify-center text-center px-2 mt-5 ap-otp-inputs"
                          >
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="0"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="1"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="2"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="3"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="4"
                            />
                            <input
                              className="ap-otp-input m-2 border h-10 w-10 text-center form-control rounded"
                              type="tel"
                              maxlength="1"
                              data-index="5"
                            />
                          </div>

                          <div className="flex justify-center text-center mt-5">
                            <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                              <span className="font-bold">Resend OTP</span>
                              <i className="bx bx-caret-right ml-1"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="columns-2 items-center justify-between">
                        <div className="flex items-center">
                        <button
                          
                          className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Back
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

export default Registerpg5;

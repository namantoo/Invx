import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
   
    return (
        <>
             <div className="grid grid-cols-2 gap-4 h-full hidden md:flex">
                <div className=" w-[100%] h-[100vh] bg-blue-700 rounded-tr-full rounded-br-full ">
                    <div className="container py-64 ">
                        <div className="row">

                            <div className="columns two ">

                                &nbsp;
                            </div>
                            <div className="columns eight ">
                                <div className="h-32  text-white overflow-hidden align-center py-72 mb-6 text-center">
                                    <span className="text-6xl font-bold dbhead">Oops :(</span>
                                </div>
                            </div>
                            <div className="columns two ">

                                &nbsp;
                            </div>

                        </div>
                    </div>

                </div>
                <div className="container py-56">
                    <div className="row">

                        <div className="columns twelve ">
                            <div className="h-54  overflow-hidden  py-72 mb-6 text-center">
                                <h1 className="text-3xl  dbhead pb-4">Error 404: Page Not Found!</h1>
                                <h1 className="text-2xl font-semibold dbhead pb-4">Please check if you've
                                    entered the correct URL.</h1>
                                <Link to="/dashboard">
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back to Home</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="grid grid-rows-2 gap-4 h-full  md:hidden">
                <div className=" w-[100%] bg-blue-700 rounded-bl-full rounded-br-full ">
                    <div className="container py-32 ">
                        <div className="row">

                            <div className="columns two ">

                                &nbsp;
                            </div>
                            <div className="columns eight ">
                                <div className="h-32  text-white overflow-hidden rounded-lg py-10 mb-6 text-center">
                                    <span className="text-6xl font-bold dbhead">Oops :(</span>
                                </div>
                            </div>
                            <div className="columns two ">

                                &nbsp;
                            </div>

                        </div>
                    </div>

                </div>
                <div className="container py-24">
                    <div className="row">

                        <div className="columns twelve ">
                            <div className="h-54 bg-white overflow-hidden  py-10 mb-6 text-center">
                                <h1 className="text-3xl  dbhead pb-4">Error 404: Page Not Found!</h1>
                                <h1 className="text-2xl font-semibold dbhead pb-4">Please check if you've
                                    entered the correct URL.</h1>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back to Home</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Error
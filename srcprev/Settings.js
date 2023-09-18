import React from 'react';
import Navbar from './Navbar';
import Apiurl from './apiurl';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Settings() {
  const apiu = Apiurl();
  let [trxfailed, setTrxfailed] = useState("");
  let [trxsuccess, setTrxsuccess] = useState("");
  const [apikey, setApikey] = useState();
  const [merchant_id, setMerchantid] = useState();
  const [trxfailedurl, setTrxfailedurl] = useState();
  const [trxsuccessurl, setTrxsuccessurl] = useState();

  let [oldpassword, setOldpassword] = useState("");
  let [newpassword1, setNewpassword1] = useState("");
  let [newpassword2, setNewpassword2] = useState("");

  useEffect(() => {
    axios.get(apiu + "/merchants/getmerchantdetails", {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}}).then((response) => {
      // console.log(response.data);
      const merchant = response.data.merchant;
      setMerchantid(merchant.merchant_id);
      setApikey(merchant.api_key);
      setTrxfailedurl(merchant.failed_url);
      setTrxsuccessurl(merchant.success_url);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  const handleTrxfailedChange = (e) => {
      setTrxfailed(e.target.value);
  };
  
  const handleTrxsuccessChange = (e) => {
      setTrxsuccess(e.target.value);
  };

  const handleOldpasswordChange = (e) => {
      setOldpassword(e.target.value);
  };

  const handleNewpassword1Change = (e) => {
    setNewpassword1(e.target.value);
  };

  const handleNewpassword2Change = (e) => {
    setNewpassword2(e.target.value);
  };

  const handlePasswordChange = (e) => {
    // console.log(newpassword1);
    // console.log(newpassword2);

    if (newpassword1 != newpassword2) {
      alert("passwords dont match");
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append("old_password", oldpassword);
      formData.append("new_password", newpassword1);
      axios
      .post(apiu + "/auth/changemerchantpass", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
      })
      .then((response) => {
        alert("password changed succesfully");
        window.location = '/signout';
        // console.log(response)
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status == 403) {
          alert("incorrect password");
        }
      });
    }
    
  };

  const handleFailedSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("failed_url", trxfailed);
    // setsuccessurl success_url
   axios
  .post(apiu + "/auth/setfailedurl", formData, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
  })
  .then((response) => {
    alert("redirect url changed succesfully");
    window.location = '/settings';
    // console.log(response)
  })
  .catch((error) => {
    console.log(error);
  });

};

const handleSuccessSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("success_url", trxsuccess);
  // setsuccessurl success_url
 axios
.post(apiu + "/auth/setsuccessurl", formData, {
  headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
})
.then((response) => {
  alert("redirect url changed succesfully");
  window.location = '/settings';
  // console.log(response)
})
.catch((error) => {
  console.log(error);
});

};

  return (
    <>
     <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
        <Navbar />
        <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
            </div>
          </header>
        </div>
    </div>
    <main className="-mt-32">
        <div className="overflow-hidden rounded-lg bg-white shadow mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <br></br>
      <br></br>
      
        <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Merchant Settings</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">API key</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{apikey}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Merchant Code</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{merchant_id}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">API Examples</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div>
                <span className="font-semibold">Create Transaction API</span>
                <p><b>endpoint: <br></br>https://api.bazorpay.com/transactions/createtransaction</b></p>
                <p><b>POST</b></p>
                <p>Payload Params<br></br>
                  merchant_id : Your Merchant Code ,(String)<br></br>
                  api_key : Your API Key, (String)<br></br> 
                  transaction_id : Unique Transaction Id, (String)<br></br>
                  amount : Transaction Amount, (String)<br></br>
                  user_name : User Name, (String)<br></br>
                  mobile_no : Mobile Number, (String)<br></br>
                  email: Email Id, (String)</p>
                <p><b>Example Url:</b></p>
                <p>https://api.bazorpay.com/transactions/createtransaction?merchant_id=yourmerchantcode&api_key=yourapikey&transaction_id=uniqueid
                  &amount=1000&user_name=SomeName&mobile_no=9999999999&email=some@eamil.com
                </p>
              </div>
              <br></br><br></br>
              <div>
              <span className="font-semibold">Fetch Transaction Data API</span>
                <p><b>endpoint: <br></br>https://api.bazorpay.com/transactions/fetchtransactiondata</b></p>
                <p><b>GET</b></p>
                <p>Payload Params<br></br>
                  merchant_id : Your Merchant Code ,(String)<br></br>
                  api_key : Your API Key, (String)<br></br> 
                  transaction_id : Unique Transaction Id, (String)<br></br>
                  date : 2023-04-15, (String)<br></br>
                </p>
                <p><b>Example Url:</b></p>
                <p>https://api.bazorpay.com/transactions/fetchtransactiondata?merchant_id=yourmerchantcode&api_key=yourapikey&transaction_id=uniqueid
                  &date=2023-04-15
                </p>
              </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">&nbsp;</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form onSubmit={handleFailedSubmit}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                        <label htmlFor="accountno" className="block text-sm font-medium leading-6 text-gray-900">
                            Transaction failed redirect url:<br></br><span>{trxfailedurl}</span>
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                name="trxfailed"
                                value={trxfailed}
                                onChange={handleTrxfailedChange}
                                id="trxfailed"
                                autoComplete="trxfailed"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder=""
                                required
                            />
                            </div>
                        </div>
                        </div>
                    </div>
               <div className="mt-6 flex items-center gap-x-6">
                    
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
              </form>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">&nbsp;</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form onSubmit={handleSuccessSubmit}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                        <label htmlFor="accountno" className="block text-sm font-medium leading-6 text-gray-900">
                            Transaction success redirect url:<br></br><span>{trxsuccessurl}</span>
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                name="trxsuccess"
                                value={trxsuccess}
                                onChange={handleTrxsuccessChange}
                                id="trxsuccess"
                                autoComplete="trxsuccess"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder=""
                                required
                            />
                            </div>
                        </div>
                        </div>
                    </div>
               <div className="mt-6 flex items-center gap-x-6">
                    
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
              </form>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">&nbsp;</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <form onSubmit={handlePasswordChange}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <span className="font-semibold text-base">Change Password</span>
                        <div className="sm:col-span-4">
                        <label htmlFor="old_password" className="block text-sm font-medium leading-6 text-gray-900">
                            Current Password
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="password"
                                name="old_password"
                                value={oldpassword}
                                onChange={handleOldpasswordChange}
                                id="old_password"
                                autoComplete="old_password"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                
                                required
                            />
                            </div>
                        </div>
                        </div>
                        <div className="sm:col-span-4">
                        <label htmlFor="new_password1" className="block text-sm font-medium leading-6 text-gray-900">
                            New Password
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="password"
                                name="new_password1"
                                value={newpassword1}
                                onChange={handleNewpassword1Change}
                                id="new_password1"
                                autoComplete="new_password1"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                
                                required
                            />
                            </div>
                        </div>
                        </div>
                        <div className="sm:col-span-4">
                        <label htmlFor="new_password2" className="block text-sm font-medium leading-6 text-gray-900">
                            Re-enter New Password
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="password"
                                name="new_password2"
                                value={newpassword2}
                                onChange={handleNewpassword2Change}
                                id="new_password2"
                                autoComplete="new_password2"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                
                                required
                            />
                            </div>
                        </div>
                        </div>
                    </div>
               <div className="mt-6 flex items-center gap-x-6">
                    
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Submit
                    </button>
                </div>
              </form>
            </dd>
          </div>

        </dl>
        </div>
        </div>
        </div>
    </main>
    </>
  );
}

export default Settings;

import React from 'react';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Apiurl from './apiurl';
import axios from 'axios';


function Profile() {
  const apiu = Apiurl();

  const [merchantCode, setMerchantcode] = useState();
  const [merchantName, setMerchantname] = useState();
  const [appName, setAppname] = useState();
  const [website, setWebsite] = useState();
  const [mobileNumber, setMobilenumber] = useState();
  const [companyName, setCompanyname] = useState();
  const [companyAddress, setCompanyaddress] = useState();
  const [bankAccount, setBankaccount] = useState();
  const [ifsc, setIfsc] = useState();
  const [payin, setPayin] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    axios.get(apiu + "/merchants/getmerchantdetails", {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}}).then((response) => {
      console.log(response.data);
      const merchant = response.data.merchant;
      setMerchantcode(merchant.merchant_id);
      setMerchantname(merchant.merchant_name);
      setAppname(merchant.app_name);
      setWebsite(merchant.website);
      setMobilenumber(merchant.mobile_number);
      setCompanyname(merchant.company_name);
      setCompanyaddress(merchant.company_address);
      setBankaccount(merchant.bank_account_no);
      setIfsc(merchant.ifsc_code);
      setPayin(merchant.payin_charge);
      if (merchant.merchant_status){
        setStatus("Active")
      } else {
        setStatus("Inactive");
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
        <Navbar />
        <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">My Profile</h1>
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
        <h3 className="text-base font-semibold leading-7 text-gray-900">Merchant Information</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Merchant Code</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{merchantCode}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Merchant Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{merchantName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">App Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{appName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Website</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{website}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Mobile Number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileNumber}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Company Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{companyName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Company Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{companyAddress}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Bank Account Number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bankAccount}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Bank IFSC Code</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ifsc}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">PayIn Charge</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{payin}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Account Status</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{status}</dd>
          </div>
        </dl>
      </div>
    </div>
        </div>
    </main>
    </>
  );
}

export default Profile;

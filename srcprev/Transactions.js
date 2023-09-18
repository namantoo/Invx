import React from 'react';
import Navbar from './Navbar';
import Apiurl from './apiurl';
import 'flowbite/dist/flowbite.min.css';
import { useEffect , useState} from "react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import axios from 'axios';


function Transactions() {
  const apiu = Apiurl();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  // const people = [
  //   { id: 'M0001', name: 'Merchant1' },
  //   { id: 'M0002', name: 'Merchant2' },
  //   // More users...
  // ]
  const [transactions, setTransactions] = useState([]);

  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })
  
  useEffect(() => {
    axios.get(apiu + "/transactions/listalltcols", {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}}).then((response) => {
      let intialPeople = [];
      console.log(response.data);
      response.data.forEach(element => {
        let dt_display = String(element.date).slice(5, 16);
        intialPeople.push({id: element.strdate, name: dt_display});
        // console.log(element);
      });

      setPeople(intialPeople);

    }).catch((error) => {
      console.log(error);
    });

    axios.get(apiu + "/transactions/defaulttransactions?page=1", {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}}).then((response2) => {
      // let initialTransactions = [];
      setTransactions(response2.data);
    }).catch((error) => {
      console.log(error);
    });

  },[]);

  function handleClick() {
    console.log(selectedPerson.id);
    let strdt = selectedPerson.id;
    axios.get(apiu + "/transactions/listalltransactions?page=1&date=" + strdt, {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}}).then((response2) => {
      // let initialTransactions = [];
      console.log(response2.data.length);
      setTransactions(response2.data);
      response2.data.forEach(element => {
        console.log(element.merchant_transaction_id);
      });
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <>
    <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
        <Navbar />
        <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Transactions</h1>
            </div>
          </header>
        </div>
    </div>
    <main className="-mt-32">
        <div className="overflow-hidden rounded-lg bg-white shadow mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <br></br>
            <div className="float-container">
              <div className="float-child" style={{width: "20%", zIndex: "2000"}}>
              {/* selector */}
                <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                  <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Date</Combobox.Label>
                  <div className="relative mt-2" style={{zIndex: 1000}}>
                      <Combobox.Input
                      className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(person) => person?.name}
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Combobox.Button>

                      {filteredPeople.length > 0 && (
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredPeople.map((person) => (
                          <Combobox.Option
                              key={person.id}
                              value={person}
                              className={({ active }) =>
                              classNames(
                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                              )
                              }
                          >
                          {({ active, selected }) => (
                          <>
                              <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                              {selected && (
                              <span
                                  className={classNames(
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                  active ? 'text-white' : 'text-indigo-600'
                                  )}
                              >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              )}
                          </>
                          )}
                          </Combobox.Option>
                      ))}
                      </Combobox.Options>
                  )}
                  </div>
                </Combobox>
                </div>
                <div className="float-child" style={{width: "20%"}}>&nbsp;</div>
                <div className="float-child" style={{width: "20%"}}>&nbsp;</div>
                <div className="float-child" style={{width: "20%"}}>&nbsp;</div>
                <div className="float-child" style={{width: "20%"}}>
                    <button
                        onClick={handleClick}
                        type="button"
                        className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Show Transactions
                    </button>
                </div>
            </div>
            <br></br>
            <div className="">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Trannsaction Id
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Merchant Transaction Id
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Transaction Ref No
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto h-32">
                  {transactions.map((transaction) => (
                    <tr key={transaction.transaction_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {transaction.created_at}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.status}</td>
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.transaction_id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.merchant_transaction_id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.transaction_ref_no}</td>
                
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
        </div>
    </main>
    </>
  );
}

export default Transactions;

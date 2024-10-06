import React from 'react'

const Orders = () => {
  return (
    <div className="w-9/12 mx-auto bg-slate-100 mt-10 mb-6 rounded-md relative">
      <div className="flex flex-col gap-2 w-11/12 mx-auto pt-4 pb-16">
        <p className="text-2xl font-semibold text-center pb-5 ">Our Orders:</p>
        <div className="overflow-hidden rounded border">
          <table className="w-full border border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2">Product Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border px-4 py-2">jsnsjb</td>
                <td className="border px-4 py-2">face wash</td>
                <td className="border px-4 py-2">₹1520</td>
                <td className="border px-4 py-2">pending</td>
                <td className="border px-4 py-2">cancel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders

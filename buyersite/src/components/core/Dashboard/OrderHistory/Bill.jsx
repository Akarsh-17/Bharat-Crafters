import React, { useMemo } from "react";
import "./Bill.css";

const Bill = React.forwardRef(({ billData, handlePrint }, ref) => {
  const totals = useMemo(() => {
    const total = billData.items.reduce((acc, item) => {
      return acc + item.selectedPrice * item.selectedQuantity;
    }, 0);

    const discount = billData.discount || 0;
    const grandTotal = total - (total * discount) / 100;

    return { total, discount, grandTotal };
  }, [billData.items, billData.discount]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <div ref={ref} className="bg-white p-6 rounded-lg shadow-md w-80 border mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-700">BHARAT CRAFTERS</h1>
            <p className="text-sm text-gray-500">
              Phone: 8888888888 <br />
              GST No: 785496231114
            </p>
          </div>
          <h2 className="text-lg font-bold text-center mb-2">Invoice</h2>
          <div className="text-sm mb-2 border-b pb-2">
            <p>
              <strong>Bill To:</strong> {billData.name}
            </p>
            <p>Phone: 8888888888</p>
            <p>Bill No: {billData.billNo}</p>
            <p>Date: {new Date(billData.date).toLocaleString()}</p>
            <p>Cashier: {billData.seller}</p>
            <p>Payment Mode: CARD</p>
          </div>
  
          <table className="w-full text-sm mb-2 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left">Product</th>
                <th className="text-right">Size</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {billData.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="text-left">{item.productInfo.name}</td>
                  <td className="text-right">{item.selectedSize}</td>
                  <td className="text-right">{item.selectedQuantity}</td>
                  <td className="text-right">{item.selectedPrice}</td>
                  <td className="text-right">
                    {item.selectedPrice * item.selectedQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Total</span>
              <span>{totals.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount %</span>
              <span>{totals.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Grand Total</span>
              <span>₹ {totals.grandTotal.toFixed(2)}</span>
            </div>
          </div>
  
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Note: Grand total does not include all taxes.</p>
            <p>🌟 Thank you for choosing Bharat Crafters! 🌟</p>
          </div>
  
        </div>
        <div className="flex gap-14 justify-between mt-4">
          <button
            className="bg-richblack-400 text-white px-4 py-1 rounded hover:bg-red-600"
            onClick={billData?.btn2Handler}
          >
            CANCEL
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            PRINT
          </button>
        </div>
    </div>
  );
});

export default Bill;

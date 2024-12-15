import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Bill from "./Bill";

const BillGenerator = ({ billData }) => {
  const contentRef = useRef(null);

 const handlePrint = useReactToPrint({
    contentRef
  },
);


  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <Bill ref={contentRef} billData={billData} handlePrint={handlePrint} />
    </div>
  );
};

export default BillGenerator;


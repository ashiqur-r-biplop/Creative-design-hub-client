import React from "react";

const Tabledata = ({ index, item }) => {
  const date = new Date(item.date);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap text-center">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={item.imgURL} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">{formattedDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-center">{formattedTime}</td>
      <td className="px-6 py-4 whitespace-nowrap text-center">{item?.className}</td>
      <td className="px-6 py-4 whitespace-nowrap text-center">{item?.instructorName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-center">{item?.instructorEmail}</td>
      <td className="px-6 py-4 whitespace-nowrap text-center">${item?.price}</td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {item?.transactionId}
      </td>
    </tr>
  );
};

export default Tabledata;

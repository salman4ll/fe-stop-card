import React, { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  renderButtons: (item: any) => React.ReactNode[];
}

const Table: React.FC<TableProps> = ({ columns, data, renderButtons }) => {
  const [enlargedImage, setEnlargedImage] = useState("");
  const [enlarged, setEnlarged] = useState(false);

  const renderCell = (item: any, column: Column, columnIndex: number) => {
    if (column.render) {
      return <td key={columnIndex}>{column.render(item)}</td>;
    }

    if (column.key === 'image' && item[column.key]) {
      return (
        <td key={columnIndex}>
          <img 
            src={item[column.key]} 
            alt="Image" 
            className="w-20 cursor-pointer text-center" 
            onClick={() => {
              setEnlargedImage(item[column.key]);
              setEnlarged(true);
            }}
          />
        </td>
      );
    }

    if (column.key === 'control_measure' && item[column.key]) {
      return (
        <td key={columnIndex}>
          <ol className="list-decimal">
            {item[column.key].map((measure: string, index: number) => (
              <li key={index}>{measure}</li>
            ))}
          </ol>
        </td>
      );
    }

    if (column.key === 'is_verified') {
      return <td key={columnIndex}>{item[column.key] === 1 ? 'Terverifikasi' : 'Tidak Terverifikasi'}</td>;
    }

    return <td key={columnIndex}>{item[column.key]}</td>;
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, columnIndex) => renderCell(item, column, columnIndex))}
                <td className="flex">
                  {renderButtons(item).map((button, btnIndex) => (
                    <div key={btnIndex} className="mr-2">
                      {button}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {enlarged && (
        <div className="fixed z-50 inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="bg-white shadow-lg rounded-lg">
              <div className="flex justify-end">
                <button
                  className="p-2 text-xl leading-none outline-none focus:outline-none"
                  onClick={() => setEnlarged(false)}
                >
                  <span className="text-gray-400">×</span>
                </button>
              </div>
              <div className="p-4">
                <img src={enlargedImage} alt="Enlarged Image" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;

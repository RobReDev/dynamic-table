import { useEffect, useState } from "react";
import Input from "./Input";
import {
  ESC_KEY_CODE,
  fromCamelCaseToWords,
  isDate,
  removeNumbers,
} from "../utils";

interface EditModalProps<TableData> {
  rowData: TableData;
  setRowData: (rowData: TableData | null) => void;
  updateTableData: (value: any) => void;
}

const EditModal = <TableData extends Record<string, any>>({
  rowData,
  setRowData,
  updateTableData,
}: EditModalProps<TableData>) => {
  const [data, setData] = useState<TableData>(rowData);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.keyCode === ESC_KEY_CODE) setRowData(null);
    };
    document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [setRowData]);

  return (
    <>
      <div
        onClick={() => setRowData(null)}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div
          className="relative my-6 mx-auto max-w-3xl w-5/12"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-solid border-blueGray-200 rounded-t text-gray-400">
              <h3 className="text-3xl font-semibold">Edit</h3>
              <button
                className="p-1 ml-auto border-0 text-gray-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setRowData(null)}
              >
                <span className="bg-transparent bg-gray-700 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative px-6 pb-4 flex flex-col">
              {Object.keys(data)
                .map((key) => {
                  if (typeof data[key] === "string" && !isDate(data[key])) {
                    return (
                      <div className="w-full flex flex-col text-left" key={key}>
                        <p className="text-gray-400">
                          {fromCamelCaseToWords(key)}
                        </p>
                        <Input
                          value={data[key]}
                          classNames="pl-2"
                          onChange={(newValue) =>
                            setData({
                              ...data,
                              [key]: removeNumbers(newValue),
                            })
                          }
                        />
                      </div>
                    );
                  }
                  return null;
                })
                .filter((val) => val)}
            </div>
            <div className="flex items-center justify-end p-2 border-t border-solid border-gray-500 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setRowData(null)}
              >
                Close
              </button>
              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  setRowData(null);
                  updateTableData(data);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;

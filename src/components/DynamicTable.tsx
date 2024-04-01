import { useState } from "react";
import { fromCamelCaseToWords, isDate } from "../utils";
import Search from "./Search";
import EditModal from "./EditModal";

interface DynamicTableProps<TableData> {
  data: TableData[];
  notFoundTitle: string;
  tableTitle?: string;
  actionsTitle?: string;
}

const DynamicTable = <TableData extends Record<string, any>>({
  data,
  notFoundTitle,
  tableTitle,
  actionsTitle,
}: DynamicTableProps<TableData>) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [rowData, setRowData] = useState<null | (typeof data)[0]>(null);
  const [tableData, setTableData] = useState(data);

  const foundData = tableData.filter((row) =>
    Object.values(row).some((value) => {
      if (typeof value === "object") {
        return Object.values(value).some((subValue: any) => {
          return subValue.toString().toLowerCase().includes(filterValue);
        });
      }

      return value.toString().toLowerCase().includes(filterValue);
    })
  );

  const columnNames = Object.keys(tableData[0]).map((column) =>
    typeof tableData[0][column] === "object"
      ? Object.keys(tableData[0][column]).map((nestedColumn) =>
          fromCamelCaseToWords(nestedColumn)
        )
      : fromCamelCaseToWords(column)
  );

  const handleFilterChange = (value: string) =>
    setFilterValue(value.toLowerCase());

  const handleUpdateTableData = (newData: TableData) =>
    setTableData(
      tableData.map((data) => (data.id === newData.id ? newData : data))
    );

  const handleCellValue = (cellValue: string | number | boolean) => {
    if (typeof cellValue === "boolean") {
      return cellValue ? "Active" : "Not Active";
    }

    if (isDate(cellValue as string)) {
      const date = new Date(cellValue);
      const dateString = date.toLocaleDateString("en-GB");
      const timeString = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${dateString}, ${timeString}`;
    }

    return cellValue;
  };

  const handleNestedObj = (cellValue: any) =>
    typeof cellValue === "object" ? (
      Object.keys(cellValue).map((subColumn) => (
        <td
          className="px-6 py-4 whitespace-nowrap"
          key={cellValue[subColumn].toString()}
        >
          {cellValue[subColumn]}
        </td>
      ))
    ) : (
      <td className="max-w-60 px-6 py-4" key={cellValue.toString()}>
        <p className="line-clamp-1">{handleCellValue(cellValue)}</p>
      </td>
    );

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 p-10">
        <div className=" flex flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl text-gray-400 font-medium">{tableTitle}</h1>
          </div>
          <Search value={filterValue} onChange={handleFilterChange} />
        </div>
        <div className="flex flex-col mt-6 ">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="table-fixed overflow-scroll min-w-full text-sm text-gray-400">
                  <thead className="bg-gray-800 text-xs uppercase font-medium">
                    <tr>
                      {columnNames.flat().map((column) => (
                        <th
                          className="px-6 py-3 text-left tracking-wider"
                          key={column}
                        >
                          {column}
                        </th>
                      ))}
                      <th>{actionsTitle}</th>
                    </tr>
                  </thead>
                  {foundData.length ? (
                    <tbody
                      className="bg-gray-800 overflow-y-scroll"
                      style={{ height: "20vh" }}
                    >
                      {foundData.map((row, idx) => (
                        <tr
                          className={
                            (idx + 1) % 2 !== 0
                              ? "w-64 bg-black bg-opacity-20 hover:bg-gray-600"
                              : "w-64 hover:bg-gray-600"
                          }
                          key={row.id}
                        >
                          {Object.keys(row).map((column) =>
                            handleNestedObj(row[column])
                          )}
                          <td className="text-center px-6 py-4 whitespace-nowrap">
                            <button
                              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              type="button"
                              onClick={() => setRowData(row)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr className="align-center">
                        <td
                          className="text-center text-red-600"
                          colSpan={columnNames.length + 1}
                        >
                          {notFoundTitle}
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!rowData && (
        <EditModal<TableData>
          rowData={rowData}
          setRowData={setRowData}
          updateTableData={handleUpdateTableData}
        />
      )}
    </>
  );
};

export default DynamicTable;

import { useState, useRef } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import XLSX from 'xlsx';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);

  const FileImport = e => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);

    reader.onload = function () {
      const fileData = reader.result;
      const wb = XLSX.read(fileData, { type: 'binary' });
      wb.SheetNames.forEach(function (sheetName) {
        var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        setRowData(rowObj);
      });
    };
  };

  return (
    <div className="ag-theme-alpine" style={{ width: '100vw', height: 800 }}>
      <input type="file" name="ExcelFile" onChange={FileImport} />

      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        defaultColDef={{
          flex: 1,
          minWidth: 110,
          editable: true,
          resizable: true,
        }}
      >
        <AgGridColumn field="athlete" sortable={true}></AgGridColumn>
        <AgGridColumn field="age"></AgGridColumn>
        <AgGridColumn field="country"></AgGridColumn>
        <AgGridColumn field="year"></AgGridColumn>
        <AgGridColumn field="date"></AgGridColumn>
        <AgGridColumn field="sport"></AgGridColumn>
        <AgGridColumn field="gold"></AgGridColumn>
        <AgGridColumn field="silver"></AgGridColumn>
        <AgGridColumn field="bronze"></AgGridColumn>
        <AgGridColumn field="total"></AgGridColumn>
      </AgGridReact>
    </div>
  );
}

export default App;

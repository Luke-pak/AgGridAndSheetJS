import { useState, useRef } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { Input, Button } from '@material-ui/core';
import XLSX from 'xlsx';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  const [gridApi, setGridApi] = useState();
  const gridRef = useRef(null);

  const defaultRowData = [
    {
      athlete: 'Gong Jinjie',
      age: 25,
      country: 'China',
      year: 2012,
      date: 39789,
      sport: 'Cycling',
      gold: 0,
      silver: 1,
      bronze: 1,
    },
    {
      athlete: 'Olga Kaniskina',
      age: 27,
      country: 'Russia',
      year: 2012,
      date: 39789,
      sport: 'Athletics',
      gold: 0,
      silver: 1,
      bronze: 0,
    },
    {
      athlete: 'Vavrinec Hradílek',
      age: 25,
      country: 'Czech Republic',
      year: 2012,
      date: 39789,
      sport: 'Canoeing',
      gold: 0,
      silver: 1,
      bronze: 0,
    },
    {
      athlete: 'Jakov Fak',
      age: 22,
      country: 'Croatia',
      year: 2010,
      date: '28/02/2010',
      sport: 'Biathlon',
      gold: 0,
      silver: 0,
      bronze: 1,
    },
    {
      athlete: 'Jesse Sergent',
      age: 24,
      country: 'New Zealand',
      year: 2012,
      date: 39789,
      sport: 'Cycling',
      gold: 3,
      silver: 0,
      bronze: 1,
    },
    {
      athlete: 'Jeong Seong-Ryong',
      age: 27,
      country: 'South Korea',
      year: 2012,
      date: 39789,
      sport: 'Football',
      gold: 0,
      silver: 0,
      bronze: 1,
    },
    {
      athlete: 'Fredrik Lööf',
      age: 42,
      country: 'Sweden',
      year: 2012,
      date: 39789,
      sport: 'Sailing',
      gold: 1,
      silver: 0,
      bronze: 0,
    },
    {
      athlete: 'Jo In-Cheol',
      age: 24,
      country: 'South Korea',
      year: 2000,
      date: 35073,
      sport: 'Judo',
      gold: 0,
      silver: 1,
      bronze: 0,
    },
    {
      athlete: 'William Lockwood',
      age: 24,
      country: 'Australia',
      year: 2012,
      date: 39789,
      sport: 'Rowing',
      gold: 0,
      silver: 1,
      bronze: 0,
    },
  ];

  const FileImport = e => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);

    reader.onload = function () {
      const fileData = reader.result;
      const wb = XLSX.read(fileData, { type: 'binary' });
      wb.SheetNames.forEach(function (sheetName) {
        var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        gridApi.setRowData(rowObj);
      });
    };
  };

  const SendJson = () => {
    let sendData = [];
    gridApi.forEachNode(node => sendData.push(node.data));
    console.log(sendData);
  };

  return (
    <div className="ag-theme-alpine" style={{ width: '100vw', height: 800 }}>
      <Input type="file" name="ExcelFile" onChange={FileImport} />
      <Button variant="contained" color="primary" onClick={SendJson}>
        UPLOAD
      </Button>

      <AgGridReact
        ref={gridRef}
        rowData={defaultRowData}
        onGridReady={params => setGridApi(params.api)}
        rowSelection="multiple"
        defaultColDef={{
          flex: 1,
          minWidth: 110,
          editable: true,
          resizable: true,
          sortable: true,
          enableRowGroup: true,
          enablePivot: true,
          enablePivot: true,
          floatingFilter: true,
        }}
        sideBar={{
          toolPanels: [
            {
              id: 'columns',
              labelDefault: 'Columns',
              labelKey: 'columns',
              iconKey: 'columns',
              toolPanel: 'agColumnsToolPanel',
            },
          ],
        }}
      >
        <AgGridColumn field="athlete" filter="agSetColumnFilter"></AgGridColumn>
        <AgGridColumn field="age" filter="agNumberColumnFilter"></AgGridColumn>
        <AgGridColumn field="country" filter="agSetColumnFilter"></AgGridColumn>
        <AgGridColumn field="year" filter="agSetColumnFilter"></AgGridColumn>
        <AgGridColumn field="date"></AgGridColumn>
        <AgGridColumn field="sport"></AgGridColumn>
        <AgGridColumn field="gold"></AgGridColumn>
        <AgGridColumn field="silver"></AgGridColumn>
        <AgGridColumn field="bronze"></AgGridColumn>
        <AgGridColumn
          field="total"
          // cellRenderer={prop => {
          //   let total =
          //     (prop.data.gold || 0) +
          //     (prop.data.silver || 0) +
          //     (prop.data.bronze || 0);
          //   return total;
          // }}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
}

export default App;

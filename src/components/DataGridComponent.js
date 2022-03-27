import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function DataGridComponent() {
  const columns = [
    { field: "sl_no", headerName: "Sl no", flex: 1 },
    { field: "business_code", headerName: "Business Code", flex: 1 },
    { field: "cust_number", headerName: "Customer Number", flex: 1 },
    { field: "clear_date", headerName: "Clear Date", flex: 1 },
    { field: "business_year", headerName: "Business Year", flex: 1 },
    { field: "doc_id", headerName: "Document Id", flex: 1 },
    { field: "posting_date", headerName: "Posting Date", flex: 1 },
    {
      field: "document_create_date",
      headerName: "Document Create Date",
      flex: 1,
    },
    { field: "due_in_date", headerName: "Due Date", flex: 1 },
    { field: "invoice_currency", headerName: "Invoice Currency", flex: 1 },
    { field: "document_type", headerName: "Document Type", flex: 1 },
    { field: "posting_id", headerName: "Posting Id", flex: 1 },
    { field: "total_open_amount", headerName: "Total Open Amount", flex: 1 },
    {
      field: "baseline_create_date",
      headerName: "Baseline Create Date",
      flex: 1,
    },
    {
      field: "cust_payment_terms",
      headerName: "Customer Payment Terms",
      flex: 1,
    },
    { field: "invoice_id", headerName: "Invoice Id", flex: 1 },
  ];

  return (
    <div className="relative flex-1 mt-0 mb-10 px-5 bg-grid border-cyan-900">
      <DataGrid
        columns={columns}
        checkboxSelection
        pageSize={10}
        pagination
        sx={{
          color: "white",
          border: "none",
          backgroundColor: "#283d4a",
        }}
      />
    </div>
  );
}

export default DataGridComponent;

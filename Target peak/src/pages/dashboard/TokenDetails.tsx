import DynamicTable, { Action, Column } from "@/components/Dynamic-Table/DynamicTable";
import React from "react";
// import { DynamicTable, Column, Action } from "@/components/Dynamic-Table";

type Token = {
  code: number;
  tokenName: string;
  marathi: string;
  hindi: string;
  abbreviation: string;
};

const TokenDetails = () => {
  const data: Token[] = [
    {
      code: 101,
      tokenName: "Token A",
      marathi: "टोकन A",
      hindi: "टोकन A",
      abbreviation: "A",
    },
    {
      code: 102,
      tokenName: "Token B",
      marathi: "टोकन B",
      hindi: "टोकन B",
      abbreviation: "B",
    },
  ];

  const columns: Column<Token>[] = [
    {
      key: "srNo",
      header: "Sr.No",
      render: (_, index) => index + 1,
    },
    { key: "code", header: "Code" },
    { key: "tokenName", header: "Token Name" },
    { key: "marathi", header: "Token In Marathi" },
    { key: "hindi", header: "Token In Hindi" },
    { key: "abbreviation", header: "Abbreviation" },
  ];

  const actions: Action<Token>[] = [
    {
      label: "+",
      className: "bg-green-600",
      onClick: (row) => console.log("Add", row),
    },
    {
      label: "Edit",
      className: "bg-blue-600",
      onClick: (row) => console.log("Edit", row),
    },
    {
      label: "Delete",
      className: "bg-red-600",
      onClick: (row) => console.log("Delete", row),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          TOKEN DETAILS
        </h1>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <DynamicTable
          columns={columns}
          data={data}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default TokenDetails;

"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/Dynamic-Table/DynamicTable";
import { BannerColumns } from "@/components/Dynamic-Table/Columsn";
import { DynamicForm } from "@/components/form/DynamicForm";
import { FormConfig } from "@/components/form/form.types";

const Banners = () => {
  const [mode, setMode] = useState<"list" | "add">("list");

  const handleSubmit = async (data: any) => {
    console.log("Banner Submit Payload:", data);
    setMode("list");
  };
  //DUNMMY DATA
//   const bannerData = [
//     {
//       bannerId: 1,
//       sansthaName: "Latur Zila Parishad",
//       page: "Dashboard",
//       type: "Firestore",
//       uploadType: "Media",
//       validFrom: "09-12-2024",
//       validTo: "31-03-2025",
//       mediaUrl: "https://via.placeholder.com/100",
//     },
//   ];

// add button
  const formConfig: FormConfig = {
    columns: 3,
    gap: 20,
    submitLabel: "Submit",
    showCancel: false,

    initialValues: {
      organization: "",
      page: "",
      type: "Image",
      uploadType: "Media",
      mediaSource: "Firestore",
      image: null,
      validFrom: "",
      validTo: "",
    },
// this form config is for add banner
    fields: [
      {
        name: "organization",
        label: "Select Organization",
        type: "select",
        required: true,
        options: [
          { label: "Latur Zila Parishad", value: "latur" },
          { label: "Parbhani Zila Parishad", value: "parbhani" },
        ],
      },
      {
        name: "page",
        label: "Select Page",
        type: "select",
        required: true,
        options: [{ label: "Dashboard", value: "dashboard" }],
      },
      {
        name: "type",
        label: "Select Type",
        type: "select",
        required: true,
        options: [{ label: "Image", value: "Image" },{ label: "Video", value: "Video" }],
      },
      {
        name: "uploadType",
        label: "Upload Type",
        type: "select",
        required: true,
        options: [{ label: "Media", value: "Media" }],
        gridColumn: "span 2",
      },
      {
        name: "mediaSource",
        label: "Select Media Source",
        type: "select",
        required: true,
        options: [{ label: "Firestore", value: "Firestore" }],
      },
      {
        name: "image",
        label: "Upload Image",
        type: "file",
        required: true,
        gridColumn: "span 3",
      },
      {
        name: "validFrom",
        label: "Valid From",
        type: "date",
        required: true,
      },
      {
        name: "validTo",
        label: "Valid To",
        type: "date",
        required: true,
      },
    ],

    onSubmit: handleSubmit,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">BANNERS</h1>

      {/* List / Add Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("list")}
          className={`px-4 py-2 rounded text-sm font-semibold ${
            mode === "list" ? "bg-blue-900 text-white" : "bg-gray-100 border"
          }`}
        >
          List
        </button>
        <button
          onClick={() => setMode("add")}
          className={`px-4 py-2 rounded text-sm font-semibold ${
            mode === "add" ? "bg-blue-900 text-white" : "bg-gray-100 border"
          }`}
        >
          + Add
        </button>
      </div>

      {/* Content */}
      {mode === "list" ? (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <DynamicTable
            columns={BannerColumns.columns}
            // data={bannerData}
            data={[]}
            actions={BannerColumns.actions}
          />
        </div>
      ) : (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <DynamicForm config={formConfig} />
        </div>
      )}
    </div>
  );
};

export default Banners;

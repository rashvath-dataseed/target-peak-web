"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/Dynamic-Table/DynamicTable";
import { BannerColumns } from "@/components/Dynamic-Table/Columsn";
import { DynamicForm } from "@/components/form/DynamicForm";
import { FormConfig } from "@/components/form/form.types";

const Banners = () => {
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [bannerList, setBannerList] = useState<any[]>([
    {
      bannerId: 1,
      sansthaName: "Latur Zila Parishad",
      page: "Dashboard",
      type: "Image",
      uploadType: "Media",
      validFrom: "09-12-2024",
      validTo: "31-03-2025",
      mediaUrl: "https://via.placeholder.com/100",
    },
  ]);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);

  /* TABLE ACTIONS */

  const handleEdit = (row: any) => {
    setSelectedBanner(row);
    setMode("edit");
  };

  const handleDelete = (row: any) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    setBannerList((prev) =>
      prev.filter((item) => item.bannerId !== row.bannerId)
    );
  };

  /* FORM SUBMIT */

  const handleSubmit = async (data: any) => {
    if (mode === "edit") {
      setBannerList((prev) =>
        prev.map((item) =>
          item.bannerId === selectedBanner.bannerId
            ? { ...item, ...data }
            : item
        )
      );
    } else {
      setBannerList((prev) => [
        ...prev,
        {
          ...data,
          bannerId: Date.now(),
          sansthaName: "Latur Zila Parishad",
          mediaUrl: "https://via.placeholder.com/100",
        },
      ]);
    }

    setMode("list");
    setSelectedBanner(null);
  };

  /* FORM CONFIG */

  const formConfig: FormConfig = {
    columns: 3,
    gap: 20,
    submitLabel: mode === "edit" ? "Update" : "Submit",
    showCancel: true,

    initialValues:
      mode === "edit"
        ? {
            page: selectedBanner?.page,
            type: selectedBanner?.type,
            uploadType: selectedBanner?.uploadType,
            validFrom: selectedBanner?.validFrom,
            validTo: selectedBanner?.validTo,
          }
        : {
            organization: "",
            page: "",
            type: "Image",
            uploadType: "Media",
            mediaSource: "Firestore",
            image: null,
            validFrom: "",
            validTo: "",
          },

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
        options: [{ label: "Dashboard", value: "Dashboard" }],
      },
      {
        name: "type",
        label: "Select Type",
        type: "select",
        required: true,
        options: [
          { label: "Image", value: "Image" },
          { label: "Video", value: "Video" },
        ],
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
        required: mode !== "edit",
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
    onCancel: () => setMode("list"),
  };

  const bannerTable = BannerColumns(handleEdit, handleDelete);

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
          onClick={() => {
            setSelectedBanner(null);
            setMode("add");
          }}
          className={`px-4 py-2 rounded text-sm font-semibold ${
            mode !== "list" ? "bg-blue-900 text-white" : "bg-gray-100 border"
          }`}
        >
          + Add
        </button>
      </div>

      {/* Content */}
      {mode === "list" ? (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <DynamicTable
            columns={bannerTable.columns}
            data={bannerList}
            actions={bannerTable.actions}
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

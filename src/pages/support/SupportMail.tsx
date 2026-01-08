"use client";

import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/Dynamic-Table/DynamicTable";
import {
  SupportMailColumns,
  SupportMailRow,
} from "@/components/Dynamic-Table/Columsn";
import { DynamicForm } from "@/components/form/DynamicForm";
import { FormConfig } from "@/components/form/form.types";
import {
  getAllSupportEmails,
  deleteSupportEmail,
  createSupportEmail,
  updateSupportEmail,
} from "./Services/api";

const SupportMail = () => {
  const [data, setData] = useState<SupportMailRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [selectedMail, setSelectedMail] = useState<SupportMailRow | null>(null);

  /* ================= FETCH ================= */

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const res = await getAllSupportEmails();
      setData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch support emails", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  /* ================= ACTIONS ================= */

  const handleEdit = (row: SupportMailRow) => {
    setSelectedMail(row);
    setMode("edit");
  };

  const handleDelete = async (row: SupportMailRow) => {
    if (!confirm("Are you sure you want to delete this email?")) return;
    await deleteSupportEmail(row.id);
    fetchEmails();
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (formData: any) => {
    try {
      if (mode === "edit" && selectedMail) {
        await updateSupportEmail(selectedMail.id, {
          emailId: formData.emailId,
        });
      } else {
        await createSupportEmail({
          emailId: formData.emailId,
        });
      }

      setMode("list");
      setSelectedMail(null);
      fetchEmails();
    } catch (error) {
      console.error("Failed to submit support mail", error);
    }
  };

  /* ================= FORM CONFIG ================= */

  const formConfig: FormConfig = {
    columns: 1,
    gap: 20,
    submitLabel: mode === "edit" ? "Update" : "Submit",
    showCancel: true,

    initialValues:
      mode === "edit"
        ? {
            emailId: selectedMail?.emailId,
          }
        : {
            emailId: "",
          },

    fields: [
      {
        name: "emailId",
        label: "Support Email",
        type: "text",
        required: true,
        placeholder: "Enter support email",
      },
    ],

    onSubmit: handleSubmit,
    onCancel: () => {
      setMode("list");
      setSelectedMail(null);
    },
  };

  const tableConfig = SupportMailColumns(handleEdit, handleDelete);

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">SUPPORT MAIL</h1>

        {mode === "list" && (
          <button
            onClick={() => setMode("add")}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold"
          >
            + Add Support Mail
          </button>
        )}
      </div>

      {/* Content */}
      {mode === "list" ? (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <DynamicTable
            columns={tableConfig.columns}
            data={data}
            actions={tableConfig.actions}
            loading={loading}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-full max-w-xl rounded-lg border bg-white p-6 shadow-sm">
            <DynamicForm config={formConfig} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportMail;

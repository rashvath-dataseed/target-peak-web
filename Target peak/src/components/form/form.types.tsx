// types/form.types.ts
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: SelectOption[]; // For select, radio
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: any) => string | null; // Return error message or null
  };
  gridColumn?: string; // For grid layout: "span 2", "1 / 3", etc.
  dependsOn?: {
    field: string;
    value: any;
  };
}

export interface FormConfig {
  fields: FieldConfig[];
  columns?: number; // Number of columns in grid layout (default: 1)
  gap?: number; // Gap between fields in pixels (default: 16)
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  onCancel?: () => void;
  initialValues?: Record<string, any>;
  showCancel?: boolean;
}



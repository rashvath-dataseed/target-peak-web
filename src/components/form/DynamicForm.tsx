// components/DynamicForm/DynamicForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldConfig, FormConfig } from "./form.types";
// import { FormConfig, FieldConfig } from "@/types/form.types";

interface DynamicFormProps {
  config: FormConfig;
  className?: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  className = "",
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    config.initialValues || {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (config.initialValues) {
      setFormData(config.initialValues);
    }
  }, [config.initialValues]);

  const validateField = (field: FieldConfig, value: any): string | null => {
    if (field.required && (!value || value === "")) {
      return `${field.label} is required`;
    }

    if (!field.validation) return null;

    const { pattern, minLength, maxLength, min, max, custom } =
      field.validation;

    if (pattern && !pattern.test(value)) {
      return `Invalid format for ${field.label}`;
    }

    if (minLength && value.length < minLength) {
      return `${field.label} must be at least ${minLength} characters`;
    }

    if (maxLength && value.length > maxLength) {
      return `${field.label} must be at most ${maxLength} characters`;
    }

    if (min !== undefined && value < min) {
      return `${field.label} must be at least ${min}`;
    }

    if (max !== undefined && value > max) {
      return `${field.label} must be at most ${max}`;
    }

    if (custom) {
      return custom(value);
    }

    return null;
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    config.fields.forEach((field) => {
      if (shouldShowField(field)) {
        const error = validateField(field, formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await config.onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldShowField = (field: FieldConfig): boolean => {
    if (!field.dependsOn) return true;
    return formData[field.dependsOn.field] === field.dependsOn.value;
  };

  const renderField = (field: FieldConfig) => {
    if (!shouldShowField(field)) return null;

    const commonProps = {
      disabled: field.disabled || isSubmitting,
    };

    switch (field.type) {
      case "select":
        return (
          <Select
            value={formData[field.name] || ""}
            onValueChange={(value) => handleChange(field.name, value)}
            disabled={commonProps.disabled}
          >
            <SelectTrigger className="h-10">
              <SelectValue
                placeholder={field.placeholder || `Select ${field.label}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="min-h-[100px]"
            {...commonProps}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={formData[field.name] || false}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
              disabled={commonProps.disabled}
            />
            <label
              htmlFor={field.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.label}
            </label>
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={formData[field.name] || ""}
            onValueChange={(value) => handleChange(field.name, value)}
            disabled={commonProps.disabled}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(option.value)}
                  id={`${field.name}-${option.value}`}
                />
                <Label htmlFor={`${field.name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return (
          <Input
            type={field.type}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="h-10"
            {...commonProps}
          />
        );
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${config.columns || 1}, 1fr)`,
    gap: `${config.gap || 16}px`,
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div style={gridStyle}>
        {config.fields.map((field) => (
          <div
            key={field.name}
            className="space-y-1.5"
            style={
              field.gridColumn ? { gridColumn: field.gridColumn } : undefined
            }
          >
            {field.type !== "checkbox" && (
              <Label>
                {field.label}
                {field.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </Label>
            )}
            {renderField(field)}
            {errors[field.name] && (
              <p className="text-sm text-destructive">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Submitting..." : config.submitLabel || "Submit"}
        </Button>
        {config.showCancel && config.onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={config.onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            {config.cancelLabel || "Cancel"}
          </Button>
        )}
      </div>
    </form>
  );
};

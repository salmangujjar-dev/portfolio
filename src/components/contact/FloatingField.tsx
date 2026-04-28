"use client";

import { Field, FieldAttributes, FieldProps } from "formik";
import { useId, useState } from "react";

import { cn } from "@lib/utils";

type Variant = "input" | "textarea";

type Props = {
  name: string;
  label: string;
  type?: string;
  variant?: Variant;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  autoComplete?: string;
};

const FloatingField = ({
  name,
  label,
  type = "text",
  variant = "input",
  required,
  maxLength,
  rows = 5,
  autoComplete,
}: Props) => {
  const id = useId();

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        return (
          <FloatingControl
            id={id}
            label={label}
            type={type}
            variant={variant}
            required={required}
            maxLength={maxLength}
            rows={rows}
            autoComplete={autoComplete}
            field={field}
            error={meta.touched ? meta.error : undefined}
          />
        );
      }}
    </Field>
  );
};

type ControlProps = {
  id: string;
  label: string;
  type: string;
  variant: Variant;
  required?: boolean;
  maxLength?: number;
  rows: number;
  autoComplete?: string;
  field: FieldAttributes<any>["field"];
  error?: string;
};

const FloatingControl = ({
  id,
  label,
  type,
  variant,
  required,
  maxLength,
  rows,
  autoComplete,
  field,
  error,
}: ControlProps) => {
  const [focused, setFocused] = useState(false);
  const filled = Boolean(field.value && String(field.value).length > 0);
  const floated = focused || filled;

  const baseFieldClass = cn(
    "peer block w-full rounded-xl border bg-card/40 px-4 pb-2 pt-6 text-sm text-foreground transition-colors duration-200",
    "placeholder:text-transparent focus:outline-none",
    error
      ? "border-destructive focus:border-destructive"
      : focused
      ? "border-accent/60"
      : "border-border/70 hover:border-border"
  );

  const labelClass = cn(
    "pointer-events-none absolute left-4 transition-all duration-200",
    floated
      ? "top-2 text-[10px] font-semibold uppercase tracking-[0.18em]"
      : "top-1/2 -translate-y-1/2 text-sm",
    error
      ? "text-destructive"
      : focused
      ? "text-accent"
      : "text-muted-foreground"
  );

  const sharedHandlers = {
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<any>) => {
      setFocused(false);
      field.onBlur(e);
    },
    onChange: field.onChange,
    name: field.name,
    value: field.value,
    id,
    "aria-invalid": !!error,
    placeholder: label,
    required,
    autoComplete,
    maxLength,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "relative",
          variant === "textarea" ? "" : ""
        )}
      >
        {variant === "textarea" ? (
          <textarea
            {...sharedHandlers}
            rows={rows}
            className={cn(baseFieldClass, "resize-y min-h-[8rem] max-h-72 pt-7")}
          />
        ) : (
          <input
            {...sharedHandlers}
            type={type}
            className={cn(baseFieldClass, "h-14")}
          />
        )}
        <label htmlFor={id} className={labelClass}>
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </label>
      </div>
      {error && (
        <span className="px-1 text-xs text-destructive">{error}</span>
      )}
    </div>
  );
};

export default FloatingField;

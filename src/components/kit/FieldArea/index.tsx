import { Field, FieldAttributes } from "formik";

import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { cn } from "@lib/utils";

const FieldArea = ({ ...props }: FieldAttributes<any>) => {
  return <Field {...props} />;
};

const Label = ({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
  >
    {children}
    {required && <span className="text-accent ml-1">*</span>}
  </label>
);

FieldArea.component = (props: FieldAttributes<any>) => {
  const { type, label, className, required, field, form, ...rest } = props;
  const { setFieldValue } = form;
  const error = form.error?.[field.name];
  const errorMsg = error ? `Please enter a valid ${field.name}` : undefined;

  if (type === "textarea") {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={field.name} required={required}>
          {label}
        </Label>
        <Textarea
          id={field.name}
          name={field.name}
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.target.value)}
          maxLength={150}
          required={required}
          aria-invalid={!!error}
          className={cn(
            "resize-y max-h-48 min-h-[8rem]",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...rest}
        />
        {errorMsg && (
          <span className="text-xs text-destructive">{errorMsg}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name} required={required}>
        {label}
      </Label>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={field.value}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        maxLength={type === "email" ? 100 : 50}
        required={required}
        placeholder={type === "email" ? "name@example.com" : undefined}
        aria-invalid={!!error}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...rest}
      />
      {errorMsg && (
        <span className="text-xs text-destructive">{errorMsg}</span>
      )}
    </div>
  );
};

export default FieldArea;

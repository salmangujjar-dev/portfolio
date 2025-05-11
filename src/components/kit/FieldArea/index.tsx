import { Input, Textarea } from "@nextui-org/react";
import { Field, FieldAttributes } from "formik";

import { clsxm } from "@utils/clsxm";

const FieldArea = ({ ...props }: FieldAttributes<any>) => {
  return <Field {...props} />;
};

FieldArea.component = (props: FieldAttributes<any>) => {
  const { type, label, className, required, field, form, ...rest } = props;

  const { setFieldValue } = form;

  const error = form.error?.[field.name];

  switch (type) {
    case "text":
      return (
        <Input
          type={type}
          label={label}
          variant="bordered"
          className={clsxm(className)}
          isRequired={required}
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.target.value)}
          maxLength={50}
          isInvalid={error}
          errorMessage={error && `Please enter a valid ${field.name}`}
        />
      );
    case "email":
      return (
        <Input
          type={type}
          label={label}
          placeholder="name@example.com"
          variant="bordered"
          className={clsxm(className)}
          isRequired={required}
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.target.value)}
          maxLength={100}
          isInvalid={error}
          errorMessage={error && "Please enter a valid email"}
        />
      );
    case "textarea":
      return (
        <Textarea
          type={type}
          label={label}
          placeholder="..."
          variant="bordered"
          disableAnimation
          disableAutosize
          classNames={{
            input: clsxm("resize-y !max-h-[12rem] !min-h-[8rem]"),
          }}
          isRequired={required}
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.target.value)}
          maxLength={150}
          isInvalid={error}
          errorMessage={error && "Please enter a valid body"}
        />
      );
  }
};

export default FieldArea;

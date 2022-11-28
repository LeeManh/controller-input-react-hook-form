import { useState } from "react";
import { InputHTMLAttributes } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

function ControllerInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputHTMLAttributes<HTMLInputElement> & { isNunberOnly?: boolean }
) {
  const { type = "text", isNunberOnly = false, ...rest } = props;
  const { field, fieldState } = useController(props);

  const [value, setValue] = useState(String(field.value)); //state UI

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = isNunberOnly
      ? e.target.value.replace(/[^0-9]/g, "")
      : e.target.value;

    field.onChange(value); //send value to hook form
    setValue(value); // UI State
  };

  return (
    <div>
      <input
        {...field}
        {...rest}
        value={value}
        onChange={handleOnChange}
        type={type}
      />
      <p>{fieldState.error && fieldState.error.message}</p>
    </div>
  );
}

export default ControllerInput;

import { useState } from "react";
import { InputHTMLAttributes } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import { Schema } from "../../utils/rules";

type IFormInputs = Pick<Schema, "email" | "password" | "phone">;

type ControllerInputProps = UseControllerProps<IFormInputs> &
  InputHTMLAttributes<HTMLInputElement> & {
    isNunberOnly?: boolean;
  };

function ControllerInput(props: ControllerInputProps) {
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
      <input {...field} {...rest} value={value} onChange={handleOnChange} />
      <p>{fieldState.error && fieldState.error.message}</p>
    </div>
  );
}

export default ControllerInput;

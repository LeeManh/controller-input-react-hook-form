import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import "./App.css";

import { Schema, schema } from "./utils/rules";
import ControllerInput from "./components/ControllerInput/ControllerInput";
import { useRef } from "react";

type IFormInputs = Pick<Schema, "email" | "password" | "phone"> & FieldValues;

const App = () => {
  const { control, handleSubmit } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "", phone: "" },
  });

  //check number of render
  const ref = useRef(0);
  ref.current++;

  //handle submit Form
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <div className="container">
      <div className="number-render">Number of render : {ref.current}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="title">Đăng ký 🥟</div>
        <ControllerInput
          control={control}
          name="email"
          className="input"
          placeholder="Email"
        />
        <ControllerInput
          control={control}
          name="phone"
          className="input"
          placeholder="Phone"
          type="text"
          isNunberOnly={true}
        />
        <ControllerInput
          control={control}
          name="password"
          className="input"
          placeholder="Password"
          type="password"
        />

        <button type="submit" className="btn">
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default App;

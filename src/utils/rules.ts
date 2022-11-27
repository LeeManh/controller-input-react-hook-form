import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schema = yup
  .object({
    email: yup.string().email().required(),
    phone: yup.string().required(),
    password: yup.string().required().min(6),
  })
  .required();

export type Schema = yup.InferType<typeof schema>;

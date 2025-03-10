import * as yup from "yup";

export const schema = yup.object({
    gradYear: yup.string().required(),
    college: yup.string().required(),
    degree: yup.string().required(),
    startYear: yup.string().required(),
});

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./personalDetails.schema";
import TextBox from "../../../components/TextBox";
import { IPersonalData, useAppContext } from "../../../appProvider/AppProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { routes } from "../../../app-wrapper/routes";
import { Select } from "@mantine/core";
import { ErrorMessage } from "../../../components/ErrorMessage";
import config from "../../../config/config";
import { useEffect } from "react";

export default function PersonalDetailsForm() {
  const { formData, setForm, updatePercentDone } = useAppContext();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IPersonalData>({
    defaultValues: {
      firstName: formData.personalData?.firstName || "",
      lastName: formData.personalData?.lastName || "",
      age: formData.personalData?.age,
      gender: formData.personalData?.gender || "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data: IPersonalData) => {
    setForm((prev) => ({
      ...prev,
      personalData: data,
    }));
  });

 
  return (
    <section className=" flex w-full bg-white p-8 rounded-b-md  flex-col ">
      <div className=" text-2xl font-extrabold text-gray-800 ">Personal Details</div>
      <span className=" text-gray-600 text-sm tracking-wider">
        Please fill the details to proceed
      </span>
      <form
        className=" flex w-full bg-white rounded-md mt-8  flex-col gap-4"
        onSubmit={onSubmit}
      >
        <TextBox
          label="firstName"
          {...register("firstName")}
          error={errors?.firstName?.message}
        />

        <TextBox
          label="lastName"
          {...register("lastName")}
          error={errors?.lastName?.message}
        />
        <TextBox
          label="age"
          type="number"
          {...register("age")}
          error={errors?.age?.message}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field: props }) => (
              <Select
              {...props}
              styles={{
                label: {
                  color: "#4a5565",
                  fontSize: "16px",
                  margin: "0 0 8px 0",
                  letterSpacing: " 0.05em",
                },
                input: { padding: "22px 16px", borderColor: "#4a5565", borderRadius: "6px" },
                dropdown: { border: "1px solid #4a5565" },
              }}
              label="Select Gender"
              data={config.form.gender}
            />
          )}
        />
        {errors?.gender?.message && (
          <ErrorMessage message={errors?.gender?.message} />
        )}

        <div className=" mt-8 flex justify-between items-center">
          <div
            onClick={() => navigate(-1)}
            className={` px-4 py-2 cursor-pointer rounded-md bg-gray-500 `}
          >
            Back
          </div>

          <button
            disabled={!isValid}
            onClick={() =>
              navigate(
                "../" +
                  routes.multiForm.children.educationQualificationDetails.path
              )
            }
            className={`rounded-md bg-amber-500 ${
              isValid
                ? " opacity-100 cursor-pointer "
                : " opacity-50 cursor-not-allowed"
            }`}
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
}

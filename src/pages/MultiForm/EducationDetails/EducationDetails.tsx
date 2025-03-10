import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./educationDetails.schema";
import TextBox from "../../../components/TextBox";
import {
  IEducationData,
  useAppContext,
} from "../../../appProvider/AppProvider";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../app-wrapper/routes";
import { Select } from "@mantine/core";
import { ErrorMessage } from "../../../components/ErrorMessage";
import config from "../../../config/config";

export default function EducationDetails() {
  const { formData, setForm, updatePercentDone } = useAppContext();
  const navigate = useNavigate();

  const {
    watch,
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IEducationData>({
    defaultValues: {
      college: formData.educationData?.college || "",
      degree: formData.educationData?.degree || "",
      gradYear: formData.educationData?.gradYear || "",
      startYear: formData.educationData?.startYear || "",
    },
    resolver: yupResolver(schema),
  });

  watch("degree");

  const onSubmit = handleSubmit((data: IEducationData) => {
    setForm((prev) => ({
      ...prev,
      educationData: data,
    }));
  });
  return (
    <section className=" flex w-full bg-white p-8 rounded-b-md  flex-col ">
      <div className=" text-2xl font-extrabold text-gray-800 ">
        Education Qualification
      </div>
      <span className=" text-gray-600 text-sm tracking-wider">
        Please fill the details to proceed
      </span>
      <form
        className=" flex w-full bg-white rounded-md mt-8  flex-col gap-4"
        onSubmit={onSubmit}
      >
        <Controller
          control={control}
          name="degree"
          render={({ field: props }) => (
            <Select
              placeholder="Select Degree"
              {...props}
              styles={{
                label: {
                  color: "#4a5565",
                  fontSize: "16px",
                  margin: "0 0 8px 0",
                  letterSpacing: " 0.05em",
                },
                input: {
                  padding: "22px 16px",
                  borderColor: "#4a5565",
                  borderRadius: "6px",
                },
                dropdown: { border: "1px solid #4a5565" },
              }}
              label="Select Degree"
              data={config.form.degree}
            />
          )}
        />
        {errors?.degree?.message && (
          <ErrorMessage message={errors?.degree?.message} />
        )}

        {!!getValues("degree").length && (
          <>
            <TextBox
              label="college"
              {...register("college")}
              error={errors?.college?.message}
            />
            <div className=" flex items-center gap-4">
              <TextBox
                type="date"
                label="startYear"
                {...register("startYear")}
                error={errors?.startYear?.message}
              />
              <TextBox
                type="date"
                label="gradYear"
                {...register("gradYear")}
                error={errors?.gradYear?.message}
              />
            </div>
          </>
        )}

        <div className=" mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              updatePercentDone(() =>
                navigate("../" + routes.multiForm.children.personalDetails.path)
              );
            }}
            className={` px-4 py-2 rounded-md bg-gray-500 `}
          >
            Back
          </button>

          <button
            disabled={!isValid}
            onClick={() =>
              navigate("../" + routes.multiForm.children.submittedData.path)
            }
            className={` px-4 py-2 rounded-md bg-amber-500 ${
              isValid
                ? " opacity-100 cursor-pointer "
                : " opacity-50 cursor-not-allowed"
            }`}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

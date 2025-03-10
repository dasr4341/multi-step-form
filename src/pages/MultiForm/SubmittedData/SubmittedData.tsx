import { useAppContext } from "../../../appProvider/AppProvider";

export default function SubmittedData() {
  const { formData } = useAppContext();
  console.log({ formData });

  const DetailsPoint = ({ label, value }: { label: string; value: string }) => (
    <div className=" flex items-center gap-2">
      <span className=" capitalize font-extrabold text-gray-600 ">
        {label} -
      </span>
      <span>{value}</span>
    </div>
  );
  return (
    <section className=" flex w-full bg-white p-8 rounded-b-md  flex-col ">
      <div className="flex flex-col ">
        <div className="text-gray-800 font-extrabold text-xl tracking-wider mb-4">
          Personal Data
        </div>
        {formData?.personalData &&
          Object.entries(formData.personalData)?.map(([label, value]) => (
            <DetailsPoint label={label} value={value} />
          ))}
      </div>
      <hr className=" w-full my-4  text-gray-300" />
      <div className="flex flex-col ">
        <div className="text-gray-800 font-extrabold text-xl tracking-wider mb-4">
          Education Qualification
        </div>
        {formData?.personalData &&
          Object.entries(formData.personalData)?.map(([label, value]) => (
            <DetailsPoint label={label} value={value} />
          ))}
      </div>
    </section>
  );
}

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../appProvider/AppProvider";
import { routes } from "../../app-wrapper/routes";
import { useEffect } from "react";

export default function MultiForm() {
  const { percentDone, formData } = useAppContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isParentPage = pathname.replaceAll('/', '') === routes.multiForm.path.replaceAll('/', '');

  useEffect(() => {
    if (!formData.personalData && !formData.educationData) {
      navigate(routes.multiForm.path);
    } else if (!formData.personalData) {
      navigate(routes.multiForm.children.personalDetails.path);
    } else if (!formData.educationData) {
      navigate(routes.multiForm.children.educationQualificationDetails.path);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);


  return (
    <div>
      <div className=" flex w-11/12 md:w-8/12 lg:w-1/2  m-auto  items-center p-12  flex-col justify-center ">
        <div className="w-full px-8 py-4 bg-gray-200 rounded-t-md">
          <div className=" text-3xl font-extrabold ">Welcome !!</div>

          {isParentPage && (
            <div className=" mt-8 flex flex-col ">
              <p className=" text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                culpa!Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Alias, culpa!Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Alias, culpa!Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Alias, culpa!
              </p>
              <button
                onClick={() =>
                  navigate(routes.multiForm.children.personalDetails.path)
                }
                className={` self-end rounded-md bg-amber-500 cursor-pointer `}
                type="submit"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div
          className={`h-2 self-start ${
            Number(percentDone) / 100 < 1
              ? `w-[${Number(percentDone)}%]`
              : "w-full"
          } bg-blue-700`}
        ></div>
        <Outlet />
      </div>
    </div>
  );
}

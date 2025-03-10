import { createContext, useContext, useEffect, useState } from "react";

export interface IPersonalData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

export interface IEducationData {
  gradYear: string;
  college: string;
  degree: string;
  startYear: string;
}

interface IFormData {
  personalData: IPersonalData | null;
  educationData: IEducationData | null;
}

interface IAppContext {
  formData: IFormData;
  setForm: React.Dispatch<React.SetStateAction<IFormData>>;
  percentDone: number;
  updatePercentDone: (cb?: () => void) => void;
}

const AppContext = createContext<IAppContext>({
  formData: {
    personalData: {
      firstName: null,
      lastName: null,
      age: null,
      gender: null,
    },
    educationData: null,
  },
  setForm: () => {},
  updatePercentDone: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [form, setForm] = useState<IFormData>({
    personalData: null,
    educationData: null,
  });
  const [formCompletePercent, setFormCompletePercent] = useState(0);

  useEffect(() => {
    setFormCompletePercent(() => {
      if (!!form.personalData && !!form.educationData) {
        return 100;
      } else if (!!form.personalData || !!form.educationData) {
        return 50;
      } else {
        return 0;
      }
    });
  }, [form.educationData, form.personalData]);

  return (
    <AppContext.Provider
      value={{
        formData: form,
        setForm,
        percentDone: formCompletePercent,
        updatePercentDone: (cb) => {
          const points = Object.keys(form).length;
          const perPage = (1 / points) * 100;
          if (cb) cb();
          setFormCompletePercent((e) => e - perPage);
          
          return;
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

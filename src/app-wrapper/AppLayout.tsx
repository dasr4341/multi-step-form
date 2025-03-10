import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import MultiForm from '../pages/MultiForm/MultiForm';
import PersonalDetailsForm from '../pages/MultiForm/PersonalDetails/PersonalDetailsForm';
import EducationDetails from '../pages/MultiForm/EducationDetails/EducationDetails';
import SubmittedData from '../pages/MultiForm/SubmittedData/SubmittedData';

export default function AppWrapper() {
  return (
    <Routes>
      <Route path={routes.multiForm.path}  element={<MultiForm />}  >
        <Route path={routes.multiForm.children.personalDetails.path} element={<PersonalDetailsForm/>} />
        <Route path={routes.multiForm.children.educationQualificationDetails.path} element={<EducationDetails/>} />
        <Route path={routes.multiForm.children.submittedData.path} element={<SubmittedData/>} />
      </Route>
      <Route path={'*'}  element={<>Page Not Found !!</>}  />
    </Routes>
  )
}

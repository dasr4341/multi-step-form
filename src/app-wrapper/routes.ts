export const routes = {
    multiForm: {
        path: '/multi-form/',
        children: {
            personalDetails: {
                path: 'personal-details'
            },
            educationQualificationDetails: {
                path: 'education-qualification-details'
            },
            submittedData: {
                path: 'submitted-data'
            }
        }
    }
}
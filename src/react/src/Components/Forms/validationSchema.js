import * as Yup from 'yup';

Yup.setLocale({
    mixed: {
        required: 'Required field'
    },
});

let validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Make the title longer than 5 characters.')
        .max(30, 'Make the title less than 30 characters.')
        .matches(/^[0-9a-z_-]+$/i, 'Remove any spaces or special characters.')
        .required(),
    
    candidates: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
                .min(5, 'Make the title longer than 5 characters.')
                .max(30, 'Make the title less than 30 characters.')
                .matches(/^[0-9a-z_-]+$/i, 'Remove any spaces or special characters.'),
            
            source: Yup.object().shape({
                rightAscension: Yup.number().required(),
                declination: Yup.number().required(),
                frequency: Yup.number().required(),
                isBinary: Yup.boolean().required(),
                binary: Yup.object().when(
                    'isBinary', {
                        is: true,
                        then: Yup.object().shape({
                            semiMajorAxis: Yup.number().required() ,
                            orbitalPhase: Yup.number()
                                .transform((value) => (isNaN(value) ? null : value)).nullable(),
                            timeOfAscension: Yup.number()
                                .transform((value) => (isNaN(value) ? null : value)).nullable(),
                            orbitalPeriod: Yup.number().required() ,
                            orbitalEccentricity: Yup.number()
                                .transform((value) => (isNaN(value) ? null : value)).nullable(),
                            orbitalArgumentOfPeriapse: Yup.number()
                                .transform((value) => (isNaN(value) ? null : value)).nullable()
                        })
                    }
                )
            }),

            search: Yup.object().shape({
                module: Yup.string().oneOf(['viterbi']).required(),
                sourceDataset: Yup.string().oneOf(['o1', 'o2', 'o3', 'o4']).required(),
                detectors: Yup.array().of(Yup.string().oneOf(['h1', 'l1', 'v1', 'k1', 'g1'])).min(1).required(),
                startTime: Yup.number().required(),
                endTime: Yup.number().required(),
                detectionStatistic: Yup.number().required(),
                other: Yup.object().when(
                    'module', (searchModule) => {
                        switch (searchModule) {
                        case 'viterbi':
                            return Yup.object().shape({
                                coherenceTime: Yup.number().required(),
                                likelihood: Yup.number().required(),
                                score: Yup.number().required(),
                                threshold: Yup.number().required()
                            });
                        }
                    }
                )
            })
        })
    ).required('Must have candidates')
        .min(1, 'Include at least 1 candidate'),
});

export default validationSchema;

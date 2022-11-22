import * as Yup from 'yup';

Yup.setLocale({
    mixed: {
        required: 'Required field'
    },
});

let requiredNumber = Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .typeError('Must be a number')
    .required();
    
let nullableNumber = Yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .nullable();

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
                rightAscension: requiredNumber,
                declination: requiredNumber,
                frequency: requiredNumber,
                isBinary: Yup.boolean().required(),
                binary: Yup.object().when(
                    'isBinary', {
                        is: true,
                        then: Yup.object().shape({
                            semiMajorAxis: requiredNumber ,
                            orbitalPhase: nullableNumber
                                .test(
                                    'Orbital phase or time of ascensino',
                                    'Specify only one of orbital phase or time of ascension',
                                    (value, {parent}) => !(value && parent.timeOfAscension)
                                ),
                            timeOfAscension: nullableNumber
                                .test(
                                    'Orbital phase or time of ascensino',
                                    'Specify only one of orbital phase or time of ascension',
                                    (value, {parent}) => !(value && parent.orbitalPhase)
                                ),
                            orbitalPeriod: requiredNumber ,
                            orbitalEccentricity: nullableNumber,
                            orbitalArgumentOfPeriapse: nullableNumber
                        })
                    }
                )
            }),

            search: Yup.object().shape({
                module: Yup.string().oneOf(['viterbi']).required(),
                sourceDataset: Yup.string().oneOf(['o1', 'o2', 'o3', 'o4']).required(),
                detectors: Yup.array().of(Yup.string().oneOf(['h1', 'l1', 'v1', 'k1', 'g1'])).min(1).required(),
                startTime: requiredNumber,
                endTime: requiredNumber,
                detectionStatistic: requiredNumber,
                other: Yup.object().when(
                    'module', (searchModule) => {
                        switch (searchModule) {
                        case 'viterbi':
                            return Yup.object().shape({
                                viterbi: Yup.object().shape({
                                    coherenceTime: requiredNumber,
                                    likelihood: requiredNumber,
                                    score: requiredNumber,
                                    threshold: requiredNumber
                                })
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

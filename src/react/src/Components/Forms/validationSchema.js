import * as Yup from 'yup';
import { readString } from 'react-papaparse';
import { isNaNCorrected } from '../../Utils/misc';

Yup.setLocale({
    mixed: {
        required: 'Required field'
    },
});

let requiredNumber = Yup.number()
    .transform((value) => (isNaNCorrected(value) ? undefined : value))
    .typeError('Must be a number')
    .required();
    
let nullableNumber = Yup.number()
    .transform((value) => (isNaNCorrected(value) ? null : value))
    .nullable();

let validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Make the name longer than 5 characters.')
        .max(30, 'Make the name less than 30 characters.')
        .matches(/^[0-9a-z_-]+$/i, 'Remove any spaces or special characters.')
        .required(),
    
    candidates: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
                .min(5, 'Make the name longer than 5 characters.')
                .max(30, 'Make the name less than 30 characters.')
                .matches(/^[0-9a-z_-]+$/i, 'Remove any spaces or special characters.')
                .transform((value) => (value || null))
                .nullable(),
                
            description: Yup.string()
                .transform((value) => (value || null))
                .nullable(),
            
            source: Yup.object().shape({
                rightAscension: requiredNumber,
                declination: requiredNumber,
                frequency: requiredNumber,
                frequencyPath: Yup.array()
                    .transform((value, originalValue) => readString(originalValue, {
                        transform: val => isNaNCorrected(val) ? null : val
                    }).data[0])
                    .of(Yup.number())
                    .default([]),
                isBinary: Yup.boolean().required(),
                binary: Yup.object().when(
                    'isBinary', {
                        is: true,
                        then: Yup.object().shape({
                            semiMajorAxis: requiredNumber ,
                            orbitalPhase: nullableNumber
                                .test(
                                    'Orbital phase or time of ascension',
                                    'Specify only one of orbital phase or time of ascension',
                                    (value, {parent}) => !(value && parent.timeOfAscension)
                                ),
                            timeOfAscension: nullableNumber
                                .test(
                                    'Orbital phase or time of ascension',
                                    'Specify only one of orbital phase or time of ascension',
                                    (value, {parent}) => !(value && parent.orbitalPhase)
                                ),
                            orbitalPeriod: requiredNumber ,
                            orbitalEccentricity: nullableNumber,
                            orbitalArgumentOfPeriapse: nullableNumber
                        }),
                        otherwise: Yup.object().shape({}).transform(_val => null).nullable()
                    }
                )
            }),

            search: Yup.object().shape({
                module: Yup.string().oneOf(['viterbi']).required(),
                sourceDataset: Yup.string().oneOf(['o1', 'o2', 'o3', 'o4']).required(),
                detectors: Yup.array().of(Yup.string().oneOf(['h1', 'l1', 'v1', 'k1', 'g1'])).min(1).required(),
                startTime: requiredNumber.lessThan(Yup.ref('endTime'), 'Must be smaller than end time'),
                endTime: requiredNumber.moreThan(Yup.ref('startTime'), 'Must be greater than start time'),
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

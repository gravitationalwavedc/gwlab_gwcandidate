import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';
import { createCandidate, resetCounter } from './initialValues';
import _ from 'lodash';

let validationSchema = Yup.array().of(
    Yup.object().shape({
        rightAscension: Yup.number().nullable(),
        declination: Yup.number().nullable(),
        frequency: Yup.number().nullable(),
        isBinary: Yup.boolean(),

        semiMajorAxis: Yup.number().nullable() ,
        orbitalPhase: Yup.number().nullable() ,
        timeOfAscension: Yup.number().nullable() ,
        orbitalPeriod: Yup.number().nullable() ,
        orbitalEccentricity: Yup.number().nullable() ,
        orbitalArgumentOfPeriapse: Yup.number().nullable(),

        module: Yup.string().oneOf(['viterbi']),
        sourceDataset: Yup.string().oneOf(['o1', 'o2', 'o3', 'o4'], '${path} must be in the range O1-4'),
        detectors: Yup.array().of(Yup.string().oneOf(['h1', 'l1', 'v1', 'k1', 'g1'])),
        startTime: Yup.number().nullable(),
        endTime: Yup.number().nullable(),
        detectionStatistic: Yup.number().nullable(),

        coherenceTime: Yup.number().nullable(),
        likelihood: Yup.number().nullable(),
        score: Yup.number().nullable(),
        threshold: Yup.number().nullable()
    }).noUnknown(true, 'Unknown column heading: ${unknown}')
).min(1, 'Include at least 1 candidate');

const CSVUpload = ({ text }) => {
    const { CSVReader } = useCSVReader();
    const { setFieldValue } = useFormikContext();
    const [error, setError] = useState(null);
    const saveData = (data) => {
        resetCounter();
        const candidates = data.map(candidate => _.merge(
            createCandidate(),
            {
                source: {
                    rightAscension: candidate.rightAscension,
                    declination: candidate.declination,
                    frequency: candidate.frequency,
                    isBinary: candidate.isBinary,
            
                    binary: {
                        semiMajorAxis: candidate.semiMajorAxis,
                        orbitalPhase: candidate.orbitalPhase,
                        timeOfAscension: candidate.timeOfAscension,
                        orbitalPeriod: candidate.orbitalPeriod,
                        orbitalEccentricity: candidate.orbitalEccentricity,
                        orbitalArgumentOfPeriapse: candidate.orbitalArgumentOfPeriapse,
                    }
                },
                search: {
                    module: candidate.module,
                    sourceDataset: candidate.sourceDataset,
                    detectors: candidate.detectors,
                    startTime: candidate.startTime,
                    endTime: candidate.endTime,
                    detectionStatistic: candidate.detectionStatistic,
            
                    other: {
                        viterbi: {
                            coherenceTime: candidate.coherenceTime,
                            likelihood: candidate.likelihood,
                            score: candidate.score,
                            threshold: candidate.threshold
                        }
                    }
                }
            }
        ));
        setFieldValue('candidates', candidates);
    };

    return <CSVReader
        onUploadAccepted={({data}) => {
            try {
                validationSchema.validateSync(data, {stripUnknown: false});
                saveData(data);
                setError(null);
            } catch (error) {
                setError(error.errors);
            }
        }}
        config={{
            skipEmptyLines: true,
            transform: (value, header) => (
                // Converts detectors column into an array, otherwise preps for dynamic typing
                header === 'detectors'
                    ? value.replace(/\s/g, '').toLowerCase().split(';')
                    : value.trim().toLowerCase()
            ),
            dynamicTyping: true,
            header: true,
            transformHeader: value => value.trim(),
        }}
    >
        {
            ({getRootProps}) => <React.Fragment>
                <Button {...getRootProps()}>
                    {text}
                </Button>
                {error && <p className="text-danger small">{error}</p>}
            </React.Fragment>
        }
    </CSVReader>;
};

export default CSVUpload;

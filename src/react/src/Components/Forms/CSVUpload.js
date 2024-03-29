import React, { useState } from 'react';
import { useCSVReader, readString } from 'react-papaparse';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';
import { createCandidate, resetCounter } from './initialValues';
import _ from 'lodash';
import { isNaNCorrected } from '../../Utils/misc';

let validationSchema = Yup.array().of(
    Yup.object().shape({
        name: Yup.string().nullable(),
        description: Yup.string().nullable(),

        rightAscension: Yup.number().nullable(),
        declination: Yup.number().nullable(),
        frequency: Yup.number().nullable(),
        frequencyPath: Yup.array()
            .transform((value, originalValue) => readString(originalValue, {
                transform: val => isNaNCorrected(val) ? null : val
            }).data[0])
            .of(Yup.number()),
        binary: Yup.boolean(),

        asini: Yup.number().nullable() ,
        phiA: Yup.number().nullable() ,
        tAsc: Yup.number().nullable() ,
        orbitP: Yup.number().nullable() ,
        orbitEcc: Yup.number().nullable() ,
        orbitArgp: Yup.number().nullable(),

        module: Yup.string().oneOf(['viterbi']),
        sourceDataset: Yup.string().oneOf(
            ['o1', 'o2', 'o3', 's1', 's2', 's3', 's4', 's5', 's6'],
            '${path} must be in the range O1-3 or S1-6'
        ),
        detectors: Yup.array().of(Yup.string().oneOf(['h1', 'l1', 'v1', 'k1', 'g1'])),
        tStart: Yup.number().nullable(),
        tEnd: Yup.number().nullable(),
        detectionStatistic: Yup.number().nullable(),

        tCoh: Yup.number().nullable(),
        viterbiLikelihood: Yup.number().nullable(),
        viterbiScore: Yup.number().nullable(),
        viterbiThreshold: Yup.number().nullable()
    }).noUnknown(true, 'Unknown column heading: ${unknown}')
).min(1, 'Include at least 1 candidate');

const CSVUpload = ({ text, buttonProps }) => {
    const { CSVReader } = useCSVReader();
    const { setFieldValue } = useFormikContext();
    const [error, setError] = useState(null);
    const saveData = (data) => {
        resetCounter();
        const candidates = data.map(candidate => _.merge(
            createCandidate(),
            {
                name: candidate.name || '',
                description: candidate.description || '',
                source: {
                    rightAscension: candidate.rightAscension,
                    declination: candidate.declination,
                    frequency: candidate.frequency,
                    frequencyPath: candidate.frequencyPath,
                    isBinary: candidate.binary,
            
                    binary: {
                        semiMajorAxis: candidate.asini,
                        orbitalPhase: candidate.phiA,
                        timeOfAscension: candidate.tAsc,
                        orbitalPeriod: candidate.orbitP,
                        orbitalEccentricity: candidate.orbitEcc,
                        orbitalArgumentOfPeriapse: candidate.orbitArgp,
                    }
                },
                search: {
                    module: candidate.module,
                    sourceDataset: candidate.sourceDataset,
                    detectors: candidate.detectors,
                    startTime: candidate.tStart,
                    endTime: candidate.tEnd,
                    detectionStatistic: candidate.detectionStatistic,
            
                    other: {
                        viterbi: {
                            coherenceTime: candidate.tCoh,
                            likelihood: candidate.viterbiLikelihood,
                            score: candidate.viterbiScore,
                            threshold: candidate.viterbiThreshold
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
            quoteChar: '"',
            escapeChar: '"',
            skipEmptyLines: true,
            transform: (value, header) => (
                // Converts detectors column into an array, otherwise preps for dynamic typing
                header === 'detectors'
                    ? value.replace(/\s/g, '').toLowerCase().split(';')
                    : value.trim().toLowerCase()
            ),
            dynamicTyping: true,
            header: true,
            transformHeader: value => _.camelCase(value.trim()),
        }}
    >
        {
            ({getRootProps}) => <React.Fragment>
                <Button {...getRootProps()} {...buttonProps}>
                    {text}
                </Button>
                {error && <p className="text-danger small">{error}</p>}
            </React.Fragment>
        }
    </CSVReader>;
};

export default CSVUpload;

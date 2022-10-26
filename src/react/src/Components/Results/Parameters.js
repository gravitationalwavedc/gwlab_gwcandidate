import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import ResultTable from './ResultTable';

const Parameters = ({ candidateData }) => {
    const data = candidateData;
    const values = Object.keys(data).reduce((result, key) => {
        Object.keys(data[key]).map((item) => {
            result[item] = data[key][item];
        });
        return result;
    }, {});


    return (
        <React.Fragment>
            <ResultTable 
                title='General Search Parameters'
                headings={['Module', 'Source dataset', 'Detectors', 'Start time', 'End time', 'Detection statistic']}
                data={[
                    values.module,
                    values.sourceDataset,
                    values.detectors,
                    values.startTime,
                    values.endTime,
                    values.detectionStatistic
                ]}
            />
            {
                values.module == 'viterbi' && <ResultTable 
                    headings={['Coherence time', 'Likelihood', 'Score', 'Threshold']}
                    data={[
                        values.coherenceTime,
                        values.likelihood,
                        values.score,
                        values.threshold,
                    ]}
                />
            }
            <ResultTable 
                title='Source Parameters'
                headings={['Right ascension', 'Declination', 'Frequency', 'Frequency path']}
                data={[
                    values.rightAscension,
                    values.declination,
                    values.frequency,
                    values.frequencyPath
                ]}
            />
            {
                data.binary && <ResultTable 
                    headings={['Semi-major axis', 'Orbital phase', 'Time of ascension', 'Orbital period', 'Orbital eccentricity', 'Orbital Argument of Periapse']}
                    data={[
                        values.semiMajorAxis,
                        values.orbitalPhase,
                        values.timeOfAscension,
                        values.orbitalPeriod,
                        values.orbitalEccentricity,
                        values.orbitalArgumentOfPeriapse
                    ]}
                />
            }
        </React.Fragment>
    );
};

export default createFragmentContainer(Parameters, {
    candidateData: graphql`
        fragment Parameters_candidateData on CandidateNode {
            search {
                module
                sourceDataset
                detectors
                startTime
                endTime
                detectionStatistic
                other {
                    ... on ViterbiInfoType {
                        coherenceTime
                        likelihood
                        score
                        threshold
                    }
                }
            }
            source {
                rightAscension
                declination
                frequency
                frequencyPath
                binary {
                    semiMajorAxis
                    orbitalPhase
                    timeOfAscension
                    orbitalPeriod
                    orbitalEccentricity
                    orbitalArgumentOfPeriapse
                }
            }
        }
    `
});

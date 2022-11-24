// You lot can tell me off for this pattern all you want
var index = 0;

const resetCounter = () => index = 0;

const createCandidate = () => {
    index++;
    return {
        id: index,
        name: `Candidate-${index}`,
        description: 'A good description is specific, unique, and memorable.',

        source: {
        // General source inputs
            rightAscension: 1.0,
            declination: 1.0,
            frequency: 1.0,
            frequencyPath: null,
            isBinary: true,

            // Binary source inputs
            binary: {
                semiMajorAxis: 1.0 ,
                orbitalPhase: null ,
                timeOfAscension: null ,
                orbitalPeriod: 1.0 ,
                orbitalEccentricity: 0 ,
                orbitalArgumentOfPeriapse: null 
            }
        },
        search: {
        // General search inputs
            module: 'viterbi',
            sourceDataset: 'o1',
            detectors: ['h1'],
            startTime: 1.0,
            endTime: 2.0,
            detectionStatistic: 1.0,

            other: {
                viterbi: {
                    coherenceTime: 1.0,
                    likelihood: 1.0,
                    score: 1.0,
                    threshold: 1.0
                }
            }
        }
    };
};


const initialValues = {
    // Job Details
    name: 'Untitled',
    description: 'A good description is specific, unique, and memorable.',

    candidates: [
        createCandidate()
    ],
    
};

export default initialValues;
export {createCandidate, resetCounter};

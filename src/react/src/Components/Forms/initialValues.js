const initialValues = {
    // Job Details
    name: 'Untitled',
    description: 'A good description is specific, unique, and memorable.',

    candidates: [
        {
            name: 'Name',
            description: 'Description',

            source: {
                // General source inputs
                rightAscension: 1.0,
                declination: 1.0,
                frequency: 1.0,
                frequencyPath: '',
                isBinary: true,

                // Binary source inputs
                semiMajorAxis: 1.0 ,
                orbitalPhase: '' ,
                timeOfAscension: '' ,
                orbitalPeriod: 1.0 ,
                orbitalEccentricity: '' ,
                orbitalArgumentOfPeriapse: '' 
            },
            search: {
                // General search inputs
                module: 'viterbi',
                sourceDataset: 'O1',
                detectors: ['H1'],
                startTime: 1.0,
                endTime: 2.0,
                detectionStatistic: 1.0,

                // Viterbi specific
                coherenceTime: 1.0,
                likelihood: 1.0,
                score: 1.0,
                threshold: 1.0
            }
        }
    ],
    
};

export default initialValues;

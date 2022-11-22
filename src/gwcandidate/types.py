from graphene import InputObjectType, ObjectType, Int, Float, String, Boolean, List, Field


class OutputStartType(ObjectType):
    name = String()
    description = String()
    private = Boolean()


class ViterbiInputType(InputObjectType):
    coherence_time = Float()
    likelihood = Float()
    score = Float()
    threshold = Float()


class OtherInputType(InputObjectType):
    viterbi = Field(ViterbiInputType, required=False)


class SearchInputType(InputObjectType):
    module = String()
    source_dataset = String()
    detectors = List(String)
    start_time = Float()
    end_time = Float()
    detection_statistic = Float()
    other = Field(OtherInputType)


class BinaryInputType(InputObjectType):
    semi_major_axis = Float()
    orbital_phase = Float(required=False)
    time_of_ascension = Float(required=False)
    orbital_period = Float()
    orbital_eccentricity = Float(required=False)
    orbital_argument_of_periapse = Float(required=False)


class SourceInputType(InputObjectType):
    right_ascension = Float()
    declination = Float()
    frequency = Float()
    frequency_path = List(Float, required=False)
    is_binary = Boolean()
    binary = Field(BinaryInputType, required=False)


class CandidateInputType(InputObjectType):
    name = String(required=False)
    description = String(required=False)
    job_id = Int(required=False)

    source = Field(SourceInputType)
    search = Field(SearchInputType)

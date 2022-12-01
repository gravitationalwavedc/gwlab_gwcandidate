from mongoengine import DynamicDocument, DynamicEmbeddedDocument
from mongoengine.fields import (
    StringField,
    FloatField,
    ListField,
    IntField,
    BooleanField,
    DateTimeField,
    ReferenceField,
    EmbeddedDocumentField,
    GenericEmbeddedDocumentField
)
from .handlers import update_last_updated
from .utils.misc import validate_name, utc_time


SOURCE_DATASET_CHOICES = (
    ('s1', 'S1'),
    ('s2', 'S2'),
    ('s3', 'S3'),
    ('s4', 'S4'),
    ('s5', 'S5'),
    ('s6', 'S6'),
    ('o1', 'O1'),
    ('o2', 'O2'),
    ('o3', 'O3'),
)

DETECTOR_CHOICES = (
    ('l1', 'L1'),
    ('h1', 'H1'),
    ('v1', 'V1'),
    ('k1', 'K1'),
    ('g1', 'G1')
)

MODULE_CHOICES = (
    ('viterbi', 'Viterbi'),
)


class ViterbiInfo(DynamicEmbeddedDocument):
    coherence_time = FloatField(required=True)
    likelihood = FloatField(required=True)
    score = FloatField(required=True)
    threshold = FloatField(required=True)


OTHER_INFO_CHOICES = (
    ViterbiInfo,
)


class SearchInfo(DynamicEmbeddedDocument):
    module = StringField(
        required=True,
        choices=MODULE_CHOICES
    )
    source_dataset = StringField(
        required=True,
        choices=SOURCE_DATASET_CHOICES
    )
    detectors = ListField(
        StringField(),
        required=True,
        choices=DETECTOR_CHOICES
    )
    start_time = FloatField(required=True)
    end_time = FloatField(required=True)
    detection_statistic = FloatField(required=True)

    other = GenericEmbeddedDocumentField(
        choices=OTHER_INFO_CHOICES
    )


class BinaryInfo(DynamicEmbeddedDocument):
    semi_major_axis = FloatField(required=True)
    orbital_phase = FloatField()
    time_of_ascension = FloatField()
    orbital_period = FloatField(required=True)
    orbital_eccentricity = FloatField()
    orbital_argument_of_periapse = FloatField()


class SourceInfo(DynamicEmbeddedDocument):
    right_ascension = FloatField(required=True)
    declination = FloatField(required=True)
    frequency = FloatField(required=True)
    frequency_path = ListField(FloatField())
    is_binary = BooleanField(required=True)

    binary = EmbeddedDocumentField(BinaryInfo)


@update_last_updated.apply
class Candidate(DynamicDocument):
    created = DateTimeField(default=utc_time)
    last_updated = DateTimeField(default=utc_time)
    user_id = IntField(required=True)
    job_id = IntField()

    name = StringField(validation=validate_name)
    description = StringField()

    search = EmbeddedDocumentField(SearchInfo)
    source = EmbeddedDocumentField(SourceInfo)


@update_last_updated.apply
class CandidateGroup(DynamicDocument):
    created = DateTimeField(default=utc_time)
    last_updated = DateTimeField(default=utc_time)
    user_id = IntField(required=True)

    name = StringField(validation=validate_name, unique_with="user_id")
    description = StringField()
    candidates = ListField(ReferenceField(Candidate))

    @property
    def n_candidates(self):
        return len(self.candidates)

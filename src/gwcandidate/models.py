from mongoengine import DynamicDocument, DynamicEmbeddedDocument
from mongoengine.fields import (
    StringField,
    FloatField,
    ListField,
    IntField,
    DateTimeField,
    ReferenceField,
    EmbeddedDocumentField,
    GenericEmbeddedDocumentField
)
from .handlers import update_last_updated
from .utils.misc import validate_name, utc_time


SOURCE_DATASET_CHOICES = (
    'S1',
    'S2',
    'S3',
    'S4',
    'S5',
    'S6',
    'O1',
    'O2',
    'O3',
)

DETECTOR_CHOICES = (
    'L1',
    'H1',
    'V1',
    'K1',
    'G1'
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


class CandidateGroup(DynamicDocument):
    created = DateTimeField(default=utc_time)
    last_updated = DateTimeField(default=utc_time)
    name = StringField(validation=validate_name)
    description = StringField()
    candidates = ListField(ReferenceField(Candidate))

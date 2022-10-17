from mongoengine import Document, DynamicDocument, DynamicEmbeddedDocument
from mongoengine.fields import (
    StringField,
    BooleanField,
    FloatField,
    ListField,
    IntField,
    EmbeddedDocumentField,
    GenericEmbeddedDocumentField
)
from .utils.misc import validate_name


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

class ViterbiInfo(DynamicEmbeddedDocument):
    coherence_time = FloatField(required=True)
    likelihood = FloatField(required=True)
    score = FloatField(required=True)
    threshold = FloatField(required=True)

MODULE_INFO_CHOICES = (
    ViterbiInfo,
)


class SearchInfo(DynamicEmbeddedDocument):
    source_dataset = StringField(
        required=True,
        choices=SOURCE_DATASET_CHOICES
    )
    detectors = ListField(
        StringField(),
        required=True,
        choices=DETECTOR_CHOICES
    )
    search_start_time = FloatField(required=True)
    search_end_time = FloatField(required=True)
    detection_statistic = FloatField(required=True)

    module = GenericEmbeddedDocumentField(
        required=True,
        choices=MODULE_INFO_CHOICES
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


class Candidate(DynamicDocument):
    user_id = IntField(required=True)
    job_id = IntField()

    name = StringField(validation=validate_name)
    description = StringField()


    search = EmbeddedDocumentField(SearchInfo)
    source = EmbeddedDocumentField(SourceInfo)

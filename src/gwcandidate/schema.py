import graphene
from graphene import relay
from graphene_mongo import MongoengineObjectType, MongoengineConnectionField

from .models import Candidate, SearchInfo, ViterbiInfo, SourceInfo, BinaryInfo
from .utils.auth.lookup_users import request_lookup_users


class BinaryInfoType(MongoengineObjectType):
    class Meta:
        model = BinaryInfo


class SourceInfoType(MongoengineObjectType):
    class Meta:
        model = SourceInfo


class ViterbiInfoType(MongoengineObjectType):
    class Meta:
        model = ViterbiInfo


class SearchInfoType(MongoengineObjectType):
    class Meta:
        model = SearchInfo

    detectors = graphene.String()

    def resolve_detectors(parent, info):
        print(parent.detectors)
        return ', '.join(parent.detectors)


class CandidateNode(MongoengineObjectType):
    class Meta:
        model = Candidate
        interfaces = (relay.Node,)
        required_fields = ('user_id',)

    user = graphene.String()

    def resolve_user(parent, info):
        success, users = request_lookup_users([parent.user_id], info.context.user.user_id)
        if success and users:
            return f"{users[0]['firstName']} {users[0]['lastName']}"
        return "Unknown User"


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    candidate = relay.Node.Field(CandidateNode)
    candidates = MongoengineConnectionField(CandidateNode)


class TestMutation(relay.ClientIDMutation):

    result = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return TestMutation(
            result="Hello Mutation!"
        )


class Mutation(graphene.ObjectType):
    test_mutation = TestMutation.Field()

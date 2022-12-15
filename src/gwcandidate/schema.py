import graphene
from graphene import relay
from graphql_relay.node.node import to_global_id
from graphene_mongo import MongoengineObjectType, MongoengineConnectionField

from .models import Candidate, CandidateGroup, SearchInfo, ViterbiInfo, SourceInfo, BinaryInfo
from .types import CandidateInputType
from .views import create_candidate_group
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
        return ', '.join(parent.detectors)


class CandidateNode(MongoengineObjectType):
    class Meta:
        model = Candidate
        interfaces = (relay.Node,)
        required_fields = ('user_id',)

    user = graphene.String()
    last_updated = graphene.String()

    def resolve_user(parent, info):
        success, users = request_lookup_users([parent.user_id], info.context.user.user_id)
        if success and users:
            return f"{users[0]['firstName']} {users[0]['lastName']}"
        return "Unknown User"

    def resolve_last_updated(parent, info):
        return parent.last_updated.strftime("%Y-%m-%d %H:%M:%S UTC")


class CandidateGroupNode(MongoengineObjectType):
    class Meta:
        model = CandidateGroup
        interfaces = (relay.Node,)
        required_fields = ('user_id', 'candidates', 'description')

    user = graphene.String()
    last_updated = graphene.String()
    n_candidates = graphene.Int()

    def resolve_user(parent, info):
        success, users = request_lookup_users([parent.user_id], info.context.user.user_id)
        if success and users:
            return f"{users[0]['firstName']} {users[0]['lastName']}"
        return "Unknown User"

    def resolve_last_updated(parent, info):
        return parent.last_updated.strftime("%Y-%m-%d %H:%M:%S UTC")


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    candidate = relay.Node.Field(CandidateNode)
    candidates = MongoengineConnectionField(CandidateNode)
    candidate_group = relay.Node.Field(CandidateGroupNode)
    candidate_groups = MongoengineConnectionField(CandidateGroupNode)


class CandidatesCreationResult(graphene.ObjectType):
    group_id = graphene.String()


class NewCandidatesMutation(relay.ClientIDMutation):
    class Input:
        name = graphene.String()
        description = graphene.String()
        candidates = graphene.List(CandidateInputType)

    result = graphene.Field(CandidatesCreationResult)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        print(kwargs)
        candidate_group = create_candidate_group(info.context.user, **kwargs)
        print(candidate_group)
        # Convert the viterbi job id to a global id
        group_id = to_global_id("CandidateGroupNode", candidate_group.id)

        return NewCandidatesMutation(
            result=CandidatesCreationResult(group_id=group_id)
        )


class Mutation(graphene.ObjectType):
    new_candidates = NewCandidatesMutation.Field()

import graphene
from graphene import relay


class Query(object):
    test = graphene.String()

    def resolve_test(self, info, **kwargs):
        return "Hello world!"


class TestMutation(relay.ClientIDMutation):

    result = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return TestMutation(
            result="Hello Mutation!"
        )


class Mutation(graphene.ObjectType):
    test_mutation = TestMutation.Field()

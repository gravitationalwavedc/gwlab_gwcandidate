import graphene
import gwcandidate.schema


class Query(gwcandidate.schema.Query, graphene.ObjectType):
    pass


class Mutation(gwcandidate.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

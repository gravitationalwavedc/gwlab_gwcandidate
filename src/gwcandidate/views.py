from .models import CandidateGroup, Candidate, SourceInfo, BinaryInfo, SearchInfo, ViterbiInfo


def create_candidate(user_id, job_id, name, description, search, source):
    other = search.pop('other')
    if search.module == 'viterbi':
        other_info = ViterbiInfo(**other.viterbi)

    search_info = SearchInfo(
        **search,
        other=other_info or None
    )

    binary = source.pop('binary', None)
    if source.is_binary and binary:
        source_info = SourceInfo(**source, binary=BinaryInfo(**binary))
    else:
        source_info = SourceInfo(**source)

    candidate = Candidate(
        name=name or None,
        description=description or None,
        user_id=user_id,
        job_id=job_id,
        search=search_info,
        source=source_info
    )

    candidate.save()

    return candidate


def create_candidate_group(user, name, description, candidates):
    # Remove any created documents if something breaks
    try:
        candidate_objects = []  # Must be defined in case it encounters error in the next step
        candidate_objects = [create_candidate(user.user_id, **c) for c in candidates]
        candidate_group = CandidateGroup(
            user_id=user.user_id,
            name=name,
            description=description,
            candidates=candidate_objects
        ).save()
    except Exception:
        for candidate in candidate_objects:
            candidate.delete()
        raise

    return candidate_group

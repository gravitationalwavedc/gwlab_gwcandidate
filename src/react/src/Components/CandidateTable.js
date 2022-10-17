import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CandidateCard from './CandidateCard';

const CandidateTable = ({ data, match, router, hasMore, loadMore }) => (
    <InfiniteScroll
        dataLength={data.edges.length}
        next={loadMore}
        hasMore={hasMore}
        loader='Scroll to load more...'
        className="Candidates-container"
    >
        {data.edges.map(({node}) => 
            <CandidateCard key={node.id} node={node} match={match} router={router} />)
        }
    </InfiniteScroll>);

export default CandidateTable;


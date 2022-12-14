import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CandidateTableBody from './CandidateTableBody';

const CandidateTable = ({ data, match, router, hasMore, loadMore }) => (
    <InfiniteScroll
        dataLength={data.edges.length}
        next={loadMore}
        hasMore={hasMore}
        loader='Scroll to load more...'
    >
        {data.edges.map(({node}) => 
            <CandidateTableBody key={node.id} node={node} match={match} router={router} />)
        }
    </InfiniteScroll>);

export default CandidateTable;


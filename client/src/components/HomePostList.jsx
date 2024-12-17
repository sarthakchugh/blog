import React from 'react';
import PostListItem from './PostListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchPosts = async (pageParam, searchParams) => {
    const searchParamsObj = Object.fromEntries([...searchParams]);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
        params: { page: pageParam, limit: 10, ...searchParamsObj },
    });
    return response.data;
};

const HomePostList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
        useInfiniteQuery({
            queryKey: ['posts', searchParams.toString()],
            queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length + 1 : undefined),
        });

    if (isFetching) {
        return 'Loading...';
    }

    if (status === 'error') {
        return `Something went wrong!`;
    }

    const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

    return (
        <InfiniteScroll
            dataLength={allPosts.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={
                allPosts?.length > 0 ? (
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                ) : (
                    <p style={{ textAlign: 'center' }}>
                        <b>There are no posts for this category. Maybe create a post?</b>
                    </p>
                )
            }
        >
            {allPosts?.map((post) => (
                <PostListItem key={post._id} post={post} />
            ))}
        </InfiniteScroll>
    );
};

export default HomePostList;

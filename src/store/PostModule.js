import axios from "axios";

export const PostModule = {
    state: () => ({
        posts: [],
        isPostsLoading: true,
        selectedSort: '',
        sortOptions: [
            {value: 'title', label: 'По названию'},
            {value: 'body', label: 'По описанию'}
        ],
        SearchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0
    }),
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, isPostsLoading) {
            state.isPostsLoading = isPostsLoading
        },
        setSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, SearchQuery) {
            state.SearchQuery = SearchQuery
        },
        setLimit(state, limit) {
            state.limit = limit
        },
        setSortOptions(state, sortOptions) {
            state.sortOptions = sortOptions
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit));
                commit('setPosts', response.data);
                commit('setLoading', false);
            } catch (e) {
                alert(e.message);
            }
        },
    },
    getters: {
        sortedPosts(state) {
            return [state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
            })
        },

        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => {post.title.toLowerCase().includes(state.SearchQuery.toLowerCase())});
        }
    }
}
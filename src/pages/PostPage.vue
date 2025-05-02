<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  name: "App",
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
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
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },

    /*changePage(pageNumber) {
      this.page = pageNumber;
    },*/

    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
        this.isPostsLoading = false;
      } catch (e) {
        alert(e.message);
      }
    },

    async loadMorePosts() {
      try {
        this.page++;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
        this.isPostsLoading = false;
      } catch (e) {
        alert(e.message);
      }
    }
  },

  mounted() {
    this.fetchPosts();

    /*const options = {
      rootMargin: '0px 0px 75px 0px',
      threshold: 0,
    }

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(this.$refs.observer);*/
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
      })
    },

    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => {post.title.toLowerCase().includes(this.SearchQuery.toLowerCase())});
    }
  },

  watch: {
    /*page() {
      this.fetchPosts();
    }*/
  }
}
</script>

<template>
  <div>
    <h1>Страница с постами</h1>

    <my-input
        v-model="SearchQuery"
        placeholder="Поиск по названию"
        v-focus
    >

    </my-input>

    <div class="app__btns">
      <my-button
          @click="dialogVisible = true"
      >
        Создать пост
      </my-button>

      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      >

      </my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="sortedPosts"
        @remove="removePost"
        v-if="isPostsLoading !== true"
    />
    <div v-else>Идет загрузка...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>

    <!--    <div class="page__wrapper">
          <div
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              class="page"
              :class="{current_page: pageNumber === this.page}"
              @click="changePage(pageNumber)"
          >
            {{pageNumber}}
          </div>
        </div>-->
  </div>
</template>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid #000;
  padding: 10px;
  margin-right: 5px;
}

.current_page {
  border: 2px solid green;
}

.observer {
  height: 30px;
  background: green;

}
</style>
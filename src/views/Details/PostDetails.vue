<template>
  <div>
    <v-app-bar app clipped-right flat height="72">
      <v-spacer>
        <v-btn
          depressed
          outlined
          color="#B71C1C"
          :to="{ name: 'Post', query: { post_status: 'all' } }"
        >
          <v-icon size="18">mdi-arrow-left-drop-circle</v-icon>
          Trở về
        </v-btn>
        <v-btn class="ml-1" depressed outlined color="#1A237E" to="/create_post">
          Viết bài mới
        </v-btn>
      </v-spacer>

      <v-responsive max-width="250">
        <div class="float-right">
          <v-btn
            :to="{ name: 'PostEdit', params: { id: post._id } }"
            depressed
            outlined
            color="#1A237E"
          >
            <v-icon>mdi-content-save-edit</v-icon>
            Chỉnh sửa
          </v-btn>
        </div>
      </v-responsive>
    </v-app-bar>

    <div class="p-2">
      <v-card class="mt-5">
        <v-row>
          <v-col sm="12" xs="12" md="3">
            <div class="p-2">
              <v-img height="200" :src="`${url}${post.image}`"></v-img>
            </div>
          </v-col>
          <v-col sm="12" xs="12" md="9">
            <div>
              <h3>{{ post.title }}</h3>
              <p>
                <v-icon size="22">mdi-calendar-import</v-icon>Ngày tạo:
                {{ post.dateCreated }} |
                <v-icon size="22">mdi-calendar-edit</v-icon> Ngày sửa:
                {{ post.dateModified }}
              </p>
              <p>
                <v-icon size="22">mdi-laptop</v-icon> Tình trạng:
                <b :class="post.isActive ? 'green--text text--darken-4' : 'red--text text--darken-4'">{{ post.isActive ? 'Công khai' : 'Bản nháp' }}</b> |
                <v-icon size="22">mdi-comment-edit</v-icon> Trạng thái bình
                luận: <b :class="post.isComment ? 'green--text text--darken-4' : ''">{{ post.isComment ? 'Đã bật' : 'Đã tắt' }}</b> |
                <v-icon size="22">mdi-eye</v-icon> Lượt xem: {{ post.view }}
              </p>
              <p>
                <v-icon size="22">mdi-format-list-bulleted-square</v-icon>
                Chuyên mục: {{ post.term }}
              </p>
              <p>
                <v-icon size="22">mdi-account-edit</v-icon>Tác giả:
                {{ post.author }}
              </p>
              <p>Không có mô tả nào</p>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <h3 class="p-2">Nội dung</h3>
        <p class="p-2" v-html="post.content"></p>
      </v-card>
    </div>
    <v-footer app color="transparent" height="120" inset>
      <v-card class="w-100 p-2">
        <v-row>
          <v-col sm="3" cols="6">
            <h6>Trạng thái</h6>
            <v-switch
              color="#1B5E20"
              v-model="post.isActive"
              :label="post.isActive ? 'Công khai' : 'Bản nháp'"
            ></v-switch>
          </v-col>
          <v-col sm="3" cols="6">
            <h6>Cho phép bình luận</h6>
            <v-checkbox
              v-model="post.isComment"
              :label="
                post.isComment
                  ? 'Cho phép bình luận'
                  : 'Không cho phép bình luận'
              "
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import Post from "../../api/post";
export default {
  name: "PostDetails",
  data() {
    return {
      post: {},
      url: process.env.VUE_APP_BACKEND_URL,
    };
  },
  async created() {
    const response = await Post.getByIDPost(this.$route.params.id);
    this.post = response;
  },
  components: {},
};
</script>

<style>
img {
  width: 100% !important;
}
.v-application .elevation-1 {
  box-shadow: initial !important;
}
.header {
  margin-top: 64px !important;
  box-shadow: 0px 0px 0px 0px !important;
  border-bottom: 1px solid #dee2e6 !important;
}
</style>

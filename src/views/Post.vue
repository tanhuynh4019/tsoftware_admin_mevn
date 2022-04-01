<template>
  <div v-resize="onResize">
    <div v-if="snackbar.active">
      <Snackbar
        :message="snackbar.message"
        :active="snackbar.active"
        :alerts="snackbar.alerts"
      />
    </div>
    <v-app-bar
      app
      clipped-right
      flat
      height="72"
      color="white"
      class="border-bottom"
    >
      <v-spacer>
        <h5>
          <span v-if="show.createPost.title">Quản lý tin tức</span>
          <v-btn
            class="ml-1"
            depressed
            outlined
            color="#1A237E"
            to="/create_post"
          >
            {{ show.createPost.textBtn }}
          </v-btn>

          <v-btn
            depressed
            outlined
            color="#1A237E"
            class="ml-1"
            v-if="show.search.icon"
          >
            <v-icon>mdi-card-search</v-icon>
            <span>Tìm kiếm</span>
          </v-btn>
        </h5>
      </v-spacer>

      <v-responsive max-width="200">
        <v-text-field
          v-if="show.search.textField"
          dense
          flat
          class="w-100"
          hide-details
          append-icon="mdi-card-search"
          rounded
          placeholder="Tìm kiếm tin tức"
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-app-bar>
    <div class="mt-3 p-2">
      <v-row>
        <v-col lg="2" sm="3" cols="6">
          <v-select
            :items="selected.optional"
            v-model="actionModel"
            label="Hành động"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col lg="1" sm="2" cols="6">
          <v-btn
            @click="actionsPost"
            width="100%"
            class="btn-action"
            outlined
            color="#1A237E"
          >
            Áp dụng
          </v-btn>
        </v-col>
        <v-col lg="2" sm="3" cols="4">
          <v-select
            :items="selected.byDate"
            label="Tất cả các ngày"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col lg="2" sm="3" cols="4">
          <v-select
            :items="selected.category"
            label="Tất cả danh mục"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col lg="1" sm="1" cols="4">
          <v-btn class="w-100 btn-action" depressed outlined color="#1A237E">
            Lọc
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-data-table
        v-model="selectedPost"
        :headers="headers"
        :loading="loading"
        loading-text="Loading...Vui lòng chờ tải xong dữ liệu"
        :items="desserts"
        :single-select="singleSelect"
        item-key="_id"
        show-select
      >
        <template v-slot:top>
          <div class="p-2">
            <v-btn
              v-for="(menu, i) in menuSub"
              @click="loadPost"
              :key="i"
              :class="menu.active ? 'ml-1 mt-1 active' : 'ml-1 mt-1'"
              depressed
              text
              :to="{ name: 'Post', query: { post_status: menu.post_status } }"
            >
              <v-icon size="14">{{ menu.icon }}</v-icon>
              <span class="ml-1">{{ menu.name }} (1)</span>
            </v-btn>
          </div>
        </template>
        <template v-slot:[`item._image`]="{ item }">
          <v-img
            width="150"
            height="100"
            :src="
              item.image != '' ? `${url}${item.image}` : `${url}/No-image.jpg`
            "
          ></v-img>
        </template>
        <template v-slot:[`item._title`]="{ item }">
          <h6>{{ item.title }}</h6>
          <div>Cập nhật: {{ item.dateCreated }}</div>
          <div>
            {{
              item.description != null
                ? item.description.substring(0, 100) + "..."
                : "Không có mô tả nào"
            }}
          </div>
        </template>
        <template v-slot:[`item._term`]="{ item }">
          {{ termFormat(item.term) }}
        </template>
        <template v-slot:[`item._active`]="{ item }">
          <v-switch
            v-if="!item.bin"
            v-model="item.active"
            color="#1B5E20"
            @click="isActivePost(item._id)"
            :label="item.active ? 'Công khai' : 'Không công khai'"
          ></v-switch>
          <v-switch
            v-if="item.bin"
            color="#1B5E20"
            disabled
            v-model="item.active"
            label="Vô hiệu hóa ở thùng rác"
          ></v-switch>
        </template>
        <template v-slot:[`item._comment`]="{ item }">
          <v-checkbox
            v-if="!item.bin"
            v-model="item.isComment"
            @click="isCommentPost(item._id)"
            :label="item.isComment ? 'Cho phép' : 'Không cho phép'"
          ></v-checkbox>
          <v-checkbox
            v-if="item.bin"
            v-model="item.isComment"
            disabled
            label="Vô hiệu hóa ở thùng rác"
          ></v-checkbox>
        </template>
        <template v-slot:[`item._view`]="{ item }">
          <p>{{ item.view }}</p>
        </template>
        <template v-slot:[`item._date_modified`]="{ item }">
          {{ item.dateModified }}
        </template>
        <template v-slot:[`item._action`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :to="{ name: 'PostDetails', params: { id: item._id } }"
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-eye-circle</v-icon>
              </v-btn>
            </template>
            <span>{{ `Xem chi tiết - ${item.title}` }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :to="{ name: 'PostEdit', params: { id: item._id } }"
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-content-save-edit</v-icon>
              </v-btn>
            </template>
            <span>{{ `Sửa - ${item.title}` }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="clickIsBinPost(item)"
                icon
                v-bind="attrs"
                v-on="on"
                v-if="!item.bin"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <span>Xóa vào thùng rác</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="clickIsRestorePost(item)"
                icon
                v-bind="attrs"
                v-on="on"
                v-if="item.bin"
              >
                <v-icon>mdi-backup-restore</v-icon>
              </v-btn>
            </template>
            <span>Khôi phục</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="clickDeletePost(item)"
                icon
                v-bind="attrs"
                v-on="on"
                v-if="item.bin"
              >
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
            </template>
            <span>Xóa vĩnh viển</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialogBin" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">{{ title }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogBin = false"
            >Hủy</v-btn
          >
          <v-btn color="blue darken-1" text @click="isBinPost(rowItem)"
            >Chắc chắn</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">{{ title }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Hủy</v-btn
          >
          <v-btn color="blue darken-1" text @click="deletePost(rowItem)"
            >Chắc chắn</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Snackbar from "../components/Snackbar.vue";
import { actionsStatus } from "../common/status.js";
import Post from "../api/post.js";
export default {
  name: "Post",
  data() {
    return {
      url: process.env.VUE_APP_BACKEND_URL,
      headers: [
        { text: "Hình ảnh", value: "_image", width: 150, sortable: false },
        {
          value: "_title",
          width: 400,
          sortable: false,
        },
        {
          text: "Chuyên mục",
          value: "_term",
          sortable: false,
        },
        {
          text: "Chế độ hiển thị",
          value: "_active",
          sortable: false,
        },
        {
          text: "Bình luận",
          value: "_comment",
          sortable: false,
        },
        {
          text: "Lượt xem",
          value: "_view",
          sortable: false,
        },
        {
          text: "Ngày cập nhật",
          value: "_date_modified",
          sortable: false,
        },
        {
          text: "Tác vụ",
          value: "_action",
          sortable: false,
        },
      ],
      menuSub: [
        {
          name: "Tất cả",
          post_status: "all",
          active: false,
          icon: "mdi-border-all",
        },
        {
          name: "Đã xuất bản",
          post_status: "publish",
          active: false,
          icon: "mdi-laptop",
        },
        {
          name: "Bản nháp",
          post_status: "draft",
          active: false,
          icon: "mdi-book-open-page-variant",
        },
        {
          name: "Thùng rác",
          post_status: "trash",
          active: false,
          icon: "mdi-trash-can",
        },
      ],
      selected: {
        optional: [],
        category: ["Mạng xã hội", "Giới trẻ"],
        byDate: ["Hôm nay", "Hôm qua"],
      },
      windowSize: {
        x: 0,
        y: 0,
      },
      show: {
        createPost: {
          title: true,
          textBtn: "Viết bài mới",
        },
        search: {
          textField: true,
          icon: false,
        },
      },
      snackbar: {
        message: this.$route.params.message,
        active: this.$route.params.active,
        alerts: this.$route.params.alerts,
      },
      desserts: [],
      title: "",
      loading: true,
      singleSelect: false,
      editedIndex: -1,
      rowItem: null,
      url: process.env.VUE_APP_BACKEND_URL,
      selectedPost: [],
      actionModel: "",
      dialogDelete: false,
      dialogBin: false,
    };
  },
  async created() {
    this.desserts = await Post.getAllPost(this.$route.query.post_status);
    this.loading = false;
  },
  mounted() {
    this.onResize();
    this.checkMenuSub(this.$route.query.post_status);
  },
  methods: {
    clickIsBinPost(item) {
      let that = this;
      that.rowItem = item;
      that.title = `Bạn có chắc muốn xóa tin tức [${item.title}] vào thùng rác không!`;
      that.dialogBin = true;
    },
    clickIsRestorePost(item) {
      let that = this;
      that.rowItem = item;
      that.title = `Khôi phục tin tức [${item.title}]!`;
      that.dialogBin = true;
    },
    clickDeletePost(item) {
      let that = this;
      that.rowItem = item;
      that.title = `Bạn có chắc muốn xóa tin tức [${item.title}] vĩnh viển không!`;
      that.dialogDelete = true;
    },
    async loadPost() {
      this.loading = true;
      this.desserts = await Post.getAllPost(this.$route.query.post_status);
      this.loading = false;
      this.checkMenuSub();
    },
    async isActivePost(id) {
      let that = this;
      const response = await Post.isActivePost(id);
      if (response.message) {
        that.snackbar = {
          message: response.message,
          active: true,
          alerts: "success",
        };
        setTimeout(() => {
          that.snackbar.active = false;
        }, 3000);
      }
    },
    async isCommentPost(id) {
      let that = this;
      const response = await Post.isCommentPost(id);
      if (response.message) {
        that.snackbar = {
          message: response.message,
          active: true,
          alerts: "success",
        };
        setTimeout(() => {
          that.snackbar.active = false;
        }, 3000);
      }
    },
    async isBinPost(item) {
      let that = this;
      const response = await Post.isBinPost(item._id);
      if (response.message) {
        that.snackbar = {
          message: response.message,
          active: true,
          alerts: "success",
        };
        setTimeout(() => {
          that.snackbar.active = false;
        }, 3000);
        that.dialogBin = false;
        that.editedIndex = this.desserts.indexOf(item);
        that.desserts.splice(this.editedIndex, 1);
        that.closeDelete();
      }
    },
    async deletePost(item) {
      let that = this;
      const response = await Post.deletePost(item._id);
      if (response.message) {
        that.snackbar = {
          message: response.message,
          active: true,
          alerts: "success",
        };
        setTimeout(() => {
          that.snackbar.active = false;
        }, 3000);
        that.dialogDelete = false;
        that.editedIndex = this.desserts.indexOf(item);
        that.desserts.splice(this.editedIndex, 1);
        that.closeDelete();
      }
    },
    async actionsPost() {
      let that = this;
      const selectedModel = that.actionModel;
      const selectedPost = that.selectedPost;
      if (selectedPost.length != 0) {
        const arrID = [];
        const itemToRemove = [];
        selectedPost.forEach((post) => {
          arrID.push(post._id);
        });
        if (selectedModel == actionsStatus.ACTIVE_TRUE) {
          const response = await Post.actionsPost(arrID, selectedModel);
          selectedPost.forEach((post) => {
            that.desserts[that.desserts.indexOf(post)].active = true;
          });
          that.notification(response.message, true, "success");
        } else if (selectedModel == actionsStatus.ACTIVE_FALSE) {
          const response = await Post.actionsPost(arrID, selectedModel);
          selectedPost.forEach((post) => {
            that.desserts[that.desserts.indexOf(post)].active = false;
          });
          that.notification(response.message, true, "success");
        } else if (selectedModel == actionsStatus.COMMENT_TRUE) {
          const response = await Post.actionsPost(arrID, selectedModel);
          selectedPost.forEach((post) => {
            that.desserts[that.desserts.indexOf(post)].isComment = true;
          });
          that.notification(response.message, true, "success");
        } else if (selectedModel == actionsStatus.COMMENT_FALSE) {
          const response = await Post.actionsPost(arrID, selectedModel);
          selectedPost.forEach((post) => {
            that.desserts[that.desserts.indexOf(post)].isComment = false;
          });
          that.notification(response.message, true, "success");
        } else if (selectedModel == actionsStatus.BIN) {
          const response = await Post.actionsPost(arrID, selectedModel);
          selectedPost.forEach((post) => {
            itemToRemove.push(that.desserts.indexOf(post));
          });
          that.desserts = that.desserts.filter((post, index) => {
            return itemToRemove.indexOf(index) == -1;
          });
          that.notification(response.message, true, "success");
        } else if (selectedModel == actionsStatus.RESTORE) {
          const response = await Post.actionsPost(arrID, selectedModel);
          selectedPost.forEach((post) => {
            itemToRemove.push(that.desserts.indexOf(post));
          });
          that.desserts = that.desserts.filter((post, index) => {
            return itemToRemove.indexOf(index) == -1;
          });
          that.notification(response.message, true, "success");
        } else if (selectedModel == actionsStatus.DELETE) {
          const response = await Post.actionsPost(arrID, selectedModel);
          selectedPost.forEach((post) => {
            itemToRemove.push(that.desserts.indexOf(post));
          });
          that.desserts = that.desserts.filter((post, index) => {
            return itemToRemove.indexOf(index) == -1;
          });
          that.notification(response.message, true, "success");
        } else {
          that.notification("Vui lòng chọn 1 hành động!", true, "warning");
        }
      } else {
        that.notification(
          "Vui lòng chọn ít nhất 1 tin tức trước khi thực hiện hành động!",
          true,
          "warning"
        );
      }
    },
    checkMenuSub() {
      this.clearMenuSub();
      const result = this.menuSub.filter((post) => {
        this.checkActions(this.$route.query.post_status);
        return post.post_status == this.$route.query.post_status;
      });
      result[0].active = true;
    },
    checkActions(post_status) {
      let that = this;
      switch (post_status) {
        case "all":
          that.selected.optional = [
            actionsStatus.COMMENT_TRUE,
            actionsStatus.COMMENT_FALSE,
            actionsStatus.ACTIVE_TRUE,
            actionsStatus.ACTIVE_FALSE,
            actionsStatus.BIN,
          ];
          break;
        case "publish":
          that.selected.optional = [
            actionsStatus.COMMENT_TRUE,
            actionsStatus.COMMENT_FALSE,
            actionsStatus.ACTIVE_FALSE,
            actionsStatus.BIN,
          ];
          break;
        case "draft":
          that.selected.optional = [
            actionsStatus.COMMENT_TRUE,
            actionsStatus.COMMENT_FALSE,
            actionsStatus.ACTIVE_TRUE,
            actionsStatus.BIN,
          ];
          break;
        case "trash":
          that.selected.optional = [
            actionsStatus.RESTORE,
            actionsStatus.DELETE,
          ];
          break;
        default:
          that.selected.optional = [];
      }
      that.selectedPost = [];
    },
    termFormat(term) {
      if (term == undefined) {
        return "Trống";
      } else {
        let array = term.split("_");
        return array;
      }
    },
    notification(message, active, alerts) {
      let that = this;
      that.snackbar = {
        message: message,
        active: active,
        alerts: alerts,
      };
      setTimeout(() => {
        that.snackbar.active = false;
      }, 3000);
    },
    onResize() {
      let that = this;
      that.windowSize = { x: window.innerWidth, y: window.innerHeight };
      if (that.windowSize.x <= 414) {
        that.show.createPost = {
          title: false,
          textBtn: "Thêm mới",
        };
        that.show.search = {
          textField: false,
          icon: true,
        };
      } else {
        that.defaultPC();
      }
    },
    defaultPC() {
      let that = this;
      that.show = {
        createPost: {
          title: true,
          textBtn: "Viết bài mới",
        },
        search: {
          textField: true,
          icon: false,
        },
      };
    },
    clearMenuSub() {
      this.menuSub = [
        {
          name: "Tất cả",
          post_status: "all",
          active: false,
          icon: "mdi-border-all",
        },
        {
          name: "Đã xuất bản",
          post_status: "publish",
          active: false,
          icon: "mdi-laptop",
        },
        {
          name: "Bản nháp",
          post_status: "draft",
          active: false,
          icon: "mdi-book-open-page-variant",
        },
        {
          name: "Thùng rác",
          post_status: "trash",
          active: false,
          icon: "mdi-trash-can",
        },
      ];
    },
  },
  components: { Snackbar },
};
</script>

<style scoped>
.v-application .elevation-1 {
  box-shadow: initial !important;
}
.header {
  margin-top: 64px !important;
  box-shadow: 0px 0px 0px 0px !important;
  border-bottom: 1px solid #dee2e6 !important;
}
.btn-action {
  margin-top: -3px !important;
  height: 43px !important;
}
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.active {
  background-color: #1a237e;
  color: white;
}
</style>

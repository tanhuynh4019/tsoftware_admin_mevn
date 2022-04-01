<template>
  <div>
    <v-form
      ref="form"
      @submit.prevent="submitForm"
      enctype="multipart/form-data"
    >
      <v-app-bar app clipped-right flat height="72">
        <v-spacer>
          <h5>
            Viết tin tức mới
            <v-btn
              depressed
              outlined
              color="#1A237E"
              :to="{ name: 'Post', query: { post_status: 'all' } }"
            >
              Quản lý tin tức
            </v-btn>
          </h5>
        </v-spacer>

        <v-responsive max-width="400">
          <div class="float-right">
            <v-btn type="submit" depressed class="mr-2" color="#1A237E" dark>
              Đăng
            </v-btn>
            <v-btn depressed color="#263238" dark @click="openSetting">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </div>
        </v-responsive>
      </v-app-bar>
      <v-navigation-drawer app clipped right width="300" v-model="setting">
        <v-list class="border-bottom list-none">
          <v-list-group :value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Trạng thái và hiển thị</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row class="mt-2">
                    <v-col sm="6" cols="6"> Hiển thị </v-col>
                    <v-col sm="6" cols="6">
                      <v-switch
                        v-model="post.isActive"
                        label="Không công khai"
                        color="#1B5E20"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-list-item-title>
                <v-list-item-title>
                  <v-row class="mt-2">
                    <v-col sm="6" cols="6"> Đăng </v-col>
                    <v-col sm="6" cols="6">
                      <a href="#">Đăng ngay</a>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-list class="border-bottom">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Đường dẫn tỉnh</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <p>Link dự tính</p>
                  <a href="">https://anhlelaw.com/bai_viet</a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-list class="border-bottom">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Danh mục</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-select
                  :items="selected.categorys"
                  label="Danh mục tin tức"
                  dense
                  multiple
                  outlined
                ></v-select>
                <v-btn depressed> Thêm danh mục </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-list class="border-bottom">
          <v-list-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Ảnh đại diện</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-btn @click="clickListImages" elevation="2">Thêm ảnh</v-btn>
                <div>
                  <center>
                    <v-img
                      max-width="300"
                      max-height="400"
                      :src="`${url}/${post.image}`"
                    ></v-img>
                  </center>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-list class="border-bottom">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Mô tả</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-textarea
                  outlined
                  v-model="post.description"
                  label="Mô tả ngắn gọn"
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-list class="border-bottom">
          <v-list-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Thảo luận</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-checkbox
                    v-model="post.isComment"
                    label="Cho phép bình luận"
                  ></v-checkbox>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-list class="border-bottom">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Lượt xem</v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-text-field v-model="post.view" outlined></v-text-field>
                <p>Hiển thị lượt xem bên ngoài, mặc định là 0</p>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <div class="p-2">
        <v-text-field
          autofocus
          :rules="rules.title"
          class="form-create-title"
          height="100"
          text
          v-model="post.title"
          placeholder="Thêm tiêu đề"
        ></v-text-field>
        <ckeditor
          :editor="editor"
          v-model="post.content"
          :config="editorConfig"
        ></ckeditor>
      </div>
    </v-form>
    <v-dialog v-model="dialogImages" width="1600px">
      <v-toolbar dark color="#004D40">
        <v-btn icon dark @click="dialogImages = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Ảnh đại diện</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="clickSelectImage"> Chọn ảnh </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card height="600px" :loading="loading">
        <v-tabs color="#1B5E20" left v-model="tabUploads">
          <v-tab>Thư viện hình ảnh</v-tab>
          <v-tab>Tải lên</v-tab>
          <v-tab-item>
            <v-card-text>
              <v-row>
                <v-col sm="9" cols="12">
                  <v-item-group v-model="imageValue">
                    <div>
                      <v-row>
                        <v-col
                          v-for="(n, i) in imageList"
                          :key="i"
                          cols="12"
                          md="2"
                          @click="clickImageFileName(n.filename, n._id)"
                        >
                          <v-item v-slot="{ active, toggle }">
                            <v-card
                              :color="active ? 'primary' : ''"
                              class="d-flex align-center"
                              dark
                              :style="`background-image: url('${url}/${n.filename}'); background-size: 100% 100%;`"
                              height="150"
                              @click="toggle"
                            >
                              <v-scroll-y-transition>
                                <div
                                  v-if="active"
                                  class="text-h2 flex-grow-1 text-center"
                                >
                                  <v-icon color="green darken-4" size="90"
                                    >mdi-progress-check</v-icon
                                  >
                                </div>
                              </v-scroll-y-transition>
                            </v-card>
                          </v-item>
                        </v-col>
                      </v-row>
                    </div>
                  </v-item-group>
                </v-col>
                <v-col sm="3" class="border-start">
                  <div v-if="detailsUpload._id != null">
                    <h6>Chi tiết đính kèm</h6>
                    <v-img width="100px" height="100px" :src="`${url}/${detailsUpload.filename}`"></v-img>
                    <p class="font-weight-bold">{{detailsUpload.filename}}</p>
                    <p>Ngày tạo: {{detailsUpload.dateCreate}}</p>
                    <p>Size: {{detailsUpload.size}}</p>
                    <p><a class="blue--text text--darken-4">Sửa ảnh</a></p>
                    <p><a class="red--text text--darken-4" @click="clickDeleteUpload(detailsUpload._id)" >Xóa vĩnh viển</a></p>
                    <v-divider></v-divider>
                    Đường dẫn: <a target="_blank" :href="`${url}/${detailsUpload.filename}`">{{`${url}/${detailsUpload.filename}`}}</a>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-tab-item>
          <v-tab-item class="center">
            <v-card flat tile width="200">
              <v-file-input
                v-model="upload.image"
                @change="uploadImages"
                counter
                show-size
                truncate-length="29"
              ></v-file-input>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Post from "../../api/post";
import Uploads from "../../api/upload";
export default {
  name: "PostCreate",
  data() {
    return {
      tabUploads: 0,
      url: process.env.VUE_APP_BACKEND_URL,
      imageList: [],
      imageValue: "",
      imageTest: "",
      setting: true,
      dialogImages: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      //-------------
      content: "",
      loading: true,
      selected: {
        categorys: ["Mạng xã hội", "Giới trẻ"],
      },
      post: {
        title: "",
        content: "",
        isActive: true,
        image: [],
        term: [],
        view: 0,
        description: "",
      },
      image: "",
      rules: {
        title: [
          (v) => !!v || "Tiêu đề không được để trống!",
          (v) => (v && v.length <= 250) || "Tiêu đề không quá 250 ký tự!",
        ],
      },
      upload: {
        isShow: false,
        imageNew: "",
        image: [],
      },
      detailsUpload: {},
    };
  },
  mounted() {},
  methods: {
    clickDeleteUpload(id)
    {

    },
    async uploadImages() {
      let that = this;

      const formData = new FormData();
      formData.append("image", that.upload.image);

      const response = await Uploads.createUploads(formData);
      if (response.message) {
        that.loadUploads();
        that.tabUploads = 0;
      }
    },
    async loadUploads() {
      this.imageList = await Uploads.getAllUploads();
    },
    async clickImageFileName(fileName, id) {
      let that = this;
      if (that.imageValue == undefined) {
        that.post.image = "";
        that.detailsUpload = {};
      } else {
        const response = await Uploads.getByIDUpload(id);
        that.detailsUpload = response;
        that.imageTest = fileName;
      }
    },
    clickSelectImage() {
      let that = this;
      that.post.image = "/" + that.imageTest;
      that.dialogImages = false;
    },
    clickListImages() {
      let that = this;
      that.loadUploads();
      that.loading = false;
      that.dialogImages = true;
    },
    openSetting() {
      this.setting = !this.setting;
    },
    selectFile() {
      let that = this;
      const image = that.post.image;
      const reader = new FileReader();
      if (image === null) {
        that.upload.imageNew = "";
        that.upload.isShow = false;
        that.post.image = null;
        return 1;
      }
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          that.upload.imageNew = reader.result;
          that.upload.isShow = true;
        },
        false
      );
      if (image) {
        reader.readAsDataURL(image);
      }
    },
    remoteUpload() {
      let that = this;
      that.upload.imageNew = "";
      that.upload.isShow = false;
      that.post.image = null;
    },
    async submitForm() {
      let that = this;
      const formData = new FormData();
      formData.append("title", that.post.title);
      formData.append("content", that.post.content);
      formData.append("isActive", that.post.isActive);
      formData.append("isComment", that.post.isComment);
      formData.append("image", that.post.image);
      formData.append("view", that.post.view);
      formData.append("description", that.post.description);
      if (that.$refs.form.validate()) {
        const response = await Post.createPost(formData);
        if (response.message) {
          that.$router.push({
            name: "Post",
            query: { post_status: "all" },
            params: {
              message: response.message,
              active: true,
              alerts: "success",
            },
          });
        }
      }
    },
  },
  components: {},
};
</script>

<style scoped>
.form-create-title {
  font-size: 30px;
}
.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
.card-none {
  box-shadow: 0px 0px 0px 0px !important;
}
a {
  text-decoration: none;
}
.header {
  margin-top: 64px !important;
  box-shadow: 0px 0px 0px 0px !important;
  border-bottom: 1px solid #dee2e6 !important;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
</style>

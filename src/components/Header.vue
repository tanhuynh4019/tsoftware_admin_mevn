<template>
  <div>
    <v-system-bar app color="#263238" dark height="45" v-resize="onResize">
      <v-spacer>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn text tile>
          <v-icon v-if="show.logo.icon">mdi-home</v-icon>
          <span class="mt-1" v-if="show.logo.text"> TSoftware </span>
        </v-btn>
      </v-spacer>
      <v-responsive :max-width="show.responsiveMaxWidth">
        <v-btn text tile class="float-right">
          <span v-if="show.helloWorld.text">Chào, tanhuynh1999</span>
          <v-img
            v-if="show.helloWorld.avatar"
            class="ml-1"
            max-width="20"
            height="20"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          ></v-img>
        </v-btn>
      </v-responsive>
    </v-system-bar>
    <v-navigation-drawer v-model="drawer" app width="280">
      <v-list nav dense>
        <v-list-group
          v-for="(menu, i) in menus"
          :key="i"
          :prepend-icon="menu.icon"
          eager
          color="#1A237E"
          no-action
          activator
          :value="checkMenu(menu.key)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="menu.name"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(sub, j) in menu.categorys"
            :key="j"
            :to="sub.link"
            link
            v-model="sub.key"
          >
            <v-list-item-content>
              <v-list-item-title v-text="sub.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Header",
  drawer: null,
  data: () => ({
    windowSize: {
      x: 0,
      y: 0,
    },
    show: {
      responsiveMaxWidth: 300,
      logo: {
        text: true,
        icon: true,
      },
      update: {
        text: true,
        icon: true,
      },
      gmail: {
        text: true,
        icon: true,
      },
      helloWorld: {
        avatar: true,
        text: true,
      },
    },
    drawer: null,
    menus: [
      {
        name: "Trang tổng quan",
        icon: "mdi-monitor-dashboard",
        link: "/",
        categorys: [
          {
            name: "Trang chủ",
            link: "/category",
          },
          {
            name: "Cập nhật",
            link: "/category",
          }
        ],
      },
      {
        name: "Bài viết",
        icon: "mdi-post",
        link: "/post",
        categorys: [
          {
            name: "Tất cả bài viết",
            link: "/post",
          },
          {
            name: "Viết bài mới",
            link: "/category",
          },
          {
            name: "Chuyên mục",
            link: "/category",
          },
        ],
      },
      {
        name: "Phản hồi",
        icon: "mdi-comment",
        link: "/users"
      },
      {
        name: "Tài khoản",
        icon: "mdi-account-box-multiple-outline",
        link: "/users",
        categorys: [
          {
            name: "Tất cả người dùng",
            link: "/category",
          },
          {
            name: "Thêm mới",
            link: "/category",
          },
        ],
      },
      {
        name: "Thư viện",
        icon: "mdi-folder-open",
        link: "/contact",
        categorys: [
          {
            name: "Danh sách",
            link: "/category",
          },
          {
            name: "Tải lên",
            link: "/category",
          },
        ],
      },
      {
        name: "Liên hệ",
        icon: "mdi-gmail",
        link: "/contact",
        categorys: [
          {
            name: "Danh sách liên hệ",
            link: "/category",
          },
          {
            name: "Thêm liên hệ",
            link: "/category",
          },
        ],
      },
      {
        name: "Cài đặt",
        icon: "mdi-cog",
        link: "/users",
        categorys: [
          {
            name: "Tổng quan",
            link: "/category",
          }
        ],
      },
    ],
  }),
  mounted() {
    this.onResize();
  },
  methods: {
    checkMenu(key) {
      const pathName = window.location.pathname;
      if (pathName.length > 20) {
        const arrPathName = pathName.replace("/", "").split("/");
        return arrPathName.includes(key);
      } else {
        const arrPathName = pathName.replace("/", "").split("_");
        return arrPathName.includes(key);
      }
    },
    onResize() {
      let that = this;
      that.windowSize = { x: window.innerWidth, y: window.innerHeight };
      if (that.windowSize.x <= 414) {
        that.show.responsiveMaxWidth = 50;
        that.show.logo = {
          icon: true,
          text: false,
        };
        that.show.helloWorld = {
          avatar: true,
          text: false,
        };
        that.show.update = {
          icon: true,
          text: false,
        };
        that.show.gmail = {
          icon: true,
          text: false,
        };
      } else {
        that.defaultPC();
      }
    },
    defaultPC() {
      let that = this;
      that.show = {
        responsiveMaxWidth: 300,
        logo: {
          text: true,
          icon: true,
        },
        helloWorld: {
          avatar: true,
          text: true,
        },
        update: {
          text: true,
          icon: true,
        },
        gmail: {
          text: true,
          icon: true,
        },
      };
    },
  },
};
</script>

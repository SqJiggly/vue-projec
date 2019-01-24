<template>
  <div class="toseach">
    <div class="search-wrapper">
      <div class="search-header">
        <div class="input-wrapper">
          <img
            class="search-icon"
            src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/search.png"
            alt
          >
          <input
            v-show='this.searchtype=="cinema"?true:false'
            v-model="searchinput"
            class="search-input"
            @input="showdel(searchinput)"
            type="text"
            placeholder="搜影院"
          >
          <input
            v-show='this.searchtype=="movie"?true:false'
            v-model="searchinput"
            class="search-input"
            @input="showdel(searchinput)"
            type="text"
            placeholder="搜电影搜影院"
          >
          <img
            v-show="delshow"
            class="del-input"
            src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/close.png"
            alt
          >
        </div>
        <div class="cancel" @click="tocinema">取消</div>
      </div>
      <div v-show='this.searchtype=="movie"?true:false' class="hot-search">
        <h3 v-show="!this.delshow">热门搜索</h3>
        <div class="hot-movies-wrap" v-show='this.movie.length'>
          <div class="result">
            <h3>电影/电视剧/综艺</h3>
            <div class="list">
              <div class="movie cell" data-id="3606" v-for="(item,index) in movie" :key="index">
                <img
                  class="poster"
                  :src="item.img|getImg4"
                  alt
                >
                <div class="info">
                  <div class="name-score">
                    <p class="name">
                      <span class="one-line">哈利·波特与魔法石</span>
                      <span class="version"></span>
                    </p>

                    <span class="score">
                      <span class="num">9.1</span>分
                    </span>
                  </div>
                  <div class="detail-section">
                    <div class="detail-items">
                      <p class="ename one-line">Harry Potter and the Sorcerer's Stone</p>
                      <p class="catogary">冒险,奇幻,家庭</p>
                      <p class="release">2002-01-26</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="more-result" data-target="movies" data-total="33900">查看全部33900部影视剧</div>
          </div>
          <div class="result">
            <h3>影院</h3>
            <div class="list">
              <div class="movie cell" data-id="3606">
                <img
                  class="poster"
                  src="https://p1.meituan.net/128.180/movie/aacb9ed2a6601bfe515ef0970add1715623792.jpg"
                  alt
                >
                <div class="info">
                  <div class="name-score">
                    <p class="name">
                      <span class="one-line">哈利·波特与魔法石</span>
                      <span class="version"></span>
                    </p>

                    <span class="score">
                      <span class="num">9.1</span>分
                    </span>
                  </div>
                  <div class="detail-section">
                    <div class="detail-items">
                      <p class="ename one-line">Harry Potter and the Sorcerer's Stone</p>
                      <p class="catogary">冒险,奇幻,家庭</p>
                      <p class="release">2002-01-26</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="movie cell" data-id="916">
                <img
                  class="poster"
                  src="https://p1.meituan.net/128.180/movie/68fa7db99e958c47d7aa07d015845a6f335154.jpg"
                  alt
                >
                <div class="info">
                  <div class="name-score">
                    <p class="name">
                      <span class="one-line" style="width: 194.375px;">哈利·波特与死亡圣器（下）</span>
                      <span class="version v3d imax"></span>
                    </p>

                    <span class="score">
                      <span class="num">9</span>分
                    </span>
                  </div>
                  <div class="detail-section">
                    <div class="detail-items">
                      <p class="ename one-line">Harry Potter and the Deathly Hallows: Part 2</p>
                      <p class="catogary">动作,惊悚,奇幻</p>
                      <p class="release">2011-08-04</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="movie cell" data-id="756305">
                <img
                  class="poster"
                  src="https://p1.meituan.net/128.180/mmdb/491e907f34201a3988be9fe59a3309b517475.jpg"
                  alt
                >
                <div class="info">
                  <div class="name-score">
                    <p class="name">
                      <span class="one-line">Ha</span>
                      <span class="version"></span>
                    </p>

                    <span class="no-score">暂无评分</span>
                  </div>
                  <div class="detail-section">
                    <div class="detail-items">
                      <p class="ename one-line"></p>
                      <p class="catogary">记录片</p>
                      <p class="release">1991-09-18</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="more-result" data-target="movies" data-total="33900">查看全部33900部影视剧</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "toSeach",
  components: {},
  computed: {},
  data() {
    return {
      delshow: false,
      searchinput: "",
      searchtype: "",
      movie: [],
      cinema: []
    };
  },
  methods: {
    showdel(val) {
      //直接用@input来监听input的值的实时变化
      if (val.length == 0) {
        this.delshow = false;
        this.movie=[];
      } else {
        this.delshow = true;
        this.getdata(val);
      }
    },
    getdata(ival) {
      if (this.searchtype == "movie") {
        // http://m.maoyan.com/ajax/search?kw=ha&cityId=20&stype=-1
        this.$axios
          .get("/api/ajax/search", {
            params: {
              kw: ival,
              cityId: 20,
              stype: -1
            }
          })
          .then(res => {
            console.log(res);
            this.movie=res.data.movies.list;
            this.cinema=res.data.cinemas.list;
          });
      }else if(this.searchtype == "cinema"){}
    },
    tocinema() {
      // this.$router.push('/cinema')
      this.$router.go(-1);
    }
  },
  created() {
    this.searchtype = this.$route.query.searchtype;
  }
};
</script>
<style lang="less" scoped>
@import url("../../../styles/main.less");
.toseach {
  // position:fixed;
  .top(0);
  .left(0);
  .right(0);
  // .padding(51.5,0,0,0);
  .search-wrapper {
    .w(358);
    background-color: #f5f5f5;
    .fs(14);
    height: 100vh;
    .search-header {
      display: flex;
      align-items: center;
      .padding(8, 0, 8, 10);
      background-color: #f5f5f5;
      border-bottom: 1px solid #e5e5e5;
      z-index: 1;
      .input-wrapper {
        .padding(0, 10, 0, 10);
        border: 1px solid #e6e6e6;
        .border-radius(5);
        background-color: #fff;
        flex-grow: 1;
        .search-icon {
          .w(15);
          .h(15);
          .margin(0, 6, 0, 0);
          float: left;
          position: relative;
          .top(6);
        }
        .search-input {
          flex: 1;
          border: none;
          font-size: 13px;
          color: #333;
          line-height: 20px;
          padding: 4px 0;
          width: calc(100% - 40px);
        }
        .del-input {
          .w(15);
          .h(15);
          float: right;
          position: relative;
          .top(6);
        }
      }
      .cancel {
        .h(30);
        .lh(30);
        .padding(0, 10, 0, 10);
        .fs(16);
        color: #f03d37;
      }
    }
    .hot-search {
      .padding(0, 0, 8, 15);
      background-color: #fff;
      position: relative;
      .top(-1);
      h3 {
        border-top: 1px solid #e5e5e5;
        .padding(17, 0, 0, 0);
        .fs(15);
        color: #666;
      }
      .hot-movies-wrap {
        margin-top: 15px;
        padding-right: 15px;
        overflow: hidden;
        .result{
            margin-bottom: 10px;
            background-color: #fff;
            h3{
                font-size: 15px;
                color: #999;
                padding: 9px 15px;
            }
            .more-result{
                color: #ef4238;
                text-align: center;
                line-height: 44px;
                height: 44px;
                font-size: 15px;
            }
            .list{
                border-bottom: 1px solid #e6e6e6;
                padding-left: 15px;
                border-top: 1px solid #e6e6e6;
                .movie{
                    padding: 12px 0;
                    min-height: 90px;
                    .poster{
                        background-color: #eee;
                        width: 64px;
                        height: 90px;
                        float: left;
                        margin-right: 10px;
                    }
                    .info{
                        margin-right: 15px;
                        margin-top: 1px;
                        .name-score{
                            font-size: 16px;
                            color: #222;
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 2px;
                            .score{
                                color: #fa0;
                            }
                            .name{
                                display: flex;
                                align-items: center;
                                flex-grow: 1;
                                max-height: 24px;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }
        
      }
    }
  }
}
</style>
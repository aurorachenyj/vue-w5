export default {
  props: ["innerSelectProductId", "addToCart", "productDetail"],
  data() {
    return {
      selectProduct: {},
      modal: "",
      selectedQty: 1,
      id: "",
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "aurora-path",
    };
  },
  watch: {
    innerSelectProductId(newValue, oldValue) {
      this.id = newValue;
      if (this.id) {
        axios
          .get(`${this.url}/api/${this.path}/product/${this.id}`)
          .then((res) => {
            this.selectProduct = res.data.product;
            this.modal.show();
          })
          .catch((err) => {
            alert(err.data.message);
          });
      }
    },
  },

  methods: {
    openModal() {
      this.modal.show();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.productModal);

    this.$refs.productModal.addEventListener("hide.bs.modal", (e) => {
      this.productDetail("");
    });
  },
  template: ` {{innerSelectProductId}}  
<div class="modal fade" id="productModalid" ref="productModal" tabindex="-1" role="dialog"
           aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>{{ selectProduct.title

                }}</span>
            </h5>
              <button type="button" class="btn-close"
                      data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <img class="img-fluid" :src="selectProduct.imageUrl
                  "  alt="">
            </div>
                <div class="col-sm-6">
                  <span class="badge bg-primary rounded-pill">{{ selectProduct.category
                  }}</span>
                  <p>商品描述：{{ selectProduct.description

                  }}</p>
                  <p>商品內容：{{ selectProduct.content
                  }}</p>
                  
                  <del class="h6">原價 {{selectProduct.origin_price

                  }} 元</del>
                  <div class="h5">現在只要 {{ selectProduct.price }} 元</div>
                  <div>
                    <div class="input-group">
                    <select class="form-select" v-model="selectedQty"  >                 
                    <option v-for="i in 20 "  :key=" i + '12346' "  > {{i}} </option>
                  </select>
                      <button @click="addToCart(selectProduct.id ,selectedQty  )" type="button" class="btn btn-primary">加入購物車</button>
                      {{  }}
                      </div>
            </div>
            </div>
                <!-- col-sm-6 end -->
            </div>
            </div>
            </div>
            </div>
            </div>


`,
};

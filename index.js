import userProductModal from "/userProductModal.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "aurora-path";

// 載入 VeeValidate 規則
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// VeeValidate.defineRule("email", VeeValidateRules["email"]);
// VeeValidate.defineRule("required", VeeValidateRules["required"]);

// 讀取外部的資源(多國語系-繁中)
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = Vue.createApp({
  components: { userProductModal },
  data() {
    return {
      productData: [],
      tempCart: [],
      final_total: 0,
      total: 0,
      selectProductId: "",
      loadingItem: "",
      isLoading: false,
    };
  },
  mounted() {
    this.getProduct();
    this.showCartList();
  },
  methods: {
    getProduct() {
      axios
        .get(`${url}/api/${path}/products/all`)
        .then((res) => {
          this.productData = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    addToCart(product_id, qty = 1) {
      this.isLoading = true;
      const data = { product_id, qty: parseInt(qty) };
      this.loadingItem = product_id;
      axios
        .post(`${url}/api/${path}/cart`, { data })
        .then((res) => {
          this.isLoading = false;
          alert(res.data.message);
          this.showCartList();
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },

    showCartList() {
      axios
        .get(`${url}/api/${path}/cart`)
        .then((res) => {
          this.tempCart = res.data.data.carts;
          this.final_total = res.data.data.final_total;
          this.total = res.data.data.total;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    deleteProduct(id) {
      this.loadingItem = id;
      axios
        .delete(`${url}/api/${path}/cart/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.showCartList();
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    editQty(id, proId, e) {
      this.loadingItem = proId;

      const data = {
        product_id: proId,
        qty: parseInt(e.target.value),
      };

      axios
        .put(`${url}/api/${path}/cart/${id}`, { data })
        .then((res) => {
          alert(res.data.message);
          this.showCartList();
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    delCart() {
      this.isLoading = true;
      axios
        .delete(`${url}/api/${path}/carts`)
        .then((res) => {
          this.isLoading = false;
          alert(res.data.message);
          this.showCartList();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    productDetail(proId) {
      this.selectProductId = proId;
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
  },
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.component("loading", VueLoading.Component);

app.mount("#app");

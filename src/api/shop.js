const _products = require("./products.json");
const _categories = require("./categories.json");
  
export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 100)
    },

    getCategories (cb) {
      setTimeout(() => cb(_categories), 100)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.webdriver)
          ? cb()
          : errorCb()
      }, 100)
    }
}
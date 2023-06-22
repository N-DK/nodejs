// http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/ (website template)

const express = require('express');
const app = express();
const session = require('express-session')
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const port = 3000
const route = require('./routes');
const db = require('./config/db');
var methodOverride = require('method-override');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect();

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

//Template engine handlebars
app.engine('.hbs', handlebars.engine({
    extname: '.hbs', 
    helpers: {
      convertToPercent: function(discount) {return discount * 100},
      calcCurrentPrice: function(cost, percent) {return Math.round(cost * (1 - percent))},
      isPositive: function(val, options) {
        if (val > 0){
          return options.fn(this)
        }
      },
      isZero: function(val, options) {
        if (val === 0){
          return options.fn(this)
        }
      },
      lengthArr: function (arr) {
        return arr.length;
      },
      getCategory: function(arr) {
        let result = [];
        if (!Array.isArray(arr)) { return []; }
        for(const a of arr) {
          const category = {
            name: a.category,
            quantify: 1,
            slug: a.slug_category
          }
          var checkExistCategory = result.find(item => item.name === category.name);
          if(checkExistCategory === undefined) {
            result.push(category);
          }else {
            checkExistCategory.quantify += 1;
          }
        }
        return result;
      },
      limit: function(arr, limit) {
        if (!Array.isArray(arr)) { return []; }
        return arr.slice(0, limit);
      },
      formatDate: function(isDate) {
        const date = new Date(isDate);
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
      },
      calcTotal: function(arr) {
        const carts = arr ?? [];
        return carts.reduce((total, num) => total + num.total_price, 0);
      }, 
      minus: (a, b) => {return a - b},
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
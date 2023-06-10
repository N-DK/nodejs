// http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/ (website template)

const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const port = 3000
const route = require('./routes');
const db = require('./config/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect();

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
      formatDate: function(isoDate) {
        const date = new Date(isoDate);
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
      },
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
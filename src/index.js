// http://lenos.mbkip3ms9u-e92498n216kr.p.temp-site.link/ (website template)

const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
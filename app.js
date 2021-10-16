const exp = require('express'),
    app = exp(),
    stripe = require('stripe')(require('./stripeCreds.json').key),
    hbs = require('express-handlebars');

app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));
app.use(exp.static(`${__dirname}/public`))

app.get('', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT || 3000, () => console.log('server'));
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

app.get('/success', (req,res) => {
    res.render('success');
});

app.post('/charge', (req, res) => {
    const amount = 3000;
    stripe.customers.create({
        email: req.body.email,
        source: req.body.stripeToken
    }).then(cust => stripe.charges.create({
        amount, description: 'master the art of mastering mastery',
        currency: 'inr',
        customer: cust.id
    })).then(() => res.render('success'));
});

app.listen(process.env.PORT || 3000, () => console.log('server'));
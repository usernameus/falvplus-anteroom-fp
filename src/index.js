// import './index.html'
import dva from 'dva'
import {browserHistory} from 'dva/router'
import createLoading from 'dva-loading'

// var https = require('https')
// var fs = require('fs')
// var forceSSL = require('koa-force-ssl')

// 1. Initialize
// const history = /seBasename(createHistory)({
//   basename: '/test'
// });
const app = dva({
  history: browserHistory,

})
app.use(createLoading())

// app.use(forceSSL())

// 2. Model

app.model(require('./models/app'))
app.model(require("./models/businessareadetails"));
app.model(require("./models/businessarea"));
app.model(require("./models/mainLawyerDetails"));
app.model(require("./models/mainLawyerList"));
app.model(require("./models/businessdomain"));
app.model(require("./models/lawyerList"));
app.model(require("./models/anteroomManage"));
app.model(require("./models/tip"));
app.model(require("./models/collaborativeLawyer"));
app.model(require("./models/financeList"));
//app.model(require("./models/OrderDetails"));
app.model(require("./models/consultationOrder"));
app.model(require("./models/account"));
app.model(require("./models/crmcontact"));
app.model(require("./models/crmcustomer"));
app.model(require("./models/crmfollowup"));
app.model(require("./models/crmdict"));
app.model(require("./models/channelinfo"));
app.model(require("./models/activity"));
app.model(require("./models/activities"));
app.model(require("./models/holdroom"));
app.model(require("./models/evaluate"));
app.model(require("./models/sms"));
app.model(require("./models/contactsProfile"));
app.model(require("./models/customersProfile"));
app.model(require("./models/contacts"));
app.model(require("./models/customers"));
app.model(require("./models/scheint"));
app.model(require("./models/MyFinances"));
app.model(require("./models/costomerOrder"));
app.model(require("./models/userDetails"));
app.model(require("./models/login"));
app.model(require("./models/productDetails"));
app.model(require("./models/casess"));
app.model(require("./models/cases"));
app.model(require("./models/adminActivities"));
app.model(require("./models/adminCases"));
app.model(require("./models/fparauth"));
app.model(require("./models/article"));
app.model(require("./models/Bill"));
app.model(require("./models/adminArticle"));
app.model(require("./models/order"));
app.model(require("./models/articles"));
app.model(require("./models/products"));
app.model(require("./models/myproducts"));
app.model(require("./models/profile"));
app.model(require("./models/fhome"));
app.model(require('./models/dashboard'))
app.model(require('./models/users'));
app.model(require('./models/myorder'));
app.model(require('./models/myorderdetails'));




// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')

// // HTTPS
// var options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.crt')
// }
//
// https.createServer(options, app.callback()).listen('8848')


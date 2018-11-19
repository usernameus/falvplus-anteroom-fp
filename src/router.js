import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'
import Fhome from './routes/Fhome.js'
import OrderFlow from './routes/order/OrderFlow'
import Holdroom from "./routes/Holdroom.js";

import LawyerList from "./routes/LawyerList.js";

import PowerManage from "./routes/PowerManage.js";

import AnteroomManage from "./routes/AnteroomManage.js";

import BusinessArea from "./routes/BusinessArea.js";

import BusinessAreaDetails from "./routes/BusinessAreaDetails.js";

export default function ({history, app}) {
  const routes = [
    {
      path: '/anteroom',
      component: Holdroom,
      getIndexRoute (nextState, cb){
        require.ensure([], require => {
          cb(null, {component: require('./routes/Holdroom')})
        })
      },
      childRoutes: [
        {
          path: '*',
          name: 'channel',
        }
      ]
    },
    {
      path: '/admin',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./routes/dashboard')})
        })
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/dashboard'))
            })
          }
        }, {
          path: 'crm',
          name: 'crm',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/customers'))
            })
          }
        }, {
          path: 'schedule',
          name: 'schedule',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Sche'))
            })
          }
        },
        {
          path: 'schedule/int',
          name: 'schedule',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Scheint'))
            })
          }
        }, {
          path: 'crm/:customerId',
          name: 'customer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/CustomersProfile'))
            })
          }
        },
        //{
        //  path: 'order/:orderId',
        //  name: 'orders',
        //  getComponent(nextState, cb){
        //    require.ensure([] , require => {
        //      cb(null, require('./routes/OrderDetails'))
        //    })
        //  }
        //},
        {
          path: 'contacts',
          name: 'contacts',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/Contacts'))
            })
          }
        }, {
          path: 'contactsProfile/:contactId',
          name: 'contacts',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ContactsProfile'))
            })
          }
        }, {
          path: 'collaborative',
          name: 'collaborative',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/Collaborative'))
            })
          }
        },  {
          path: 'financeList',
          name: 'financeList',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/FinanceList'))
            })
          }
        },{
          path: 'collaborativeProfile/:collaborativeId',
          name: 'collaborative',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/CollaborativeProfile'))
            })
          }
        },   {
          path: 'Myproducts',
          name: 'Myproducts',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/Myproducts'))
            })
          }
        },{
          path: 'articles',
          name: 'articles',
          getComponent(nextState, cb){
            require.ensure([], require=>{
              cb(null, require('./routes/AdminArticle'))
            })
          }
        },{
          path: 'article**',
          name: 'addArticle',
          getComponent(nextState, cb){
            require.ensure([], require=>{
              cb(null, require('./routes/ArticleModal'))
            })
          }
        },{
          path: 'cases',
          name: 'cases',
          getComponent(nextState, cb){
            require.ensure([], require=>{
              cb(null, require('./routes/AdminCases'))
            })
          }
        },{
          path: 'case**',
          name: 'addCase',
          getComponent(nextState, cb){
            require.ensure([], require=>{
              cb(null, require('./routes/CaseModal'))
            })
          }
        },{
          path: 'activities',
          name: 'activities',
          getComponent(nextState, cb){
            require.ensure([], require=>{
              cb(null, require('./routes/AdminActivities'))
            })
          }
        },{
          path: 'activity**',
          name: 'addActivity',
          getComponent(nextState, cb){
            require.ensure([], require=>{
              cb(null, require('./routes/ActivityModal'))
            })
          }
        },{
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'))
            })
          }
        }, {
          path: 'ui/search',
          name: 'ui/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/search'))
            })
          }
        },{
          path: 'myorder',
          name: 'myorder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/myorder'))
            })
          }
        }, {
          path: 'myorderdetails**',
          name: 'myorderdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/myorderdetails'))
            })
          }
        },{
          path: 'schedule',
          name: 'schedule',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Sche'))
            })
          }
        },
        {
          path: 'schedule/int',
          name: 'schedule',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Scheint'))
            })
          }
        },{
          path: 'consultation',
          name: 'consultation',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Consultation'))
            })
          }
        },
        //律师管理
        {
          path: 'lawyerList',
          name: 'lawyerList',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/LawyerList'))
            })
          }
        },
        //会客室管理
        {
          path: 'anteroomManage',
          name: 'anteroomManage',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/AnteroomManage'))
            })
          }
        },
        //权限管理
        // {
        //   path: 'powerManage',
        //   name: 'powerManage',
        //   getComponent(nextState, cb){
        //     require.ensure([], require => {
        //       cb(null, require('./routes/PowerManage'))
        //     })
        //   }
        // },
        //业务领域
        {
          path: 'businessDomain',
          name: 'businessDomain',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/BusinessDomain'))
            })
          }
        },
        {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            })
          }
        }
      ]
    },
    {
      path: '/',
      component: Fhome,
      getIndexRoute(nextState, cb){
        require.ensure([], require => {
          cb(null, {component: require('./routes/Childrens')})
        })
      },
      childRoutes:[
        {
          path: 'profile',
          name: 'profile',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Profile'))
            })
          }
        },
        {
          path: 'articles',
          name: 'articles',
          getComponent (nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Articles'))
            })
          }
        },
        {
          path: 'article/:articleId',
          name: 'article',
          getComponent(nextSate, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Article'))
            })
          }
        },
        {
          path: 'addArticle',
          name: 'article',
          getComponent(nextSate, cb){
            require.ensure([], require => {
              cb(null, require('./routes/AddArticle'))
            })
          }
        },
        {
          path: 'cases',
          name: 'cases',
          getComponent (nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Cases'))
            })
          }
        },
        {
          path: 'tip',
          name: 'tip',
          getComponent (nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Tip'))
            })
          }
        },
        {
          path: 'case/:caseId',
          name: 'case',
          getComponent(nextSate, cb){
            require.ensure([], require => {
              cb(null, require('./routes/Casess'))
            })
          }
        },
        {
          path: 'products',
          name: 'products',
          getComponent(nextState, cb){
            require.ensure([] , require => {
              cb(null, require('./routes/Products'))
            })
          }
        },
        {
          path: 'product/:productId',
          name: 'product',
          getComponent(nextState, cb){
            require.ensure([] , require => {
              cb(null, require('./routes/ProductDetails'))
            })
          }
        },
        {
          path: 'activities',
          name: 'activities',
          getComponent(nextState, cb){
            require.ensure([] , require => {
              cb(null, require('./routes/Activities'))
            })
          }
        },
        {
          path: 'activity/:activityId',
          name: 'activity',
          getComponent(nextState, cb){
            require.ensure([] , require => {
              cb(null, require('./routes/Activity'))
            })
          }
        },
        {
          path: 'addActivity',
          name: 'article',
          getComponent(nextSate, cb){
            require.ensure([], require => {
              cb(null, require('./routes/AddActivity'))
            })
          }
        },
        {
          path: 'orderflow',
          Component: OrderFlow,
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/order/OrderFlow'))
            })
          },
          childRoutes:[
            {
              path: 'hope/:productId',
              name: 'hopeorder',
              getComponent(nextState, cb){
                require.ensure([], require => {
                  cb(null, require('./routes/order/Hope'))
                })
              }
            },
            {
              path: 'payOrder/:productId',
              name: 'payorder',
              getComponent(nextState, cb){
                require.ensure([], require => {
                  cb(null, require('./routes/order/Hope'))
                })
              }
            },
            // {
            //   path: 'evaluate/:orderId',
            //   name: 'evaluate',
            //   getComponent(nextState, cb){
            //     require.ensure([], require => {
            //       cb(null, require('./routes/order/Evaluate'))
            //     })
            //   }
            // }
          ]

        },

        {
          path: 'phoneOrder',
          name: 'order',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/phoneOrder'))
            })
          }
        },
        {
          path: 'phoneOrder/pay/:orderId',
          name: 'orderpay',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/phoneOrder'))
            })
          }
        },
        {
              path: 'phoneOrder/evaluate/:orderId',
              name: 'evaluate',
              getComponent(nextState, cb){
                require.ensure([], require => {
                  cb(null, require('./routes/phoneOrder'))
                })
              }
        },
        {
          path: 'userDetails',
          name: 'userDetails',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/UserDetails'))
            })
          }
        },
        {
          path: 'MyOrder',
          name: 'MyOrder',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/customerOrder'))
            })
          }
        },
        {
          path: 'MyFinances',
          name: 'MyFinances',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/MyFinances'))
            })
          }
        },
        {
          path: 'lawyerList',
          name: 'lawyerList',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/MainLawyersList'))
            })
          }
        },
        {
          path: 'lawyerDetails/:lawyerId',
          name: 'lawyerDetails',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/LawyerDetails'))
            })
          }
        },
        {
          path: 'businessAreas',
          name: 'businessAreas',
          getComponent(nextState, cb){
            require.ensure([], require => {
              cb(null, require('./routes/BusinessArea'))
            })
          }
        },
        {
          path: 'businessArea/:businessAreaId',
          name: 'businessArea',
          getComponent(nextState, cb){
            require.ensure([] , require => {
              cb(null, require('./routes/BusinessAreaDetails'))
            })
          }
        },
      ]
    }
  ]

  return <Router history={history} routes={routes} />;
}

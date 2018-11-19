import {parse} from 'qs'
import {article } from '../services/articles'
export default {
  namespace: 'article',
  state: {
    articleId:'',
    articleTitle: '',
    articleAuthor: '',
    articleCover: '',
    articleContent: ''
  },
  reducers: {
    articleOk(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *article({payload}, {call,put}){
      const data = yield call(article, parse(payload));
      if(data){
        yield put({
          type: 'articleOk',
          payload: data
        })
      }
    },
},
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname.parsePath().startWith('/article/')){
          let articleId = location.pathname.parsePath().getVarFromPath(2);
          dispatch({
            type: 'article',
            payload: {
              id: articleId
            }
          })
        }
      });
    }
  },
};

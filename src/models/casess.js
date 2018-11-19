import {parse} from 'qs'
import {cases } from '../services/cases'
export default {
  namespace: 'casess',
  state: {
    articleId:'',
    articleTitle: '',
    articleAuthor: '',
    articleCover: '',
    articleContent: '',
    articlePicture:''
  },
  reducers: {
    casessOk(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *casess({payload}, {call,put}){
      const data = yield call(cases, parse(payload));
      if(data){
        yield put({
          type: 'casessOk',
          payload: data
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname.parsePath().startWith('/case/')){
          let caseId = location.pathname.parsePath().getVarFromPath(2);
          dispatch({
            type: 'casess',
            payload: {
              id: caseId
            }
          })
        }
      });
    }
  },
};

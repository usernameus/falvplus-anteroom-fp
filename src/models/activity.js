import {parse} from 'qs'
import {activities } from '../services/activities'
export default {
  namespace: 'activity',
  state: {
    articleId:'',
    articleTitle: '',
    articleAuthor: '',
    articleCover: '',
    articleContent: '',
    previewVisible:false,
  },
  reducers: {
    //图片显示
    hidePictureModal (state) {
      return {...state, previewVisible: false}
    },
    showPictureModal(state){
      return{...state, previewVisible:true};
    },
    activityOk(state, action){
      return {...state, ...action.payload};
    }
  },
  effects: {
    *activity({payload}, {call,put}){
      const data = yield call(activities, parse(payload));
      if(data){
        yield put({
          type: 'activityOk',
          payload: data
        })
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname.parsePath().startWith('/activity/')){
          let activityId = location.pathname.parsePath().getVarFromPath(2);
          dispatch({
            type: 'activity',
            payload: {
              id: activityId
            }
          })
        }
      });
    }
  },
};

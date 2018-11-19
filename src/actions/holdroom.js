/**
 * Created by mel on 2017/4/19.
 */
import {createAction} from 'redux-actions';

// export const actChangeChannel = createAction('holdroom/changeChannel');
// export const actChangeFileList = createAction('holdroom/changeFileList');
export const actInitChannelInfo = createAction('channelinfo/init');
export const actLeaveChannel = createAction('channelinfo/leaveChannel');
export const actChangeTab = createAction('channelinfo/changeTab');
export const streamPublished = createAction('channelinfo/streamPublished');
export const streamUnpublished = createAction('channelinfo/streamUnpublished');
export const streamAdded = createAction('channelinfo/streamAdded');
export const streamRemoved = createAction('channelinfo/streamRemoved');
// export const quoteOrderPrice = createAction('order/quotePrice');
export const actOpenCanvasPage = createAction('channelinfo/openCanvasPage');
export const actCloseFilePanel = createAction('channelinfo/closeFilePanel');
export const actDrawShape = createAction('channelinfo/drawShape');
export const actChangeFileList = createAction('channelinfo/changeFileList');
export const actChangeDrawingType = createAction('channelinfo/changeDrawingType');
export const actShareFile = createAction('channelinfo/shareFile');
export const actUnShareFile = createAction('channelinfo/unshareFile');
export const actChangeCanvasUsers = createAction('channelinfo/changeCanvasUsers');
export const actChangeTimeFilter = createAction('channelinfo/changeTimeFilter');
export const actLoginModal = createAction('login/showModal');
export const actVerifyCode = createAction('login/getVerifyCode');
export const actLogin = createAction('login/login');
export const actLogout = createAction('login/logout');
export const handlePay = createAction('bill/bcPayBtn');
export const actChannels = createAction('holdroom/channelsResult');
export const actAllChannels = createAction('holdroom/allChannelsResult');
export const actChannelName = createAction('channelinfo/channelName');
export const AddChannel = createAction('holdroom/showAddChannelModal');
export const hideAddChannel = createAction('holdroom/hideAddChannelModal');
export const showInviteUsers = createAction('holdroom/showInviteUsersModal');
export const hideInviteUsers = createAction('holdroom/hideInviteUsersModal');
export const actLoadingChannel = createAction('holdroom/loadingChannel');
export const onPayType = createAction('order/QueryBalance');
export const onBalancePay = createAction('order/BalancePayment');
export const onHidePayModal = createAction('order/HidePayModal');



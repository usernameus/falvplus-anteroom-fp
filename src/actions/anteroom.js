/**
 * Created by mel on 2017/3/12.
 */

import {createAction} from 'redux-actions';

export const enterRoomSuccess = createAction('anteroom/enterRoomSuccess');
export const joinSuccess = createAction('anteroom/joinSuccess');
export const sendMessage = createAction('anteroom/sendMessage');
export const recvNewMessage = createAction('anteroom/recvNewMessage');
export const onlineUsers = createAction('anteroom/onlineUsers');
export const publishStream = createAction('anteroom/publishStream');
export const streamPublished = createAction('anteroom/streamPublished');
export const streamUnpublished = createAction('anteroom/streamUnpublished');
export const streamSubscribed = createAction('anteroom/streamSubscribed');
export const streamAdded = createAction('anteroom/streamAdded');
export const streamRemoved = createAction('anteroom/streamRemoved');
export const actCloseAv = createAction('anteroom/closeAv');
export const actToggleAudio = createAction('anteroom/toggleAudio');
export const actToggleVideo = createAction('anteroom/toggleVideo');
export const changeDrawingType = createAction('anteroom/changeDrawingType');
export const changeFileList = createAction('anteroom/changeFileList');
export const openCanvasPage = createAction('anteroom/openCanvasPage');
export const actChangeChannel = createAction('anteroom/changeChannel');
export const actShowChannelLoading = createAction('anteroom/showChannelLoading');
export const remoteDrawingShape = createAction('anteroom/remoteDrawShape');
export const actRotateCanvas = createAction('anteroom/rotateCanvas');
export const actCollapse = createAction('anteroom/collapse');

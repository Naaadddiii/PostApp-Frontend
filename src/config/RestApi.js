/* eslint-disable react-hooks/exhaustive-deps */
import {BASE_URL} from './EnvConfig';

export const LOGIN = `${BASE_URL}api/user/login`;
export const SIGNUP = `${BASE_URL}api/user/signup`;
// export const GET_USER_BY_TYPE = `${BASE_URL}api/user/${type}`;
export const GET_USER_BY_ID = `${BASE_URL}api/user`;
export const USER_POST_LIST = `${BASE_URL}api/post/user`;
export const ADD_POST = `${BASE_URL}api/post/add`
export const UPDATE_POST = `${BASE_URL}api/post/update`;
export const DELETE_POST = `${BASE_URL}api/post/delete`;
export const POST_LIST = `${BASE_URL}api/post`;
export const SINGLE_POST_DETAIL = `${BASE_URL}api/post`;
export const POST_LIKE = `${BASE_URL}api/post/like`;
export const POST_UNLIKE = `${BASE_URL}api/post/unlike`;
export const LIST_POST_COMMENT = `${BASE_URL}api/post/comments`;
export const ADD_POST_COMMENT = `${BASE_URL}api/post/comment`;
export const DELETE_POST_COMMENT = `${BASE_URL}api/post`;
export const UPDATE_POST_COMMENT = `${BASE_URL}api/post`;








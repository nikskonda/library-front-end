export const BACK_END_SERVER_URL = 'http://localhost:8888';

export const LOCAL_STORAGE_BOOK_LANGUAGE = 'bookLang';
export const LOCAL_STORAGE_UI_LANGUAGE = 'uiLang';
export const LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN = 'access_token';
export const LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN = 'refresh_token';
export const LOCAL_STORAGE_USER_DATA = 'user_data';
export const LOCAL_STORAGE_BASKET = 'bookBasket';

export const OAUTH2_GRANT_TYPE_PASSWORD = 'password';
export const OAUTH2_GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';
export const OAUTH2_CLIENT_ID = 'devglan-client';
export const OAUTH2_CLIENT_SECRET = 'devglan-secret';

export const DEFAULT_LANGUAGE = 'English';
export const DEFAULT_LANGUAGE_TAG = 'en-US';

export const USER_ROLE_LIBRARIAN = 'LIBRARIAN';

export const BOOK_TYPE_BOOK = 'BOOK';
export const BOOK_TYPE_COMICS = 'COMICS';
export const BOOK_TYPE_MAGAZINE = 'MAGAZINE';

export const BOOK_TYPE = [ 
    [ BOOK_TYPE_BOOK, { name: 'BOOK'}], 
    [ BOOK_TYPE_COMICS, {name: 'COMICS'}], 
    [ BOOK_TYPE_MAGAZINE, {name: 'MAGAZINE'}]
];



export const ORDER_STATUS_NEW = 'NEW';
export const ORDER_STATUS_CONFIRMED = 'CONFIRMED';
export const ORDER_STATUS_HANDED_OUT = 'HANDED_OUT';
export const ORDER_STATUS_AT_COURIER = 'AT_COURIER';
export const ORDER_STATUS_RECEIVED = 'RECEIVED';
export const ORDER_STATUS_RETURN_TO_COURIER = 'RETURN_TO_COURIER';
export const ORDER_STATUS_RETURNED = 'RETURNED';
export const ORDER_STATUS_CANCELLED = 'CANCELLED';

export const ORDER_STATUS = [
    [ORDER_STATUS_NEW, {text:'NEW', button:'NEW', icon:'plus', color: 'teal'}],
    [ORDER_STATUS_CONFIRMED, {text:'CONFIRMED', button:'CONFIRMED', icon:'thumbs up', color: 'green'}],
    [ORDER_STATUS_HANDED_OUT, {text:'HANDED OUT', button:'HANDED OUT', icon:'user', color: 'violet'}],
    [ORDER_STATUS_AT_COURIER, {text:'At COURIER', button:'At COURIER', icon:'bicycle'}],
    [ORDER_STATUS_RECEIVED, {text:'RECEIVED', button:'RECEIVEd', icon:'user', color: 'yellow'}],
    [ORDER_STATUS_RETURN_TO_COURIER, {text:'RETURN TO COURIER', button:'i want return to courier', icon:'redo', color: 'brown'}],
    [ORDER_STATUS_RETURNED, {text:'RETURNED', button:'RETURNED', icon:'thumbs up', color: 'purple'}],
    [ORDER_STATUS_CANCELLED, {text:'CANCELLED', button:'CANCELLED', icon:'delete', color: 'red'}],
];

export const URL_DOWNLOAD_FILE = '/file/download?file=';
export const BOOK_YEAR_MIN = 1801;

export let DELIVERY_PRICE = 5;

export const ROLE_USER = 'USER';
export const ROLE_LIBRARIAN = 'LIBRARIAN';
export const ROLE_COURIER = 'COURIER';
export const ROLE_JOURNALIST = 'JOURNALIST';
export const ROLE_ADMIN = 'ADMIN';


export const ROLE = [
    [ROLE_USER, { text:'user', color: 'green'}],
    [ROLE_LIBRARIAN, { text:'librarian', color: 'violet'}],
    [ROLE_COURIER, { text:'courier', color: 'purple'}],
    [ROLE_JOURNALIST, { text:'journalist', color: 'yellow'}],
    [ROLE_ADMIN, { text:'admin', color: 'red'}]
];



export const PAGINATION_BOUNDARY_RANGE = 2;
export const PAGINATION_SIBLING_RANGE = 2;

export const PAGINATION_NEWS_PER_ROW = 3;
export const PAGINATION_NEWS_ROWS = 7;

export const PAGINATION_BOOKS_PER_ROW = 3;
export const PAGINATION_BOOKS_ROWS = 7;

export const PAGINATION_COUNT_IN_DROPDOWN = 5;
export const PAGINATION_STEP_IN_DROPDOWN = 6; // ROW*PAGINATION_NEWS_PER_ROW;

export const USER_AVATAR_DEFAULT = '/img/user_ava.jpeg';
import {
    ORDER_STATUS_NEW,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_HANDED_OUT,
    ORDER_STATUS_AT_COURIER,
    ORDER_STATUS_RECEIVED,
    ORDER_STATUS_RETURN_TO_COURIER,
    ORDER_STATUS_RETURNED,
    ORDER_STATUS_CANCELLED
} from "./context"

import {
    ROLE_USER,
    ROLE_OPERATOR,
    ROLE_COURIER,
    ROLE_JOURNALIST,
    ROLE_LIBRARIAN,
    ROLE_ADMIN,
} from "./context"


export const L10N = {
    enUS: {
        menu:{
            home: "Home",
            news: "News",
            catalog: "Catalog",
            basket: "Basket",
            admin: "Administration",
            signIn: "Sign In/Sign Up",
            uiLang: "UI language",
            bookLang: "Book language",

            account: "Account",
            orders: "Orders",
            bookmarks: "Bookmarks",
            settings: "Settings",
            signOut: "Sign Out",
        },
        news:{
            added: "added",
            lang: "Select language",
            title: "Title",
            text: "Text",
            thumbnail: "Thumbnail",
            picture: "Picture",
            selectFile: "Select file",
            save: "Save",
            toNews: "Go to News",
            notFound: "News not found"
        },
        book:{
            search: "Search",
            toBusket: "To Busket",
            inLibraryUseOnly: 'In library use only',
            findInOrders: 'Find in Orders',
            edit: 'Edit',
            readPdf: 'Read PDF',
            readEpub: 'Read EPUB',
            lang: "Select language",
            title: "Title",
            description: "Description",
            thumbnail: "Thumbnail",
            picture: "Picture",
            pdf: "PDF",
            selectFile: "Select file",

            authors: "Authors",
            translators: "Translators",
            genres: "Genres",
            type: "Type",
            ageRestriction: "Age restriction",
            rating: "Rating",
            year: "Year",
            size: "Size",
            weight: "Weight",
            pages: "Pages",
            publishingHouse: "Publishing House",
            producer: "Produces",
            importer: "Importer",
            isbn: "ISBN",
            count: 'Count',
            wiki: 'WIKI',
            findByAuthor: 'Find All His Books',

            save: "Save",
            toBook: "Go to Book",
        },
        orders:{
            showDetails: 'Show Details',
            hideDetails: 'Hide Details',
            total: 'Total',
            all: 'ALL',
        },
        orderStatus: [
            [ORDER_STATUS_NEW, {
                text:'NEW', button:'New', icon:'plus', color: 'teal'
            }],
            [ORDER_STATUS_CONFIRMED, {
                text:'CONFIRMED', button:'Confirmed',  icon:'thumbs up', color: 'green'
                }],
            [ORDER_STATUS_HANDED_OUT, {
                text:'HANDED OUT', button:'Handed out', icon:'hand paper', color: 'violet'
                }],
            [ORDER_STATUS_AT_COURIER, {
                text:'AT COURIER', button:'At courier', icon:'bicycle', color: 'violet'
                }],
            [ORDER_STATUS_RECEIVED, {
                text:'RECEIVED', button:'Received', icon:'user', color: 'yellow'
                }],
            [ORDER_STATUS_RETURN_TO_COURIER, {
                text:'RETURNED TO COURIER', button:'Return to courier',  icon:'redo', color: 'brown'
                }],
            [ORDER_STATUS_RETURNED, {
                text:'RETURNED', button:'Returned',  icon:'thumbs up', color: 'purple'
                }],
            [ORDER_STATUS_CANCELLED, {
                text:'CANCELLED', button:'Cancel',  icon:'delete', color: 'red'
                }], 
        ],
        role: [
            [ROLE_USER, { text:'user', color: 'green'}],
            [ROLE_OPERATOR, { text:'operator', color: 'blue'}],
            [ROLE_LIBRARIAN, { text:'librarian', color: 'violet'}],
            [ROLE_COURIER, { text:'courier', color: 'purple'}],
            [ROLE_JOURNALIST, { text:'journalist', color: 'orange'}],
            [ROLE_ADMIN, { text:'admin', color: 'red'}]
        ],
        userList:{
            search: 'Search',
            searchPlaceholder: 'Username',
            clear: 'To Clear',
            ban: 'Ban',
            unban: 'Unban',
            userSettings: 'User Settings',
            orders: 'Orders',
            giveBook: 'Give books from basket',
            role: 'Select role',
        },
        basket:{
            count: 'Count: ',
            addOne: 'Add One',
            removeOne: 'Remove One',
            remove: 'Remove',
            removeAll: 'Remove All',
            checkout: 'Checkout',
            hide: 'Hide address form',
        },
        address:{
            selectAddress: 'Select Address',
            addNewAddress: 'Add New Address',
            lastList: 'Select from list of last addresses',

            country: 'Country',
            state: 'State',
            city: 'City',
            firstname: 'First Name',
            lastName: 'Last Name',
            phone: 'Phone Number',
            postalCode: 'Postal Code',
            address: 'Address',

            confirm: 'This is my address',
        },
        adminMenu:{
            home: 'Home',
            welcome: 'Welcome to admin panel!',
            userList: 'User list',
            userSettings: 'User Settings',
            orderList: 'Order list',
            bookEdit: 'Book edit',
            newsEDit: 'News edit',
        },
        bookmarks:{
            page: 'Page: ',
            pdfRead: 'Read PDF',
            epubRead: 'Read EPUB',
        },
        user: {
            username: 'Username',
            password: 'Password',
            confirmPassword: 'Confirm password',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            changeData: 'Change Data',
            or: 'OR',
        }
    },
    ruRU: {
        menu:{
            home: "Главная",
            news: "Новости",
            catalog: "Каталог",
            basket: "Корзина",
            admin: "Администрирование",
            signIn: "Войти",
            uiLang: "Язык интефейса",
            bookLang: "Язык книг",

        },
        orderStatus: [
            [ORDER_STATUS_NEW, {
                text:'НОВЫЙ', button:'Создан', icon:'plus', color: 'teal'
            }],
            [ORDER_STATUS_CONFIRMED, {
                text:'ПОДТВЕРЖЕНО', button:'Подтверждено', icon:'thumbs up', color: 'green'
            }],
            [ORDER_STATUS_HANDED_OUT, {
                text:'НА РУКАХ', button:'Отдано на руки',  icon:'hand paper', color: 'violet'
            }],
            [ORDER_STATUS_AT_COURIER, {
                text:'У КУРЬЕРА', button:'У курьера', icon:'bicycle', color: 'violet'
            }],
            [ORDER_STATUS_RECEIVED, {
                text:'ПОЛУЧЕНО', button:'Получено', icon:'user', color: 'yellow'
            }],
            [ORDER_STATUS_RETURN_TO_COURIER, {
                text:'ВОЗВРАЩЕНО КУРЬЕРУ', button:'Вернуть курьеру', icon:'redo', color: 'brown'
            }],
            [ORDER_STATUS_RETURNED, {
                text:'ВОЗВРАЩЕНО', button:'Возвращено', icon:'thumbs up', color: 'purple'
            }],
            [ORDER_STATUS_CANCELLED, {
                text:'ОТМЕНЕНО', button:'Отменить', icon:'delete', color: 'red'
            }], 
        ],
        role: [
            [ROLE_USER, { text:'пользователь', color: 'green'}],
            [ROLE_OPERATOR, { text:'оператор', color: 'blue'}],
            [ROLE_LIBRARIAN, { text:'библиотекарь', color: 'violet'}],
            [ROLE_COURIER, { text:'курьер', color: 'purple'}],
            [ROLE_JOURNALIST, { text:'жерналист', color: 'orange'}],
            [ROLE_ADMIN, { text:'админ', color: 'red'}]
        ]
    }
};
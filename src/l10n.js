import {
    ORDER_STATUS_NEW,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_HANDED_OUT,
    ORDER_STATUS_AT_COURIER,
    ORDER_STATUS_RECEIVED,
    ORDER_STATUS_RETURN_TO_COURIER,
    ORDER_STATUS_RETURNED,
    ORDER_STATUS_CANCELLED,
    LOCAL_STORAGE_UI_LANGUAGE,
    DEFAULT_L10N_LANGUAGE,
    BOOK_TYPE_BOOK,
    BOOK_TYPE_COMICS,
    BOOK_TYPE_MAGAZINE
} from "./context"

import {
    ROLE_USER,
    ROLE_OPERATOR,
    ROLE_COURIER,
    ROLE_JOURNALIST,
    ROLE_LIBRARIAN,
    ROLE_ADMIN,
} from "./context"
import LocalizedStrings from 'react-localization';

export const getLang = () => {
    let langStr = localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE);
    if (langStr) {
        return JSON.parse(langStr).tag;
    } else {
        return DEFAULT_L10N_LANGUAGE;
    }
};

export const getStrings = () => {
    let strings = new LocalizedStrings(L10N);
    strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
    return strings;
};

export const L10N = {
    enUS: {
        menu: {
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
        news: {
            added: "Added",
            lang: "Select language",
            title: "Title",
            text: "Text",
            thumbnail: "Thumbnail",
            picture: "Picture",
            selectFile: "Select file",
            save: "Save",
            edit: 'Edit',
            remove: 'Remove',
            toNews: "Go to News",
            notFound: "News not found"
        },
        book: {
            createNew: 'Create new: ',
            searchPlaceholder: "Search ...",
            search: "Search",
            clear: 'Clear',
            toBusket: "To Busket",
            inLibraryUseOnly: 'In library use only',
            addedToBasket: 'Current count in basket: ',
            findInOrders: 'Find in Orders',
            edit: 'Edit',
            remove: 'Remove',
            wasRemoved: 'Was successfully removed',
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
            pdfDownload: 'Download PDF',
            wiki: 'WIKI',
            findByAuthor: 'Find All His Books',

            save: "Save",
            toBook: "Go to Book",
            unknown: "unknown"
        },
        orders: {
            notFound: 'Orders not found',
            showDetails: 'Show Details',
            hideDetails: 'Hide Details',
            total: 'Total',
            all: 'ALL',
        },
        orderStatus: [
            [ORDER_STATUS_NEW, {
                text: 'NEW', button: 'New', icon: 'plus', color: 'teal'
            }],
            [ORDER_STATUS_CONFIRMED, {
                text: 'CONFIRMED', button: 'Confirmed', icon: 'thumbs up', color: 'green'
            }],
            [ORDER_STATUS_HANDED_OUT, {
                text: 'HANDED OUT', button: 'Handed out', icon: 'hand paper', color: 'violet'
            }],
            [ORDER_STATUS_AT_COURIER, {
                text: 'AT COURIER', button: 'At courier', icon: 'bicycle', color: 'violet'
            }],
            [ORDER_STATUS_RECEIVED, {
                text: 'RECEIVED', button: 'Received', icon: 'user', color: 'yellow'
            }],
            [ORDER_STATUS_RETURN_TO_COURIER, {
                text: 'RETURNED TO COURIER', button: 'Return to courier', icon: 'redo', color: 'brown'
            }],
            [ORDER_STATUS_RETURNED, {
                text: 'RETURNED', button: 'Returned', icon: 'thumbs up', color: 'purple'
            }],
            [ORDER_STATUS_CANCELLED, {
                text: 'CANCELLED', button: 'Cancel', icon: 'delete', color: 'red'
            }],
        ],
        role: [
            [ROLE_USER, {text: 'user', color: 'green'}],
            [ROLE_OPERATOR, {text: 'operator', color: 'blue'}],
            [ROLE_LIBRARIAN, {text: 'librarian', color: 'violet'}],
            [ROLE_COURIER, {text: 'courier', color: 'purple'}],
            [ROLE_JOURNALIST, {text: 'journalist', color: 'orange'}],
            [ROLE_ADMIN, {text: 'admin', color: 'red'}]
        ],
        bookType: [
            [ BOOK_TYPE_BOOK, { name: 'BOOK'}],
            [ BOOK_TYPE_COMICS, {name: 'COMICS'}],
            [ BOOK_TYPE_MAGAZINE, {name: 'MAGAZINE'}]
        ],
        userList: {
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
        basket: {
            count: 'Count: ',
            addOne: 'Add One',
            removeOne: 'Remove One',
            remove: 'Remove',
            removeAllButOne: 'Remove All but One',
            removeAll: 'Remove All',
            checkout: 'Checkout',
            hide: 'Hide address form',
            deliveryCost: 'Delivery cost 5 BYN',
        },
        address: {
            selectAddress: 'Select Address',
            addNewAddress: 'Add New Address',
            lastList: 'Select from list of last addresses',

            country: 'Country',
            state: 'State',
            city: 'City',
            firstName: 'First Name',
            lastName: 'Last Name',
            phone: 'Phone Number',
            postalCode: 'Postal Code',
            address: 'Address',

            confirm: 'This is my address',
        },
        adminMenu: {
            home: 'Home',
            welcome: 'Welcome to admin panel!',
            userList: 'User list',
            userSettings: 'User Settings',
            orderList: 'Order list',
            bookEdit: 'Book edit',
            newsEDit: 'News edit',
        },
        bookmarks: {
            open: 'Open Bookmark',
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
            changeData: 'Save Changes',
            or: 'OR',
        },
        readingRoom: {
            back: 'Back',
            createBookmark: 'Create Bookmark',
            prev: 'PREV',
            next: 'NEXT',
        },
        modal: {
            yes: 'Yes',
            no: 'No',
            cancel: 'Cancel',
            remove: 'Remove?',
            removeBook: 'You definitely want to delete the book "',
            removeNews: 'You definitely want to delete the news "',
            removeEnd: '"?',
            author: {
                header: 'Add author',
                firstName: 'First name',
                lastName: 'Last name',
                description: 'Description',
                wikiLink: 'Link to WIKIPEDIA',
                errorFirstName: 'First name should be less than 30 symbols. You typed ',
                errorLastName: 'Last name should be less than 30 symbols. You typed ',
                errorDescription: 'Description should be less than 500 symbols. You typed ',
                errorWikiLink: 'Link should be less than 255 symbols. You typed ',
                create: 'Create'
            },
            genre: {
                header: 'Add Genre',
                content: 'Are you want create: '
            },
            org: {
                header: 'Add Organization',
                content: 'Are you want create: '
            },
            publishingHouse: {
                header: 'Add Publishing House',
                title: 'Title',
                errorTitle: 'Title should be less than 40 symbols. You typed ',
                description: 'Description',
                errorDescription: 'Description should be less than 600 symbols. You typed ',
                siteLink: 'SiteLink',
                errorSiteLink: 'Link should be less than 255 symbols. You typed ',
            },
            role: {
                header: 'Role',
                add: 'Are you want add role:',
                remove: 'Are you want remove role:',
            }

        },
        success: {
            success: 'Success',
            userData: 'User data was successfully updated',
            wasRemovedBook: 'Book was removed.',
            wasRemovedNews: 'News was removed.',
            inBasket: 'Book was added to basket.',
            bookmarkCreated: 'Bookmark successfully created!',

        },
        error: {
            error: 'Error',
            user: {
                signIn: "Authorization error",
                signUp: 'Registration error',
                username: 'Username must contain only the letters {a-z} and be between 4 and 30. You wrote ',
                password: 'Password must be between 5 and 20. You wrote ',
                confirmPassword: 'Passwords are different',
                firstName: 'First name must be less than 30 characters',
                lastName: 'Last name must be less than 30 characters',
                email: 'Enter valid email'
            },
            book: {
                catalog: 'Books not found',
                notFound: 'Book not found',
                language: 'Language must be selected',
                title: 'Title must be filled and the number of characters up to 255. You typed ',
                description: 'Text must be filled and the number of characters up to 3000. You typed ',
                ageRestriction: 'Age restriction must be filled and the number of characters up to 255. You typed ',
                genres: 'Genre must be selected',
                rating: 'Count must be between 1 and 100.',
                thumbnail: 'Thumbnail must be selected',
                picture: 'Picture must be selected',
                size: 'Size must be filled and the number of characters up to 255. You typed ',
                count: 'Count must be more than 1.',
                isbn: 'ISBN must be filled and the number of characters up to 255. You typed ',
            },
            news: {
                notFound: 'News not found',
                language: 'Language must be selected',
                title: 'Title must be filled and the number of characters up to 255. You typed ',
                text: 'Text must be filled and the number of characters up to 10000. You typed ',
                thumbnail: 'Thumbnail must be selected',
                picture: 'Picture must be selected',
            },
            basket: {
                notFound: 'Your basket is empty',
                notCreated: 'Your order has not been created',
            },
            address: {
                city: 'Need to choose a city',
                firstName: 'First name must be filled and the number of characters up to 30. You typed ',
                lastName: 'Last name must be filled and the number of characters up to 30. You typed ',
                postalCode: 'Postal code must be filled and the number of characters up to 30. You typed ',
                phone: 'Phone must be filled and the number of characters up to 30. You typed ',
                address: 'Address must be filled and the number of characters up to 400. You typed ',
            },
            bookmark: {
                didntCreate: `Bookmark didn't creat!`,
            }
        }
    },
    ruRU: {
        menu: {
            home: "Главная",
            news: "Новости",
            catalog: "Каталог",
            basket: "Корзина",
            admin: "Администрирование",
            signIn: "Войти",
            uiLang: "Язык интефейса",
            bookLang: "Язык книг",

            account: "Аккаунт",
            orders: "Заказы",
            bookmarks: "Закладки",
            settings: "Настройки",
            signOut: "Выйти",
        },
        news: {
            added: "Добавлено ",
            lang: "Выберите язык",
            title: "Заголовок",
            text: "Текст",
            thumbnail: "Миниатюра",
            picture: "Изображение",
            selectFile: "Выберите файл",
            save: "Сохранить",
            remove: 'Удалить',
            edit: 'Редактировать',
            toNews: "К новости",
            notFound: "Новость не найдена"
        },
        book: {
            createNew: 'Новый: ',
            searchPlaceholder: "Поиск ...",
            search: "Поиск",
            clear: 'Очистить',
            toBusket: "В корзину",
            inLibraryUseOnly: 'Только в библиотеке',
            addedToBasket: 'На данный момент в корзине: ',
            findInOrders: 'Найти в заказах',
            edit: 'Реадктировать',
            remove: 'Удалить',
            wasRemoved: 'Была успешна удалена',
            readPdf: 'Читать PDF',
            readEpub: 'Читать EPUB',
            lang: "Выберите язык",
            title: "Название",
            description: "Описание",
            thumbnail: "Миниатюра",
            picture: "Изображение",
            pdf: "PDF",
            selectFile: "Выберите файл",

            authors: "Авторы",
            translators: "Переводчики",
            genres: "Жанры",
            type: "Тип",
            ageRestriction: "Возврастные ограничения",
            rating: "Рейтинг",
            year: "Год",
            size: "Размер",
            weight: "Вес",
            pages: "Страниц",
            publishingHouse: "Издательский дом",
            producer: "Изготовитель",
            importer: "Импортёр",
            isbn: "ISBN",
            count: 'Количество',
            wiki: 'WIKI',
            findByAuthor: 'Найти все его книги',

            save: "Сохранить",
            toBook: "К книге",
            pdfDownload: 'Скачать PDF',
            unknown: "не известен"
        },
        orders: {
            notFound: 'Заказов не найдено',
            showDetails: 'Показать детали',
            hideDetails: 'Скрыть детали',
            total: 'Всего',
            all: 'ВСЕ',
        },
        orderStatus: [
            [ORDER_STATUS_NEW, {
                text: 'НОВЫЙ', button: 'Создан', icon: 'plus', color: 'teal'
            }],
            [ORDER_STATUS_CONFIRMED, {
                text: 'ПОДТВЕРЖЕНО', button: 'Подтверждено', icon: 'thumbs up', color: 'green'
            }],
            [ORDER_STATUS_HANDED_OUT, {
                text: 'НА РУКАХ', button: 'Отдано на руки', icon: 'hand paper', color: 'violet'
            }],
            [ORDER_STATUS_AT_COURIER, {
                text: 'У КУРЬЕРА', button: 'У курьера', icon: 'bicycle', color: 'violet'
            }],
            [ORDER_STATUS_RECEIVED, {
                text: 'ПОЛУЧЕНО', button: 'Получено', icon: 'user', color: 'yellow'
            }],
            [ORDER_STATUS_RETURN_TO_COURIER, {
                text: 'ВОЗВРАЩЕНО КУРЬЕРУ', button: 'Вернуть курьеру', icon: 'redo', color: 'brown'
            }],
            [ORDER_STATUS_RETURNED, {
                text: 'ВОЗВРАЩЕНО', button: 'Возвращено', icon: 'thumbs up', color: 'purple'
            }],
            [ORDER_STATUS_CANCELLED, {
                text: 'ОТМЕНЕНО', button: 'Отменить', icon: 'delete', color: 'red'
            }],
        ],
        role: [
            [ROLE_USER, {text: 'пользователь', color: 'green'}],
            [ROLE_OPERATOR, {text: 'оператор', color: 'blue'}],
            [ROLE_LIBRARIAN, {text: 'библиотекарь', color: 'violet'}],
            [ROLE_COURIER, {text: 'курьер', color: 'purple'}],
            [ROLE_JOURNALIST, {text: 'журналист', color: 'orange'}],
            [ROLE_ADMIN, {text: 'админ', color: 'red'}]
        ],
        bookType: [
            [ BOOK_TYPE_BOOK, { name: 'КНИГА'}],
            [ BOOK_TYPE_COMICS, {name: 'КОМИКС'}],
            [ BOOK_TYPE_MAGAZINE, {name: 'ЖУРНАЛ'}]
        ],
        userList: {
            search: 'Поиск',
            searchPlaceholder: 'Имя пользователя',
            clear: 'Очистить',
            ban: 'Забанить',
            unban: 'Разбранить',
            userSettings: 'Настройки пользователя',
            orders: 'Заказы',
            giveBook: 'Выдать книги из корзины',
            role: 'Выбрать роль',
        },
        basket: {
            count: 'Количество: ',
            addOne: 'Добавить ещё одну',
            removeOne: 'Удалить одну',
            remove: 'Удалить',
            removeAllButOne: 'Оставить только одну',
            removeAll: 'Удалить все',
            checkout: 'Оформить',
            hide: 'Скрыть форму ввода адреса',
            deliveryCost: 'Стоимость доставки 5 BYN',
        },
        address: {
            selectAddress: 'Выберите адрес',
            addNewAddress: 'Добавить новый адрес',
            lastList: 'Выбрать адрес из списка последних',

            country: 'Страна',
            state: 'Регион',
            city: 'Город',
            firstName: 'Имя',
            lastName: 'Фамилия',
            phone: 'Телефон',
            postalCode: 'Индекс',
            address: 'Адрес',

            confirm: 'Это мой адрес',
        },
        adminMenu: {
            home: 'Главная',
            welcome: 'Добро пожаловать в панель администрирования!',
            userList: 'Пользователи',
            userSettings: 'Настройки пользователя',
            orderList: 'Заказы',
            bookEdit: 'Редактор книг',
            newsEDit: 'Редактор новостей',
        },
        bookmarks: {
            open: 'Открыть закладку',
            page: 'Страница: ',
            pdfRead: 'Читать PDF',
            epubRead: 'Читать EPUB',
        },
        user: {
            username: 'Имя пользователя',
            password: 'Пароль',
            confirmPassword: 'Повторите пароль',
            signIn: 'Войти',
            signUp: 'Регистрация',
            firstName: 'Имя',
            lastName: 'Фамилия',
            email: 'Email',
            changeData: 'Применить изменения',
            or: 'ИЛИ',
        },
        readingRoom: {
            back: 'Назад',
            createBookmark: 'Создать закладку',
            prev: 'ПРЕД',
            next: 'СЛЕД',
        },
        modal: {
            yes: 'Да',
            no: 'Нет',
            cancel: 'Отмена',
            remove: 'Удалить?',
            removeBook: 'Вы действительно хотите удалить книгу "',
            removeNews: 'Вы действительно хотите удалить новость "',
            removeEnd: '"?',
            create: 'Создать',
            author: {
                header: 'Автор',
                firstName: 'Имя',
                lastName: 'Фамилия',
                description: 'Описание',
                wikiLink: 'Ссылка на Википедию',
                errorFirstName: 'Имя должно быть менее 30 символов. Вы набрали ',
                errorLastName: 'Фамилия должна быть менее 30 символов. Вы набрали ',
                errorDescription: 'Описание должно быть менее 500 символов. Вы набрали ',
                errorWikiLink: 'Ссылка должна быть менее 255 символов. Вы набрали ',
                create: 'Создать'
            },
            genre: {
                header: 'Добавить Жанр',
                content: 'Вы хотите создать: '
            },
            org: {
                header: 'Добавить Организацию',
                content: 'Вы хотите создать: '
            },
            publishingHouse: {
                header: 'Добавить Издательский Дом',
                title: 'Название',
                errorTitle: 'Название олжно быть менее 40 символов. Вы набрали ',
                description: 'Описание',
                errorDescription: 'Описание должно быть менее 600 символов. Вы набрали ',
                siteLink: 'Ссылка на сайт',
                errorSiteLink: 'Ссылка должна быть менее 255 символов. Вы набрали ',
            },
            role: {
                header: 'Роль',
                add: 'Вы хотите добавить роль:',
                remove: 'Вы ходите удалить роль:',
            }
        },
        success: {
            success: 'Успех',
            userData: 'Данные пользователя были успешно изменены',
            wasRemovedBook: 'Книга была удалена.',
            wasRemovedNews: 'Новость была удалена.',
            inBasket: 'Книга добавлена в корзину.',
            bookmarkCreated: 'Закладка успешно создана!',

        },
        error: {
            error: 'Ошибка',
            user: {
                signIn: "Ошибка авторизации",
                signUp: 'Ошибка регистрации',
                username: 'Имя пользователя должно содержать символы {a-z} и от4 до 30. Вы набрали ',
                password: 'Пароль должен содержать от 5 до 20 символов. Вы набрали ',
                confirmPassword: 'Пароли различаются',
                firstName: 'Имя должно быть менее 30 символов',
                lastName: 'Фамилия должно быть менее 30 символов',
                email: 'Введите существующий email'
            },
            book: {
                catalog: 'Книги не были найдены',
                notFound: 'Книга не найдена',
                language: 'Язык долежн быть выбран',
                title: 'Название должно быть менее 255 символов. Вы набрали ',
                description: 'Описание должно быть менее 3 000 символов. Вы набрали ',
                ageRestriction: 'Возрастное ограничение должно быть менее 255 символов. Вы набрали',
                genres: 'Жанр должен быть выбран',
                rating: 'Рейтинг должен быть между 1 и 100.',
                thumbnail: 'Выберите миниатюру',
                picture: 'Выберите изображение',
                size: 'Размер должен быть менее 255 символов. Вы набрали ',
                count: 'Количество должно быть болле 1.',
                isbn: 'ISBN должен быть менее 255 символов. Вы набрали ',
            },
            news: {
                notFound: 'Новость не найдена',
                language: 'Выберите язык',
                title: 'Заголовок должен быть менее 255 символов. Вы набрали ',
                text: 'Текст должен быть менее 10 000 символов. Вы набрали ',
                thumbnail: 'Выберите миниатюру',
                picture: 'Выберите изображение',
            },
            basket: {
                notFound: 'Ваша корзина пуста',
                notCreated: 'Ваш заказ не был создан',
            },
            address: {
                city: 'Выберите город',
                firstName: 'Имя должно быть менее 30 символов. Вы набрали ',
                lastName: 'Фамилия должна быть менее 30 символов. Вы набрали ',
                postalCode: 'Почтовый код должен быть менее 255 символов. Вы набрали ',
                phone: 'Телефон должен быть менее 30 символов. Вы набрали  ',
                address: 'Адресс должен быть менее 400 символов. Вы набрали ',
            },
            bookmark: {
                didntCreate: `Закладка не была создана!`,
            }
        }
    }
};
import MainPage from "./MainPage";
import ComicsPage from "./ComicsPage";
import SingleComicPage from "./singleComicLayout/SingleComicLayout";
import Page404 from "./404";

// когда очень много страниц,
// то удобно все импортировать в один файл,
// потом экмпортировать в кач-ве одного объекта
// а где нужно исп-ть эти страницы импортировать только одной строчкой
export {MainPage, ComicsPage, SingleComicPage, Page404};
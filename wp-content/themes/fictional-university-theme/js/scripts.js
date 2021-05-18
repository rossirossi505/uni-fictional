
import $ from 'jquery' ;
import "../css/style.css"  ;


// Our modules / classes
import MobileMenu from "./modules/MobileMenu"
import HeroSlider from "./modules/HeroSlider"
import Search from "./modules/Search"
import Mynotes from "./modules/mynotes"
import Mylikexs from "./modules/Like"


 
// Instantiate a new object using our modules/classes
var mobileMenu = new MobileMenu()
var heroSlider = new HeroSlider()
var magicalSearch = new Search()
var mynotes = new Mynotes()
var mynotes = new Mylikexs()










// Allow new JS and CSS to load in browser without a traditional page refresh
if (module.hot) {
  module.hot.accept()
}

import {
  FaHeadphones,
  FaCamera,
  FaGamepad,
  FaGlasses,
  FaArrowDown,
  FaChartBar,
  FaStopwatch,
  FaHome,
  FaMobileAlt,
  FaBlog,
  FaEnvelope,
} from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdOutlineLaptopMac } from "react-icons/md";

export const linksLeft: string[] = [
  "About Us",
  "My account",
  "Featured Products",
  "Wishlist",
];

export const slidelinks = [
  { title: "Headphones", icon: FaHeadphones },
  {
    title: "Camera & Photo",
    icon: FaCamera,
  },
  {
    title: "Video Games",
    icon: FaGamepad,
  },
  {
    title: "Sports & Outdoors",
    icon: FaGlasses,
  },
  {
    title: "Best Sellers",
    icon: FaArrowDown, // no exact match for ArrowDownUpAcrossLine, use closest
  },
  {
    title: "Top 100 Offers",
    icon: FaChartBar, // closest to ChartSimple
  },
  {
    title: "New Arrivals",
    icon: FaStopwatch,
  },
];

export const mainlinks = [
  {
    title: "Home",
    to: "/",
    icon: FaHome,
  },
  {
    title: "Shop",
    to: "/shop",
    icon: FaShop,
  },
  {
    title: "Cell Phones",
    to: "/shop/cellphones",
    icon: FaMobileAlt,
  },
  {
    title: "Laptops",
    to: "/shop/Laptops",
    icon: MdOutlineLaptopMac,
  },
  {
    title: "Blog",
    to: "/blog",
    icon: FaBlog,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: FaEnvelope,
  },
];

export const mainlinksmobail = [
  {
    title: "Home",
    to: "/",
    icon: FaHome,
  },
  {
    title: "Cell Phones",
    to: "/cell-phones",
    icon: FaMobileAlt,
  },
  {
    title: "HeadPhones",
    icon: FaHeadphones,
  },
  {
    title: "Blog",
    to: "/blog",
    icon: FaBlog,
  },
  {
    title: "Contact",
    icon: FaEnvelope,
  },
];

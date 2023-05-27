const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require("../assets/images/background_1.png"),
    bannerImage: require("../assets//images/onboarding1.gif"),
    title: "Discover Your Favorite Products",
    description:
      "Experience exclusive benefits when you shop with us, including access to discounts, special deals, and rewards",
  },
  {
    id: 2,
    backgroundImage: require("../assets/images/background_1.png"),
    bannerImage: require("../assets/images/onboarding2.gif"),
    title: "Seamless Checkout",
    description:
      "Say goodbye to long queues and frustrating checkout processes. With us, you can enjoy a smooth and secure checkout experience.",
  },
  {
    id: 3,
    backgroundImage: require("../assets/images/background_1.png"),
    bannerImage: require("../assets/images/onboarding3.gif"),
    title: "Fast and Reliable Delivery",
    description:
      "Get your orders delivered right to your doorstep, on time and in perfect condition. We pride ourselves on fast and reliable delivery.",
  },
];
const screens = {
  main_layout: "MainLayout",
  home: "Home",
  search: "Search",
  cart: "Cart",
  favourite: "Favourite",
  notification: "Notification",
  wallet: "Wallet",
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.search,
  },
  {
    id: 2,
    label: screens.cart,
  },
  {
    id: 3,
    label: screens.favourite,
  },
  {
    id: 4,
    label: screens.notification,
  },
];

const delivery_time = [
  {
    id: 1,
    label: "10 Mins",
  },
  {
    id: 2,
    label: "20 Mins",
  },
  {
    id: 3,
    label: "30 Mins",
  },
  {
    id: 4,
    label: "45 Mins",
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: "Burger",
  },
  {
    id: 2,
    label: "Fast Food",
  },
  {
    id: 3,
    label: "Pizza",
  },
  {
    id: 4,
    label: "Asian",
  },
  {
    id: 5,
    label: "Dessert",
  },
  {
    id: 6,
    label: "Breakfast",
  },
  {
    id: 7,
    label: "Vegetable",
  },
  {
    id: 8,
    label: "Taccos",
  },
];

const track_order_status = [
  {
    id: 1,
    title: "Order Confirmed",
    sub_title: "Your order has been received",
  },
  {
    id: 2,
    title: "Order Prepared",
    sub_title: "Your order has been prepared",
  },
  {
    id: 3,
    title: "Delivery in Progress",
    sub_title: "Hang on! Your food is on the way",
  },
  {
    id: 4,
    title: "Delivered",
    sub_title: "Enjoy your meal!",
  },
  {
    id: 5,
    title: "Rate Us",
    sub_title: "Help us improve our service",
  },
];

const GOOGLE_MAP_API_KEY = "";
export default {
  onboarding_screens,
  screens,
  bottom_tabs,
  delivery_time,
  ratings,
  tags,
  track_order_status,
  GOOGLE_MAP_API_KEY,
};

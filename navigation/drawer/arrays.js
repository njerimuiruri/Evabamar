import {icons} from '../../constants';
import {Home, NewPassword} from '../../screens';
import BottomTabs from '../../navigation/Tabs';

export const ScreensArray = [
  {
    route: 'Dashboard',
    label: 'Homel',
    type: icons.call,
    icon: icons.home2,
    component: BottomTabs,
    notification: 0,
  },

  {
    route: 'Wallet',
    icon: icons.wallet,
    component: NewPassword,
    notification: 9,
  },
  {
    route: 'Notifications',
    icon: icons.notification,
    component: NewPassword,
    notification: 9,
  },
  {
    route: 'Favourite',
    label: 'My Calendar',
    type: icons.call,
    icon: icons.favourite,
    component: Home,
    notification: 4,
  },
  {
    route: 'Orders',
    label: 'myorders',
    icon: icons.shipping3,
    component: NewPassword,
    type: icons.call,
  },
  {
    route: 'Coupons',
    label: 'Coupons',
    type: icons.call,
    icon: icons.refund,
    component: Home,
    notification: 0,
  },
  {
    route: 'Settings',
    label: 'Settings',
    type: icons.call,
    icon: icons.setting2,
    component: Home,
    notification: 2,
  },
  {
    route: 'Track Your Order',
    label: 'Settings',
    type: icons.call,
    icon: icons.location1,
    component: Home,
    notification: 0,
  },
  {
    route: 'Invite Friend',
    label: 'invite',
    type: icons.call,

    icon: icons.invite,
    component: Home,
    notification: 0,
  },
  {
    route: 'About Us',
    label: 'about',
    type: icons.officialuser,
    icon: icons.SwiftMartlogo1,
    component: Home,
    notification: 0,
  },
  {
    route: 'Help Center',
    label: 'Settings',
    type: icons.user,
    icon: icons.customerservice,
    component: Home,
    notification: 0,
  },
  {
    route: 'Logout',
    label: 'Logout',
    type: icons.user,
    icon: icons.logout,
    component: Home,
    notification: 0,
  },
];

export const ProjectsArray = [
  {
    title: 'Personal',
    icon: 'profile',
    color: 'red',
    iconType: icons.call,
  },
  {
    title: 'travel',
    icon: 'profile',
    color: 'red',
    iconType: icons.call,
  },
  {
    title: 'Business',
    icon: 'profile',
    color: 'red',
    iconType: icons.call,
  },
  {title: 'Add', icon: 'plus', color: 'red', iconType: icons.call},
];

export const ProfileMenu = [
  {label: 'History', icon: 'history', iconType: icons.call},
  {label: 'Rate', icon: 'star', iconType: icons.call},
  {label: 'Share', icon: 'share', iconType: icons.call},
  {label: 'Logout', icon: 'logout', iconType: icons.call},
];

// child: [
//   {
//     key: 'landing_page',
//     name: 'Landing Page',
//     title: true,
//     icon: 'business',
//     badge: 'Hot',
//     linkParent: '',
//     link: '/register'
//   },
// ]
module.exports = [
  {
    key: 'home',
    name: 'Home',
    icon: 'home',
    linkParent: '/app/home'
  },
  {
    key: 'account',
    name: 'Account',
    icon: 'person',
    child: [
      {
        key: 'profile',
        name: 'Profile',
        link: '/app/profile'
      },
      {
        key: 'organizations',
        name: 'Organizations',
        link: '/app/organizations'
      },
      {
        key: 'billing',
        name: 'Billing',
        link: '/app/billing'
      },
      {
        key: 'access_keys',
        name: 'Access Keys',
        link: '/app/access_keys'
      }
    ]
  },
  {
    key: 'users',
    name: 'User Control',
    icon: 'people',
    child: [
      {
        key: 'users',
        name: 'Users',
        link: '/app/users'
      },
      {
        key: 'roles',
        name: 'Roles',
        link: '/app/roles'
      }
    ]
  },
  {
    key: 'inventory',
    name: 'Inventory',
    icon: 'inventory',
    child: [
      {
        key: 'devices',
        name: 'Devices',
        link: '/app/devices'
      },
      {
        key: 'tunnels',
        name: 'Tunnels',
        link: '/app/tunnels'
      },
      {
        key: 'app_ids',
        name: 'App Ids',
        link: '/app/app_ids'
      },
    ]
  },
  {
    key: 'dashboard',
    name: 'Dashboards',
    icon: 'dashboard',
    child: [
      {
        key: 'network',
        name: 'Network',
        link: '/app/network'
      },
      {
        key: 'traffic',
        name: 'Traffic',
        link: '/app/traffic'
      },
    ]
  },
];

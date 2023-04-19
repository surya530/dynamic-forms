import { Icon } from '@iconify/react';

// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;



const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  // {
  //   title: 'surya',
  //   path: '/dashboard/surya',
  //   icon: icon('ic_disabled'),
  // },
  {
    title : 'forms',
    path: '/dashboard/form',
    // icon: icon('ic_blog'),
    icon : <Icon
            fontSize={25}
            color='black'
            icon="healthicons:health-worker-form"/>
  },
  {
    title : 'fields',
    path: '/dashboard/fields',
//     icon: icon('ic_blog'),
    icon :  <Icon
            fontSize={25}
            color='black'
            icon="fluent-mdl2:field-changed"/>

  },
  {
    title : 'records',
    path: '/dashboard/records',
//    icon: icon('ic_blog'),
    icon : <Icon
            fontSize={25}
            color='black'
            icon="vaadin:records"/>
}
];

export default navConfig;

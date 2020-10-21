import React from 'react';

const Home = React.lazy(() => import('../Views/moderatorViews/Home/Home'));
const Stores = React.lazy(() => import('../Views/moderatorViews/Stores/Stores'));
const AddProduct = React.lazy(() => import('../Views/productViews/AddProduct/AddProduct'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'Home', component: Home },
  { path: '/admin/stores', exact: true, name: 'Stores', component: Stores },
  { path: '/admin/add-prod', exact: true, name: 'Add Product', component: AddProduct },
//   { path: '/student/marks', exact: true, name: 'Marks', component: Marks },
//   { path: '/student/timetable', exact: true, name: 'Timetable', component: Timetable },
//   { path: '/student/profile', exact: true, name: 'My profile', component: MyProfile },
//  // { path: '/student/homework/:subject/:date?', exact: true, name: 'Homework', component: Homework },
//   { path: '/student/homework', exact: true, name: 'Homework', component: Homework },
//   { path: '/student/news', exact: true, name: 'News', component: News },
//   { path: '/student/404', exact: true, name: '404', component: Error },
];

export default routes;
/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import AdminCreate from "views/AdminCreate"
import AdminUserCreating from "views/adminUserCreating/resumeList"
import CreateResume from "views/adminUserCreating/index"
import ManageUser from "views/ManageUser/index"
import AdminUserResume from "views/ShowResume.js/showResume"
import adminProfile from "views/AdminProfile/index"
import EditResume from "views/EditResume/index"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/resumelist",
    name: "Manage Resume",
    icon: "nc-icon nc-circle-09",
    component: AdminUserCreating,
    layout: "/admin"
  },
  {
    path: "/manageuser",
    name: "Manage User",
    icon: "nc-icon nc-circle-09",
    component: ManageUser,
    layout: "/admin"
  },
  {
    path: "/adminprofile",
    component: adminProfile,
    layout: "/admin"
  },
  {
    path: "/createresume",
    component: CreateResume,
    layout: "/admin"
  },
  {
    path: "/showeresume/:id",
    component: AdminUserResume,
    layout: "/admin"
  },
  {
    path: "/editresume/:id",
    component: EditResume,
    layout: "/admin"
  },
  // {
  //   path: "/manageuse",
  //   name: "Manage User",
  //   icon: "nc-icon nc-circle-09",
  //   component: AdminCreate,
  //   layout: "/admin"
  // },x
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;

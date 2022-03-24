import {AdminList, BlockedUsers, Error404, Follows, Home, Report, Reports, Toot, User, Users} from "../pages";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: "/follows",
        exact: true,
        page: Follows,
    },
    {
        path: "/blocked",
        exact: true,
        page: BlockedUsers,
    },
    {
        path: "/toot/:id",
        exact: true,
        page: Toot,
    },
    {
        path: "/users",
        exact: true,
        page: Users,
    },
    {
        path: "/admin/reports",
        exact: true,
        page: Reports,
    },
    {
        path: "/admin/reports/:id",
        exact: true,
        page: Report,
    },
    {
        path: "/admin/list",
        exact: true,
        page: AdminList,
    },
    {
        path: "/:id",
        exact: true,
        page: User,
    },
    {
        path: "/",
        exact: true,
        page: Home,
    },

    {
        path: "*",
        page: Error404
    }
];
import { Activity, Banknote, BarChart, Boxes, Cable, ChartColumnBig, ChartPie, Cog, CreditCard, Folder, Gamepad, Grid2X2, Info, Key, PawPrint, Play, Settings, ShoppingBag, Trophy, Users, Wallet, Wrench } from "lucide-react";


export const user = [
    {name: 'Dashboard', icon: <Grid2X2 size={15}/>, 
    path:'/user/dashboard', subpath:[]},

    {name: 'Sponsor', icon: <Cable size={15}/>, 
    path:'/user/sponsor', subpath:[]},

    {name: 'Withdraw', icon: <CreditCard size={15}/>, 
    path:'/user/withdraw', subpath:[]},

    {name: 'Store', icon: <ShoppingBag size={15}/>, 
    path:'/user/store', subpath:[]},

    {name: 'Inventory', icon: <Boxes size={15}/>, 
    path:'/user/mypets', subpath:[]},

    {name: 'Faq', icon: <Info size={15}/>, 
    path:'/user/faq', subpath:[]},
    {name: 'Video', icon: <Play size={15}/>, 
    path:'/user/video', subpath:[]},

    {name: 'Account', icon: <Settings size={15}/>, 
    path:'/user/account', subpath:[]},
    
]

export const superadmin = [
    {name: 'Analytics', icon: <ChartPie size={15}/>, 
    path:'/superadmin/analytics', subpath:[]},
    {name: 'Manage Account', icon: <Users size={15}/>, 
    path:'/superadmin/manageaccount', subpath:[]},
    {name: 'Payin', icon: <Wallet size={15}/>, 
    path:'/superadmin/payin', subpath:[]},

    {name: 'Payout', icon: <Wallet size={15}/>, 
    path:'/superadmin/payout', subpath:[]},
    {name: 'Complan', icon: <Folder size={15}/>, 
    path:'/superadmin/complan', subpath:[]},
    // {name: 'Game', icon: <Gamepad size={15}/>, 
    // path:'/superadmin/game', subpath:[]},
    {name: 'Sales', icon: <Banknote size={15}/>, 
    path:'/superadmin/sales', subpath:[]},
    {name: 'Top Commission', icon: <Users size={15}/>, 
    path:'/superadmin/topcommission', subpath:[]},
    {name: 'Event', icon: <Trophy size={15}/>, 
    path:'/superadmin/event', subpath:[]},
    
    {name: 'Maintenance', icon: <Wrench size={15}/>, 
    path:'/superadmin/maintenance', subpath:[]},
    {name: 'Master Key', icon: <Key size={15}/>, 
    path:'/superadmin/masterkey', subpath:[]},
    {name: 'Settings', icon: <Settings size={15}/>, 
    path:'/superadmin/settings', subpath:[]},
]

export const admin = [
    {name: 'Analytics', icon: <ChartPie size={15}/>, 
    path:'/admin/analytics', subpath:[]},
    {name: 'Manage Account', icon: <Users size={15}/>, 
    path:'/admin/manageaccount', subpath:[]},

    {name: 'Payout', icon: <Wallet size={15}/>, 
    path:'/admin/payout', subpath:[]},
    {name: 'Settings', icon: <Settings size={15}/>, 
    path:'/admin/settings', subpath:[]},
]


import { Activity, BarChart, Cable, ChartColumnBig, Cog, CreditCard, Grid2X2, PawPrint, Settings, ShoppingBag, Wallet } from "lucide-react";


export const user = [
    {name: 'Dashboard', icon: <Grid2X2 size={15}/>, 
    path:'/user/dashboard', subpath:[]},

    {name: 'Invites', icon: <Cable size={15}/>, 
    path:'/user/invites', subpath:[]},

    {name: 'Withdraw', icon: <CreditCard size={15}/>, 
    path:'/user/withdraw', subpath:[]},

    {name: 'Store', icon: <ShoppingBag size={15}/>, 
    path:'/user/store', subpath:[]},

    {name: 'My Pets', icon: <PawPrint size={15}/>, 
    path:'/user/mypets', subpath:[]},

    {name: 'Account', icon: <Settings size={15}/>, 
    path:'/user/account', subpath:[]},
    
]

export const superadmin = [
    {name: 'Analytics', icon: <Wallet size={15}/>, 
    path:'/superadmin/analytics', subpath:[]},
    {name: 'Payin', icon: <Wallet size={15}/>, 
    path:'/superadmin/payin', subpath:[]},

    
    
]


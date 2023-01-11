import React from 'react'
import { HashRouter, Routes, Route, Navigate, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
const Index = React.lazy(() => import('./pages/index/Index'))
const InforManage = React.lazy(() => import('./pages/index/InforManage'))
const CouponManage = React.lazy(() => import('./pages/index/couponManage/CouponManage'))
const GoodEstimateManage = React.lazy(() => import('./pages/index/estimateManage/GoodEstimateManage'))
const ServeEstimateManage = React.lazy(() => import('./pages/index/estimateManage/ServeEstimateManage'))
const Charging = React.lazy(() => import('./pages/index/estimateManage/Charging'))
const GoodManage = React.lazy(() => import('./pages/index/goodsManage/GoodManage'))
const GoodTypeManage = React.lazy(() => import('./pages/index/goodsManage/GoodTypeManage'))
const AdvertiseManage = React.lazy(() => import('./pages/index/marketManage/AdvertiseManage'))
const GoodRecommend = React.lazy(() => import('./pages/index/marketManage/GoodRecommend'))
const ChargingOrder = React.lazy(() => import('./pages/index/orderManage/ChargingOrder'))
const DataCalculate = React.lazy(() => import('./pages/index/orderManage/DataCalculate'))
const GoodOrder = React.lazy(() => import('./pages/index/orderManage/GoodOrder'))
const ServeOrder = React.lazy(() => import('./pages/index/orderManage/ServeOrder'))
const ServeOrderData = React.lazy(() => import('./pages/index/orderManage/ServeOrderData'))
const CommissionManage = React.lazy(() => import('./pages/index/serveItem/CommissionManage'))
const Data = React.lazy(() => import('./pages/index/serveItem/Data'))
const MerchantItem = React.lazy(() => import('./pages/index/serveItem/MerchantItem'))
const TypeManage = React.lazy(() => import('./pages/index/serveItem/TypeManage'))
const ComplaintManage = React.lazy(() => import('./pages/index/shopManage/ComplaintManage'))
const OutletManage = React.lazy(() => import('./pages/index/shopManage/OutletManage'))
const PowerCheck = React.lazy(() => import('./pages/index/shopManage/PowerCheck'))
const ShopCheck = React.lazy(() => import('./pages/index/shopManage/ShopCheck'))
const Dict = React.lazy(() => import('./pages/index/systemManage/Dict'))
const Menu = React.lazy(() => import('./pages/index/systemManage/Menu'))
const Role = React.lazy(() => import('./pages/index/systemManage/Role'))
const User = React.lazy(() => import('./pages/index/systemManage/User'))
const Log = React.lazy(() => import('./pages/index/systemMonitor/Log'))
const Online = React.lazy(() => import('./pages/index/systemMonitor/Online'))
const Redis = React.lazy(() => import('./pages/index/systemMonitor/Redis'))
const Request = React.lazy(() => import('./pages/index/systemMonitor/Request'))
const Jvm = React.lazy(() => import('./pages/index/systemMonitor/sysInfor/Jvm'))
const Serve = React.lazy(() => import('./pages/index/systemMonitor/sysInfor/Serve'))
const Tomcat = React.lazy(() => import('./pages/index/systemMonitor/sysInfor/Tomcat'))
const DispatchLog = React.lazy(() => import('./pages/index/task/DispatchLog'))
const TaskTime = React.lazy(() => import('./pages/index/task/TaskTime'))
const UserCenter = React.lazy(() => import('./pages/UserCenter'))

function App() {

  return (
    <React.Suspense fallback={<div>加载中......</div>}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/home' element={<Home></Home>}>
            <Route path='index' element={<Index></Index>}></Route>
            <Route index element={<Index></Index>}></Route>
            <Route path='inforManage' element={<InforManage></InforManage>}></Route>
            <Route path='couponManage' element={<CouponManage></CouponManage>}></Route>
            <Route path='goodEstimateManage' element={<GoodEstimateManage></GoodEstimateManage>}></Route>
            <Route path='serveEstimateManage' element={<ServeEstimateManage></ServeEstimateManage>}></Route>
            <Route path='charging' element={<Charging></Charging>}></Route>
            <Route path='goodManage' element={<GoodManage></GoodManage>}></Route>
            <Route path='goodTypeManage' element={<GoodTypeManage></GoodTypeManage>}></Route>
            <Route path='advertiseManage' element={<AdvertiseManage></AdvertiseManage>}></Route>
            <Route path='goodRecommend' element={<GoodRecommend></GoodRecommend>}></Route>
            <Route path='chargingOrder' element={<ChargingOrder></ChargingOrder>}></Route>
            <Route path='dataCalculate' element={<DataCalculate></DataCalculate>}></Route>
            <Route path='goodOrder' element={<GoodOrder></GoodOrder>}></Route>
            <Route path='serveOrder' element={<ServeOrder></ServeOrder>}></Route>
            <Route path='serveOrderData' element={<ServeOrderData></ServeOrderData>}></Route>
            <Route path='commissionManage' element={<CommissionManage></CommissionManage>}></Route>
            <Route path='data' element={<Data></Data>}></Route>
            <Route path='merchantItem' element={<MerchantItem></MerchantItem>}></Route>
            <Route path='typeManage' element={<TypeManage></TypeManage>}></Route>
            <Route path='complaintManage' element={<ComplaintManage></ComplaintManage>}></Route>
            <Route path='outletManage' element={<OutletManage></OutletManage>}></Route>
            <Route path='powerCheck' element={<PowerCheck></PowerCheck>}></Route>
            <Route path='shopCheck' element={<ShopCheck></ShopCheck>}></Route>
            <Route path='dict' element={<Dict></Dict>}></Route>
            <Route path='menu' element={<Menu></Menu>}></Route>
            <Route path='role' element={<Role></Role>}></Route>
            <Route path='user' element={<User></User>}></Route>
            <Route path='log' element={<Log></Log>}></Route>
            <Route path='online' element={<Online></Online>}></Route>
            <Route path='redis' element={<Redis></Redis>}></Route>
            <Route path='request' element={<Request></Request>}></Route>
            <Route path='jvm' element={<Jvm></Jvm>}></Route>
            <Route path='serve' element={<Serve></Serve>}></Route>
            <Route path='tomcat' element={<Tomcat></Tomcat>}></Route>
            <Route path='dispatchLog' element={<DispatchLog></DispatchLog>}></Route>
            <Route path='taskTime' element={<TaskTime></TaskTime>}></Route>
            <Route path='userCenter' element={<UserCenter></UserCenter>}></Route>
          </Route>
          <Route path='*' element={<NotFound></NotFound>} ></Route>
        </Routes>
      </HashRouter>
    </React.Suspense>
  )
}

export default App

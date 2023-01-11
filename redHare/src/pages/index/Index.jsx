import React, { useEffect } from 'react'
import '../../style/css/homeIndex.css';
import * as echarts from 'echarts';
import { getChart } from '../../apis/ums';

export default function Index() {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = JSON.parse(localStorage.getItem('roles'));
  useEffect(() => {
    getChart().then(res => {
      var myChart = echarts.init(document.getElementById('main'));
      var app = {};
      const xData = beforeSevenDay();
      let yData = [];
      let yDataUser = [];
      console.log(res);
      yData.push(res.data.lastSevenVisitCount)
      yDataUser.push(res.data.lastSevenUserVisitCount)
      yData = yData[0].map(item => {
        return item.count
      })
      yDataUser = yDataUser[0].map(item => {
        return item.count
      })
      for (let i = 0; i < 7; i++) {
        if (yData.length < 7) {
          yData.unshift(0)
        } else {
          break;
        }
      }
      for (let i = 0; i < 7; i++) {
        if (yDataUser.length < 7) {
          yDataUser.unshift(0)
        } else {
          break;
        }
      }
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '您', '总数'],
            ['1', 43.3, 85.8,],
            ['2', 83.1, 73.4,],
            ['3', 86.4, 65.2,],
            ['4', 72.4, 53.9,]
          ]
        },
        xAxis: { data: xData },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {name:'总访问量',type:"bar",data:yData},
          {name:'您的访问量',type:"bar",data:yDataUser}
        ]
      };

      option && myChart.setOption(option);
    })
  }, [])
  function beforeSevenDay() {
    const a = Date.now();//现在的时间戳
    const b = 24 * 60 * 60 * 1000;//一天的毫秒数
    const sevenDay = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(a - b * i);
      sevenDay.unshift(`${d.getMonth() + 1}-${d.getDate()}`);
    }
    return sevenDay;
  }
  return (
    <div>
      <div className='firstBox'>
        <img src={"http://xawn.f3322.net:8002/distremote/static/avatar/" + user.avatar} alt="" style={{ width: '80px', height: '80px', borderRadius: '3px', marginLeft: '24px' }} />
        <div style={{ marginLeft: '16px' }}>
          <div style={{ fontSize: '1.05rem', color: '#666' }}>上午好，{user.username}，周末要不要去看电影？</div>
          <div style={{ color: '#aaa', marginTop: '10px' }}>{user.deptName} | {roles[0]}</div>
          <div style={{ color: '#aaa', marginTop: '10px' }}>上次登录时间：{user.lastLoginTime}</div>
        </div>
        <table style={{ width: '250px', marginLeft: '300px' }}>
          <tbody>
            <tr style={{ color: '#aaa', fontSize: '1rem' }}>
              <td>今日IP</td>
              <td>今日访问</td>
              <td>总访问量</td>
            </tr>
            <tr style={{ color: '#1890ff', fontSize: '16px' }}>
              <td style={{ fontWeight: 'bold' }}>0</td>
              <td style={{ fontWeight: 'bold' }}>0</td>
              <td style={{ fontWeight: 'bold' }}>2576</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{display:'flex'}}>
        <div id='main' style={{ width: '500px', height: '400px' ,border:'1px solid #f1f1f1',marginTop:'10px'}}></div>
        <table className='secondBox'>
          <tbody>
            <tr>
              <td colSpan={2} style={{padding:'20px',height:'55px',boxSizing:'border-box'}}>
                <label style={{float:'left'}}>进行中的项目</label>
                <a target='_blank' href="https://gitee.com/xy88888888/five-car.git" style={{float:'right'}}>所有项目</a>
              </td>
            </tr>
            <tr>
              <td style={{padding:'9px'}}>
                <div className='circle'>F</div>
                <div style={{marginLeft:'10px',float:'left'}}>
                  <p style={{fontSize: '.9rem',fontWeight:'600'}}>RedRabbit-Shiro</p>
                  <p style={{color:'rgba(0,0,0,.45)',fontWeight:'200',fontSize:'.8rem',width:'175px'}}>Spring Boot 2.0.4 & Shiro1.4.0 权限管理系统。</p>
                </div>
              </td>
              <td style={{padding:'9px'}}>
                <div className='circle'>F</div>
                <div style={{marginLeft:'10px',float:'left'}}>
                  <p style={{fontSize: '.9rem',fontWeight:'600'}}>RedRabbit-Security</p>
                  <p style={{color:'rgba(0,0,0,.45)',fontWeight:'200',fontSize:'.8rem',width:'175px'}}>Spring Boot 2.0.4 & Spring Security 5.0.7 权限管理系统。</p>
                </div>
              </td>
            </tr>
            <tr>
            <td style={{padding:'9px'}}>
                <div className='circle'>S</div>
                <div style={{marginLeft:'10px',float:'left'}}>
                  <p style={{fontSize: '.9rem',fontWeight:'600'}}>SpringAll</p>
                  <p style={{color:'rgba(0,0,0,.45)',fontWeight:'200',fontSize:'.8rem',width:'175px'}}>循序渐进学习Spring Boot、Spring Cloud与Spring Security。</p>
                </div>
              </td>
              <td style={{padding:'9px'}}>
                <div className='circle'>F</div>
                <div style={{marginLeft:'10px',float:'left'}}>
                  <p style={{fontSize: '.9rem',fontWeight:'600'}}>RedRabbit-Shiro-Vue</p>
                  <p style={{color:'rgba(0,0,0,.45)',fontWeight:'200',fontSize:'.8rem',width:'175px'}}>RedRabbit-Shiro前后端分离版本，前端架构采用Vue全家桶。</p>
                </div>
              </td>
            </tr>
            <tr>
            <td style={{padding:'9px'}}>
                <div className='circle'>F</div>
                <div style={{marginLeft:'10px',float:'left'}}>
                  <p style={{fontSize: '.9rem',fontWeight:'600'}}>RedRabbit-Actuator</p>
                  <p style={{color:'rgba(0,0,0,.45)',fontWeight:'200',fontSize:'.8rem',width:'175px'}}>使用Spring Boot Admin 2.0.2构建，用于监控RedRabbit。</p>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

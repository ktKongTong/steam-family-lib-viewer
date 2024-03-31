import ReactECharts from "echarts-for-react";
import React from "react";

export function Piegraph({
  countById,
  style
}:{
  countById:any
style: {height: number, width: number}

}){

  const option = {
    title: {
      text: '库存数量',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: countById.map((it:any)=>it.name)
    },
    series: [
      {
        type: 'pie',
        radius: [20, 140],
        // center: ['25%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        // emphasis: {
        //   label: {
        //     show: true
        //   }
        // },
        data: countById
      }]
  };



  return (
  <ReactECharts
    option={option}
    style={style}
  />
)
}
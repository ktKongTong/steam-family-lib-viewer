import ReactECharts from "echarts-for-react";
import React, {useEffect, useMemo, useState} from "react";
import {axisStyle, defaultTextStyle, selectableColor} from "@/app/(chart)/playtimeGraph";

export function Piegraph({
  countData,
  countById,
  style
}:{
  countData: any,
  countById:any
style: {height: number, width: number}

}){
  const cntData = useMemo(()=> {
    return countData.map((it:any)=> {
      return [it.name, it.cnt]
    })
  },[countData])
  const option = useMemo(()=> ({
    darkMode: true,
    color: selectableColor,
    title: {
      text: '库存数量',
      left: 'center',
      textStyle: {
        color: '#ffffff'
      }
    },

    legend: {
      left: 'center',
      top:'bottom',
      textStyle: defaultTextStyle,
    },
    grid: { left: '55%' },
    xAxis: {
      // gridIndex: 0,
      ...axisStyle,

    },
    yAxis: {
      type: 'category',
      show:false,
      ...axisStyle
    },
    dataset: {
      source: [
        ['name', 'count'],
        ...cntData
      ]
    },
    series: [
      {
        type: 'pie',
        id: 'pie',
        radius: '40%',
        center: ['30%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 10
        },
        label: {
          formatter: '{b}({d}%)',
          textStyle: {
            color:'#ffffff'
          }
        },
        encode: {
          itemName: 'name',
          value: 'count',
        }
      },

      ...cntData.map((it:any)=> ({
        type: 'bar',
        seriesLayoutBy: 'row',
        itemStyle: {
          borderRadius: [0,50,50,0]
        },
        height: '4px',
        label: {
          textStyle: {
            color:'#ffffff'
          },
          show: true,
          position: 'right'
        },
      })),
    ]
  }),[cntData])

  // useEffect(() => {
  //   setOption({
  //     darkMode: true,
  //     color: selectableColor,
  //     title: {
  //       text: '库存数量',
  //       left: 'center',
  //       textStyle: {
  //         color: '#ffffff'
  //       }
  //     },
  //
  //     legend: {
  //       left: 'center',
  //       top:'bottom',
  //       textStyle: defaultTextStyle,
  //     },
  //     grid: { left: '55%' },
  //     xAxis: {
  //       // gridIndex: 0,
  //       ...axisStyle,
  //
  //     },
  //     yAxis: {
  //       show:false,
  //       type: 'category',
  //       ...axisStyle
  //     },
  //     dataset: {
  //       source: [
  //         ['name', 'count'],
  //         ...cntData
  //       ]
  //     },
  //     series: [
  //       {
  //         type: 'pie',
  //         id: 'pie',
  //         radius: '40%',
  //         center: ['30%', '50%'],
  //         roseType: 'radius',
  //         itemStyle: {
  //           borderRadius: 10
  //         },
  //         label: {
  //           formatter: '{b}({d}%)',
  //           textStyle: {
  //             color:'#ffffff'
  //           }
  //         },
  //         encode: {
  //           itemName: 'name',
  //           value: 'count',
  //         }
  //       },
  //
  //       ...cntData.map((it:any)=> ({
  //         type: 'bar',
  //         seriesLayoutBy: 'row',
  //         itemStyle: {
  //           borderRadius: [0,50,50,0]
  //         },
  //         height: '4px',
  //         label: {
  //           textStyle: {
  //             color:'#ffffff'
  //           },
  //           show: true,
  //           position: 'right'
  //         },
  //       })),
  //     ]
  //   })
  // }, [cntData]);

  return (
  <ReactECharts
    option={option}
    notMerge={true}
    style={style}
  />
)
}
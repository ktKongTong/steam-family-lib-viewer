import ReactECharts from "echarts-for-react";
import React from "react";
import {Player} from "@/app/page";

export const axisStyle = {
  axisLine: {
    lineStyle: {
      color: "#ffffff"
    }
  },
  axisLabel: {
    color: "#ffffff"
  },
  splitLine: {
    lineStyle: {
      color: 'rgb(0,0,0,0.3)'
    }
  },
}
export const selectableColor =  [
  'rgb(196, 71, 95,0.7)', 'rgb(53, 162, 235,0.7)',
  'rgb(245, 193, 87,0.7)', 'rgb(227, 92, 94,0.7)',
  'rgb(66, 151, 104,0.7)', 'rgb(243, 121, 78,0.7)',
  'rgb(242, 180, 158,0.7)']
export const defaultTextStyle = {
  color: '#ffffff'
}
const secondsToHours = (sec:number) => {
  return sec/3600
}

export function PlaytimeGraph({
  playtime,
  players,
 style
}:{
  playtime: {
    steamid: string,
    asOwnerLendTime: number,
    asPlayerTime: number
  }[],
  players: Player[]
  style: {height: number, width: number}
}){
  console.log("playtime")

  console.log(playtime)
  const option = {
    darkMode: true,
    axisTick: {
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      lineStyle: {
        color: '#ffffff'
      }
    },
    color: selectableColor,
    title: {
      text: '谁是义父，谁是义子？',
      left: 'center',
      textStyle: defaultTextStyle
    },
    tooltip: {
      trigger: 'item',
      textStyle:defaultTextStyle,

      formatter: (param:any)=> {
        return param.name+` ${param.seriesName} ` + Math.abs(param.value).toFixed(1) + 'h'
      }
    },
    legend: {
      left: 'center',
      top:'bottom',
      textStyle: defaultTextStyle,
      data: ["被嫖时长","白嫖时长"],
    },
    xAxis: [
      {
        type: 'value',
        nameTextStyle: defaultTextStyle,
        axisLine: {
          lineStyle: {
            color: "#ffffff"
          }
        },
        axisLabel: {
          color: "#ffffff"
        },
        splitLine: {
          lineStyle: {
            color: 'rgb(0,0,0,0.3)'
          }
        },
      }
    ],
    yAxis: [
      {

        nameTextStyle: defaultTextStyle,
        axisLine: {
          lineStyle: {
            color: "#ffffff"
          }
        },
        axisLabel: {
          color: "#ffffff"
        },
        splitLine: {
          lineStyle: {
            color: '#000000'
          }
        },
        offset: 30,
        nameGap: 0,
        type: 'category',
        data: playtime.map(item=>item.steamid).map(id=> players.find(it=>it.steamid?.toString()==id)?.personaName ?? "前成员")
      }
    ],
    series: [
      {
        roundCap: true,
        name: "被嫖时长",
        type: 'bar',
        stack: 'Total',
        opacity: 0.5,
        height: 3,
        label: {
          formatter: (param:any)=> {return param.value.toFixed(1) + "h"},
          show: true,
          textStyle: defaultTextStyle,
          position: 'right',
        },
        itemStyle: {
          borderRadius: [0,100,100,0]
        },
        emphasis: {
          focus: 'series'
        },
        data: playtime.map(item=>secondsToHours(item.asOwnerLendTime))
      },
      {
        name: "白嫖时长",
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          formatter: (param:any)=> {return Math.abs(param.value).toFixed(1) + "h"},
          textStyle: defaultTextStyle,
          position: 'left',
        },

        itemStyle: {
          borderRadius: [100,0,0,100]
        },
        emphasis: {
          focus: 'series'
        },
        data: playtime.map(item=> - secondsToHours(item.asPlayerTime))
      }
    ]
  };



  return (
    <ReactECharts
      option={option}
      style={style}
    />
)
}
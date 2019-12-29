import React from 'react'
import {View} from 'react-native'
import {Svg, Rect, G} from 'react-native-svg'
import AbstractChart from './abstract-chart'


const barWidth = 32

class BarChart extends AbstractChart {
  renderBars = config => {
    const {data, width, height, paddingTop, paddingRight, barColor} = config
    const baseHeight = this.calcBaseHeight(data, height)
    console.log('Bar Color' +barColor)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height)
      const barWidth = 6
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={
            ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
            paddingTop
          }
          // y={0}
          rx={4}
          ry={4}
          width={barWidth}
          height={(Math.abs(barHeight) / 4) * 3}
          fill={barColor}                                                                            //change Color of bars
        />
      )
    })
  }

  renderBarTops = config => {
    const {data, width, height, paddingTop, paddingRight} = config
    const baseHeight = this.calcBaseHeight(data, height)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height)
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />
      )
    })
  }

  render() {
    const paddingTop = 16
    const paddingRight = 64
    const { 
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      barColor,
      noOfDays,
    } = this.props
    const {borderRadius = 0} = style
    const config = {
      width,
      height
    }
    return (
      <View style = { { flexDirection:'row-reverse', }}>
      <View style = {{height : height, width : 40, marginRight :20}}>
      <View style={style}>
      <Svg height={height} width={width}>
      <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
              ...config,
              count: 4,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })
            : null}
          </G>
          </Svg>
          </View>
          </View>
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {this.renderHorizontalLines({
              ...config,
              count: 4,
              paddingTop
            })}
          </G>
          <G>
            {this.renderVerticalLines({
              ...config,
             // count: 4,
              paddingTop,
              data: data.datasets[0].data,
              paddingRight,
              count : noOfDays
            })}
          </G>
          
          {/* <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
              ...config,
              count: 4,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })
            : null}
          </G> */}
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
              ...config,
              labels: data.labels,
              paddingRight,
              paddingTop,
              horizontalOffset: barWidth
            })
            : null}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight,
              barColor ,
            })}
          </G>
          {/* <G>
            {this.renderBarTops({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G> */}
        </Svg>
      </View>
      </View>
    )
  }
}

export default BarChart
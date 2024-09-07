import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export type ChartSeries = {
  categories: string[];
  ySeries: number[];
};

interface BaseChartProps {
  series: ChartSeries;
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  yUnits: string;
  dataLabelDecimals: number;
  type?: string;
  hideLegend?: boolean;
}

const BaseChart: React.FC<BaseChartProps> = ({
  series,
  title,
  xAxisTitle,
  yAxisTitle,
  yUnits,
  dataLabelDecimals,
  type = 'line',
  hideLegend = false,
}) => {
  const { categories, ySeries } = series;

  const chartOptions: Highcharts.Options = {
    chart: {
      type,
    },
    title: {
      text: title,
    },
    xAxis: {
      categories,
      title: {
        text: xAxisTitle,
      },
    },
    yAxis: {
      title: {
        text: `${yAxisTitle} (${yUnits})`,
      },
    },
    series: [
      {
        data: ySeries,
        type: 'line',
        dataLabels: {
          enabled: true,
          format: `{point.y:.${dataLabelDecimals}f}`,
        },
      },
    ],
    legend: {
      enabled: !hideLegend,
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b>: ${this.y?.toFixed(4)} ${yUnits}`;
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BaseChart;

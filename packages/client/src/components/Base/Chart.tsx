import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export type ChartSeries = {
  categories: string[];
  ySeries: number[];
};

interface ChartProps {
  series: ChartSeries;
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  yUnits: string;
  dataLabelDecimals: number;
  type?: string;
  hideLegend?: boolean;
}

const Chart: React.FC<ChartProps> = ({
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

  const chartBaseColor = '#000000';
  const chartBaseLineWidth = 1;

  const chartOptions: Highcharts.Options = {
    chart: {
      type,
      backgroundColor: 'rgb(226 232 240)', // = tailwind .bg-slate-200
    },
    title: {
      text: title,
    },
    xAxis: {
      categories,
      title: {
        text: xAxisTitle,
      },
      lineColor: chartBaseColor,
      lineWidth: chartBaseLineWidth,
    },
    yAxis: {
      title: {
        text: `${yAxisTitle} (${yUnits})`,
      },
      lineColor: chartBaseColor,
      lineWidth: chartBaseLineWidth,
      gridLineColor: chartBaseColor,
      gridLineWidth: chartBaseLineWidth / 2,
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

export default Chart;

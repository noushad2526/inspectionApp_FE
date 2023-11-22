import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppStudentCount.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

const chartLabels = ["Total Students", "Academy Enrolled Students", "Online Enrolled Students", "Academy Payment Collected", "Online Payment Collected", "Total Payment Collected"];

export default function AppStudentCount({ title, subheader, chartData, ...other }) {

  const chartOptions = useChart({
    chart: {
      toolbar: {
        show: true,
      }
    },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { vertical: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
      tickPlacement: 'on',
      labels: {
        rotate: -45,
        style: {
          fontSize: '10px', // Adjust as needed
        },
      },
    },
    colors: ['#FFC107'],
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} height={365} />
      </Box>
    </Card>
  );
}
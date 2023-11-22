import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

// @mui
import { Box, Card, CardHeader, TextField, MenuItem } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';

// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

const months = [
  { key: 1, value: 'January' },
  { key: 2, value: 'February' },
  { key: 3, value: 'March' },
  { key: 4, value: 'April' },
  { key: 5, value: 'May' },
  { key: 6, value: 'June' },
  { key: 7, value: 'July' },
  { key: 8, value: 'August' },
  { key: 9, value: 'September' },
  { key: 10, value: 'October' },
  { key: 11, value: 'November' },
  { key: 12, value: 'December' },
];

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  const [classesConducted, setClassesConducted] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null); // State to hold the selected month

  useEffect(() => {
    if (chartData.length > 0) {
      const result = [];
      chartData.forEach(course => {
        const currentTime = new Date();
        const totalDurationMinutes = course.eventDetails.reduce((total, event) => {
          const eventStartTime = new Date(event.startTime);
          if (eventStartTime < currentTime) {
            return total + event.duration;
          }
          return total;
        }, 0);
        const totalDurationHours = totalDurationMinutes / 60;
        result.push({ label: course.courseTitle, value: totalDurationHours });
      });

      setClassesConducted(result);
      setChartLabels(result.map((i) => i.label));
      setChartSeries(result.map((i) => i.value));
    } else {
      setSelectedMonth(null);
      setClassesConducted([]);
      setChartSeries([]);
      setChartLabels([]);
    }
  }, [chartData]);

  const handleMonthChange = (event) => {

    const selectedMonthValue = event.target.value;
    setSelectedMonth(selectedMonthValue);
    console.log(chartData);
    // if(!chartData.length)
    // {
    //   toast.error("Please select academy first")
    // }
    if (!chartData || chartData.length === 0) {
      toast.error("Please select an academy with available data");
      setSelectedMonth(null);
      setChartLabels([]);
      setChartSeries([]);
      return;
    }
  
    setSelectedMonth(selectedMonthValue);
    if (!selectedMonthValue) {
      // If no month selected, show all courses
      setChartLabels(classesConducted.map((i) => i.label));
      setChartSeries(classesConducted.map((i) => i.value));
    } else {
      const filteredCourses = classesConducted.filter((course) => {
        const courseEvents = chartData.find((item) => item.courseTitle === course.label)?.eventDetails;
        if (courseEvents && courseEvents.length > 0) {
          return courseEvents.some((event) => {
            const startTime = new Date(event.startTime);
            return startTime.getMonth() + 1 === selectedMonthValue;
          });
        }
        return false;
      });
      setChartLabels(classesConducted.map((i) => i.label));
      setChartSeries(filteredCourses.map((i) => i.value));
    }
  };

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
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TextField
          fullWidth
          select
          label="Select Month"
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e)}
          sx={{ mb: 2 }}
        >
          <MenuItem value={null}>All Months</MenuItem>
          {months.map((month) => (
            <MenuItem key={month.key} value={month.key}>
              {month.value}
            </MenuItem>
          ))}
        </TextField>
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={270} />
      </Box>
    </Card>
  );
}
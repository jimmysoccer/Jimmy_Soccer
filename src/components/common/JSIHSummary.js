import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  Assessment,
  BarChart,
  NavigateBefore,
  NavigateNext,
  CalendarToday,
  ShowChart,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  getAllJSIHRecords,
  getJSIHByYear,
  getJSIHByMonth,
} from '../../services/js-ih-api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const JSIHSummary = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [loading, setLoading] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [chartView, setChartView] = useState('monthly'); // 'monthly' or 'yearly'
  const [singleChartView, setSingleChartView] = useState(false); // Show only one chart at a time

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    loadYearlyData();
  }, [selectedYear]);

  useEffect(() => {
    loadMonthlyData();
  }, [selectedYear, selectedMonth]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const data = await getAllJSIHRecords();
      const records = data.records || [];
      setAllRecords(records);

      // Extract available years from data
      const years = [
        ...new Set(
          records.map((record) => new Date(record.date).getFullYear())
        ),
      ];
      years.sort((a, b) => a - b); // Sort ascending (oldest first)
      setAvailableYears(years);

      // Set selected year to most recent year with data, or current year
      if (years.length > 0) {
        setSelectedYear(years[years.length - 1]); // Most recent year (last in ascending order)
      }
    } catch (error) {
      console.error('Error loading all data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadYearlyData = async () => {
    try {
      const data = await getJSIHByYear(selectedYear);
      setYearlyData(data.records || []);
    } catch (error) {
      console.error('Error loading yearly data:', error);
    }
  };

  const loadMonthlyData = async () => {
    try {
      const data = await getJSIHByMonth(selectedYear, selectedMonth);
      setMonthlyData(data.records || []);
    } catch (error) {
      console.error('Error loading monthly data:', error);
    }
  };

  const navigateYear = (direction) => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (currentIndex !== -1) {
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < availableYears.length) {
        setSelectedYear(availableYears[newIndex]);
      }
    }
  };

  const goToCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    if (availableYears.includes(currentYear)) {
      setSelectedYear(currentYear);
    }
  };

  const canNavigatePrevious = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    return currentIndex > 0; // Can go to smaller index (older year)
  };

  const canNavigateNext = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    return currentIndex < availableYears.length - 1; // Can go to larger index (newer year)
  };

  const calculateStats = (records, totalDays = null) => {
    if (!records || records.length === 0) {
      return {
        total: 0,
        average: 0,
        averageWithData: 0,
        averageOccurrences: 0,
        min: 0,
        max: 0,
        count: 0,
        daysWithData: 0,
      };
    }

    const numbers = records.map((r) => r.number);
    const total = numbers.reduce((sum, num) => sum + num, 0);

    // Calculate average: days with data (including 0) / sum of all numbers
    const daysWithData = records.length; // All records count as days with data
    const average = total > 0 ? daysWithData / total : 0;

    // Calculate sum/occ: total days / number of occurrences (same as yearly calendar view)
    const occurrences = numbers.filter((num) => num > 0).length;
    const averageWithData =
      totalDays && occurrences > 0 ? totalDays / occurrences : 0;

    // Calculate average based on occurrences (count each date with number > 0 as 1)
    const averageOccurrences =
      total > 0 && totalDays ? totalDays / occurrences : 0;

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    return {
      total,
      average,
      averageWithData,
      averageOccurrences,
      min,
      max,
      count: records.length,
      daysWithData,
    };
  };

  const getMonthlyStats = (records) => {
    const monthlyData = {};

    for (let month = 1; month <= 12; month++) {
      const monthRecords = records.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() + 1 === month;
      });

      // Calculate total days in the month (accounting for leap years)
      const daysInMonth = new Date(selectedYear, month, 0).getDate();
      monthlyData[month] = calculateStats(monthRecords, daysInMonth);
    }

    return monthlyData;
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <TrendingUp color='success' />;
    if (current < previous) return <TrendingDown color='error' />;
    return <TrendingUp color='disabled' />;
  };

  const getColorForValue = (value, maxValue) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return '#d32f2f';
    if (percentage >= 60) return '#f57c00';
    if (percentage >= 40) return '#fbc02d';
    if (percentage >= 20) return '#388e3c';
    return '#1976d2';
  };

  // Calculate total days in the year (accounting for leap years)
  const isLeapYear =
    selectedYear % 4 === 0 &&
    (selectedYear % 100 !== 0 || selectedYear % 400 === 0);
  const daysInYear = isLeapYear ? 366 : 365;

  // Calculate total days for overall stats (from earliest to latest record)
  const calculateTotalDaysForOverall = (records) => {
    if (!records || records.length === 0) return 0;

    const dates = records.map((r) => new Date(r.date));
    const earliestDate = new Date(Math.min(...dates));
    const latestDate = new Date(Math.max(...dates));

    // Calculate days between earliest and latest record (inclusive)
    const timeDiff = latestDate.getTime() - earliestDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    return daysDiff;
  };

  const totalDaysOverall = calculateTotalDaysForOverall(allRecords);
  const overallStats = calculateStats(allRecords, totalDaysOverall);
  const yearlyStats = calculateStats(yearlyData, daysInYear);
  const monthlyStats = getMonthlyStats(yearlyData);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Chart.js configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'black',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        color: 'black',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#667eea',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'black',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  // Prepare chart data
  const getChartData = (type) => {
    if (chartView === 'monthly') {
      // For monthly view, show daily data within the selected month
      const sortedMonthlyData = [...monthlyData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const labels = sortedMonthlyData.map((record) => {
        const date = new Date(record.date);
        return `${date.getDate()}`; // Show day of month
      });

      const data = sortedMonthlyData.map((record) => {
        return record.number;
      });

      return {
        labels,
        datasets: [
          {
            label: 'Value',
            data,
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderWidth: 3,
            pointBackgroundColor: '#667eea',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.4,
          },
        ],
      };
    } else {
      const labels = availableYears.map((year) => year.toString());
      const data = availableYears.map((year) => {
        const yearRecords = allRecords.filter(
          (record) => new Date(record.date).getFullYear() === year
        );
        const yearStats = calculateStats(yearRecords);
        if (type === 'average') return yearStats.average;
        if (type === 'total') return yearStats.total;
        return 0;
      });

      return {
        labels,
        datasets: [
          {
            label: type === 'average' ? 'Average' : 'Total',
            data,
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderWidth: 3,
            pointBackgroundColor: '#667eea',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          background:
            'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
          color: 'text.primary',
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          <Analytics />
          JS-IH-1 Summary Report
        </Typography>

        {/* Enhanced Year Selector */}
        <Box sx={{ mb: 3 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 600, color: 'black' }}
              >
                Select Year:
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title='Previous Year'>
                  <IconButton
                    onClick={() => navigateYear(-1)}
                    disabled={!canNavigatePrevious()}
                    sx={{
                      color: canNavigatePrevious()
                        ? 'text.primary'
                        : 'text.disabled',
                      '&:hover': {
                        backgroundColor: canNavigatePrevious()
                          ? 'rgba(0, 0, 0, 0.04)'
                          : 'transparent',
                      },
                    }}
                  >
                    <NavigateBefore />
                  </IconButton>
                </Tooltip>

                <FormControl
                  sx={{
                    minWidth: 120,
                  }}
                >
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={selectedYear}
                    label='Year'
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {availableYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Tooltip title='Next Year'>
                  <IconButton
                    onClick={() => navigateYear(1)}
                    disabled={!canNavigateNext()}
                    sx={{
                      color: canNavigateNext()
                        ? 'text.primary'
                        : 'text.disabled',
                      '&:hover': {
                        backgroundColor: canNavigateNext()
                          ? 'rgba(0, 0, 0, 0.04)'
                          : 'transparent',
                      },
                    }}
                  >
                    <NavigateNext />
                  </IconButton>
                </Tooltip>

                <Tooltip title='Go to Current Year'>
                  <IconButton
                    onClick={goToCurrentYear}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <CalendarToday />
                  </IconButton>
                </Tooltip>
              </Box>

              <Chip
                label={`${availableYears.length} year${
                  availableYears.length !== 1 ? 's' : ''
                } available`}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'text.primary',
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              />
            </Box>
          </Paper>
        </Box>

        {loading ? (
          <LinearProgress />
        ) : (
          <>
            {/* Overall Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6} lg={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={{
                      height: 160,
                      borderRadius: 3,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography color='textSecondary' gutterBottom>
                        Total Records
                      </Typography>
                      <Typography
                        variant='h4'
                        sx={{ color: '#667eea', fontWeight: 600 }}
                      >
                        {overallStats.count}
                      </Typography>
                      <LinearProgress
                        variant='determinate'
                        value={Math.min((overallStats.count / 100) * 100, 100)}
                        sx={{
                          mt: 1,
                          borderRadius: 2,
                          backgroundColor: 'rgba(102, 126, 234, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#667eea',
                            borderRadius: 2,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card
                    sx={{
                      height: 160,
                      borderRadius: 3,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography color='textSecondary' gutterBottom>
                        Overall Average
                      </Typography>
                      <Typography
                        variant='h4'
                        sx={{ color: '#667eea', fontWeight: 600 }}
                      >
                        {overallStats.average.toFixed(1)}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        Sum/Occ: {overallStats.averageWithData.toFixed(1)}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                      >
                        {getTrendIcon(
                          overallStats.average,
                          yearlyStats.average
                        )}
                        <Typography variant='body2' sx={{ ml: 1 }}>
                          vs {selectedYear}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Yearly Statistics */}
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
                fontWeight: 600,
              }}
            >
              <Assessment />
              {selectedYear} Statistics
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: 160,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      Records in {selectedYear}
                    </Typography>
                    <Typography
                      variant='h3'
                      sx={{ color: '#667eea', fontWeight: 600 }}
                    >
                      {yearlyStats.count}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {((yearlyStats.count / overallStats.count) * 100).toFixed(
                        1
                      )}
                      % of total
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: 160,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      Average in {selectedYear}
                    </Typography>
                    <Typography
                      variant='h3'
                      sx={{ color: '#667eea', fontWeight: 600 }}
                    >
                      {yearlyStats.average.toFixed(1)}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Sum/Occ: {yearlyStats.averageWithData.toFixed(1)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {getTrendIcon(yearlyStats.average, overallStats.average)}
                      <Typography variant='body2' sx={{ ml: 1 }}>
                        vs Overall
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    height: 160,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      Total Value in {selectedYear}
                    </Typography>
                    <Typography
                      variant='h3'
                      sx={{ color: '#667eea', fontWeight: 600 }}
                    >
                      {yearlyStats.total.toFixed(1)}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Sum of all numbers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Chart.js Line Charts Section */}
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
                fontWeight: 600,
                mt: 4,
              }}
            >
              <ShowChart />
              Data Visualization
            </Typography>

            {/* Chart Controls */}
            <Box sx={{ mb: 3 }}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background:
                    'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 600, color: 'black' }}
                  >
                    Chart View:
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ToggleButtonGroup
                      value={chartView}
                      exclusive
                      onChange={(e, newView) =>
                        newView && setChartView(newView)
                      }
                      sx={{
                        '& .MuiToggleButton-root': {
                          color: 'text.primary',
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            color: 'text.primary',
                          },
                        },
                      }}
                    >
                      <ToggleButton value='monthly'>
                        <ShowChart sx={{ mr: 1 }} />
                        Monthly
                      </ToggleButton>
                      <ToggleButton value='yearly'>
                        <BarChart sx={{ mr: 1 }} />
                        Yearly
                      </ToggleButton>
                    </ToggleButtonGroup>

                    {chartView === 'monthly' && (
                      <FormControl
                        sx={{
                          minWidth: 120,
                        }}
                      >
                        <InputLabel>Month</InputLabel>
                        <Select
                          value={selectedMonth}
                          label='Month'
                          onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                          {monthNames.map((month, index) => (
                            <MenuItem key={index} value={index + 1}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Box>

                  {chartView === 'yearly' && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Button
                        variant={singleChartView ? 'contained' : 'outlined'}
                        onClick={() => setSingleChartView(!singleChartView)}
                        startIcon={<ShowChart />}
                        sx={{
                          color: singleChartView ? 'white' : 'black',
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                          backgroundColor: singleChartView
                            ? 'rgba(0, 0, 0, 0.8)'
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: singleChartView
                              ? 'rgba(0, 0, 0, 0.9)'
                              : 'rgba(0, 0, 0, 0.05)',
                          },
                        }}
                      >
                        {singleChartView
                          ? 'Show Both Charts'
                          : 'Show Single Chart'}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid
                item
                xs={12}
                md={chartView === 'monthly' ? 12 : singleChartView ? 12 : 6}
              >
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background:
                      'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    height: 400,
                  }}
                >
                  <Box sx={{ height: 350 }}>
                    <Line
                      data={getChartData(
                        chartView === 'monthly' ? 'value' : 'average'
                      )}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            text:
                              chartView === 'monthly'
                                ? `Daily Values - ${
                                    monthNames[selectedMonth - 1]
                                  } ${selectedYear}`
                                : 'Yearly Average Trend',
                          },
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>

              {chartView === 'yearly' && !singleChartView && (
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background:
                        'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      height: 400,
                    }}
                  >
                    <Box sx={{ height: 350 }}>
                      <Line
                        data={getChartData(
                          chartView === 'monthly' ? 'value' : 'total'
                        )}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text:
                                chartView === 'monthly'
                                  ? `Daily Values (Alt) - ${
                                      monthNames[selectedMonth - 1]
                                    } ${selectedYear}`
                                  : 'Yearly Total Trend',
                            },
                          },
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>

            {/* Monthly Breakdown */}
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
                fontWeight: 600,
              }}
            >
              <BarChart />
              Monthly Breakdown - {selectedYear}
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                backgroundColor: 'transparent',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'black' }}>
                      Month
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: 'black' }}
                    >
                      Records
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: 'black' }}
                    >
                      Average (Days/Sum)
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: 'black' }}
                    >
                      Average (Days/Occurrences)
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: 'black' }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: 'black' }}
                    >
                      Max
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthNames.map((monthName, index) => {
                    const monthStats = monthlyStats[index + 1];
                    const maxAvg = Math.max(
                      ...Object.values(monthlyStats).map((s) => s.average)
                    );

                    return (
                      <TableRow
                        key={monthName}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{ fontWeight: 600 }}
                        >
                          {monthName}
                        </TableCell>
                        <TableCell align='right'>{monthStats.count}</TableCell>
                        <TableCell align='right'>
                          {monthStats.average.toFixed(1)}
                        </TableCell>
                        <TableCell align='right'>
                          {monthStats.averageOccurrences.toFixed(1)}
                        </TableCell>
                        <TableCell align='right'>
                          {monthStats.total.toFixed(1)}
                        </TableCell>
                        <TableCell align='right'>{monthStats.max}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default JSIHSummary;

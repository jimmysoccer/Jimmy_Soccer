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
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getAllJSIHRecords, getJSIHByYear } from '../../services/js-ih-api';

const JSIHSummary = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    loadYearlyData();
  }, [selectedYear]);

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
      years.sort((a, b) => b - a); // Sort descending (newest first)
      setAvailableYears(years);

      // Set selected year to most recent year with data, or current year
      if (years.length > 0) {
        setSelectedYear(years[0]);
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
    return currentIndex < availableYears.length - 1;
  };

  const canNavigateNext = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    return currentIndex > 0;
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

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'white',
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
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
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
                sx={{ fontWeight: 600, color: 'white' }}
              >
                Select Year:
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title='Previous Year'>
                  <IconButton
                    onClick={() => navigateYear(1)}
                    disabled={!canNavigatePrevious()}
                    sx={{
                      color: canNavigatePrevious()
                        ? 'white'
                        : 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        backgroundColor: canNavigatePrevious()
                          ? 'rgba(255, 255, 255, 0.1)'
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
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
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
                    onClick={() => navigateYear(-1)}
                    disabled={!canNavigateNext()}
                    sx={{
                      color: canNavigateNext()
                        ? 'white'
                        : 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        backgroundColor: canNavigateNext()
                          ? 'rgba(255, 255, 255, 0.1)'
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
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              />
            </Box>
          </Paper>
        </Box>

        {loading ? (
          <LinearProgress
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              '& .MuiLinearProgress-bar': { backgroundColor: 'white' },
            }}
          />
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

            <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

            {/* Yearly Statistics */}
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'white',
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

            {/* Monthly Breakdown */}
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'white',
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
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#667eea' }}>
                      Month
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: '#667eea' }}
                    >
                      Records
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: '#667eea' }}
                    >
                      Average (Days/Sum)
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: '#667eea' }}
                    >
                      Average (Days/Occurrences)
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: '#667eea' }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 600, color: '#667eea' }}
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
                            backgroundColor: 'rgba(102, 126, 234, 0.05)',
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

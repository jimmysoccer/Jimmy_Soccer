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
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  Assessment,
  BarChart,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getAllJSIHRecords, getJSIHByYear } from '../../services/js-ih-api';

const JSIHSummary = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);

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
      setAllRecords(data.records || []);
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

    // Calculate sum/occ: sum of all numbers / number of days with data > 0
    const daysWithPositiveData = numbers.filter((num) => num > 0).length;
    const averageWithData =
      daysWithPositiveData > 0 ? total / daysWithPositiveData : 0;

    // Calculate average based on occurrences (count each date with number > 0 as 1)
    const occurrences = numbers.filter((num) => num > 0).length;
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

      monthlyData[month] = calculateStats(monthRecords);
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
  const overallStats = calculateStats(allRecords);
  const yearlyStats = calculateStats(yearlyData);
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
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Analytics />
          JS-IH-1 Summary Report
        </Typography>

        {/* Year Selector */}
        <Box sx={{ mb: 3 }}>
          <FormControl
            sx={{
              minWidth: 120,
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          >
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label='Year'
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography color='textSecondary' gutterBottom>
                        Total Records
                      </Typography>
                      <Typography variant='h4'>{overallStats.count}</Typography>
                      <LinearProgress
                        variant='determinate'
                        value={Math.min((overallStats.count / 100) * 100, 100)}
                        sx={{ mt: 1, borderRadius: 2 }}
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
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography color='textSecondary' gutterBottom>
                        Overall Average
                      </Typography>
                      <Typography variant='h4'>
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
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      Records in {selectedYear}
                    </Typography>
                    <Typography variant='h3'>{yearlyStats.count}</Typography>
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
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      Average in {selectedYear}
                    </Typography>
                    <Typography variant='h3'>
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
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      Total Value in {selectedYear}
                    </Typography>
                    <Typography variant='h3'>
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
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <BarChart />
              Monthly Breakdown - {selectedYear}
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align='right'>Records</TableCell>
                    <TableCell align='right'>Average (Days/Sum)</TableCell>
                    <TableCell align='right'>
                      Average (Days/Occurrences)
                    </TableCell>
                    <TableCell align='right'>Total</TableCell>
                    <TableCell align='right'>Max</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthNames.map((monthName, index) => {
                    const monthStats = monthlyStats[index + 1];
                    const maxAvg = Math.max(
                      ...Object.values(monthlyStats).map((s) => s.average)
                    );

                    return (
                      <TableRow key={monthName}>
                        <TableCell component='th' scope='row'>
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

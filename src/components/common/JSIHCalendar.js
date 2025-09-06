import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add,
  Edit,
  CalendarMonth,
  ViewModule,
  Analytics,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  getJSIHByYear,
  getJSIHByMonth,
  addJSIHRecord,
} from '../../services/js-ih-api';

const JSIHCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'year', 'month'
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);

  // Load data based on view mode
  useEffect(() => {
    loadData();
  }, [currentDate, viewMode]);

  const loadData = async () => {
    setLoading(true);
    try {
      let data;
      const year = currentDate.getFullYear();

      switch (viewMode) {
        case 'year':
          data = await getJSIHByYear(year);
          break;
        case 'month':
          const month = currentDate.getMonth() + 1;
          data = await getJSIHByMonth(year, month);
          break;
        default:
          data = await getJSIHByMonth(year, currentDate.getMonth() + 1);
      }

      setRecords(data.records || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedNumber('');
    setEditingRecord(null);

    // Check if there's already a record for this date
    const existingRecord = records.find((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === date.getFullYear() &&
        recordDate.getMonth() === date.getMonth() &&
        recordDate.getDate() === date.getDate()
      );
    });

    if (existingRecord) {
      setEditingRecord(existingRecord);
      setSelectedNumber(existingRecord.number.toString());
    }

    setDialogOpen(true);
  };

  const handleSaveRecord = async () => {
    if (!selectedNumber || isNaN(selectedNumber)) {
      alert('Please enter a valid number');
      return;
    }

    try {
      // Create a date string in YYYY-MM-DD format to avoid timezone issues
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}T00:00:00.000Z`;

      await addJSIHRecord(dateString, parseFloat(selectedNumber));
      setDialogOpen(false);
      loadData(); // Reload data to show the new/updated record
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record');
    }
  };

  const getRecordForDate = (date) => {
    return records.find((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === date.getFullYear() &&
        recordDate.getMonth() === date.getMonth() &&
        recordDate.getDate() === date.getDate()
      );
    });
  };

  const getColorForNumber = (number) => {
    // Color scale based on number value
    if (number === 0) return '#388e3c'; // Green for 0
    if (number === 1) return '#fbc02d'; // Yellow for 1
    if (number > 1) return '#d32f2f'; // Red for above 1
    return '#1976d2'; // Blue for negative values (fallback)
  };

  const calculateMonthStats = () => {
    if (!records || records.length === 0) {
      return {
        total: 0,
        average: 0,
        averageWithData: 0,
        min: 0,
        max: 0,
        count: 0,
        daysInMonth: 0,
        daysWithData: 0,
        occurrences: 0,
      };
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const numbers = records.map((r) => r.number);
    const total = numbers.reduce((sum, num) => sum + num, 0);
    const occurrences = numbers.filter((num) => num > 0).length;

    // Calculate average: days with data / sum of all numbers
    const average = total > 0 ? records.length / total : 0;

    // Calculate average based on occurrences: days with data / number of occurrences
    const averageWithData = occurrences > 0 ? records.length / occurrences : 0;

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    return {
      total,
      average,
      averageWithData,
      min,
      max,
      count: records.length,
      daysInMonth,
      daysWithData: records.length,
      occurrences,
    };
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <TrendingUp color='success' />;
    if (current < previous) return <TrendingDown color='error' />;
    return <TrendingUp color='disabled' />;
  };

  const renderMonthSummary = () => {
    const stats = calculateMonthStats();
    const monthName = currentDate.toLocaleDateString('en-US', {
      month: 'long',
    });
    const year = currentDate.getFullYear();

    return (
      <Box sx={{ mb: 4 }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Typography
            variant='h5'
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}
          >
            <Analytics />
            {monthName} {year} Summary
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    height: 120,
                    borderRadius: 2,
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
                    <Typography variant='h4' color='primary'>
                      {stats.count}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      of {stats.daysInMonth} days
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card
                  sx={{
                    height: 120,
                    borderRadius: 2,
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
                      Average (Days/Sum)
                    </Typography>
                    <Typography variant='h4' color='primary'>
                      {stats.average.toFixed(1)}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {stats.total > 0
                        ? `${stats.daysWithData}/${stats.total}`
                        : 'No data'}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card
                  sx={{
                    height: 120,
                    borderRadius: 2,
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
                      Average (Days/Occ)
                    </Typography>
                    <Typography variant='h4' color='primary'>
                      {stats.averageWithData.toFixed(1)}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {stats.occurrences > 0
                        ? `${stats.daysWithData}/${stats.occurrences}`
                        : 'No occurrences'}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  sx={{
                    height: 120,
                    borderRadius: 2,
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
                      Total Value
                    </Typography>
                    <Typography variant='h4' color='primary'>
                      {stats.total.toFixed(1)}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Max: {stats.max} | Min: {stats.min}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
              Quick Stats:
            </Typography>
            <Chip
              label={`${stats.daysWithData}/${stats.daysInMonth} days with data`}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderRadius: 2,
                fontWeight: 600,
              }}
            />
            <Chip
              label={`${stats.occurrences} occurrences`}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderRadius: 2,
                fontWeight: 600,
              }}
            />
            <Chip
              label={`${(
                (stats.daysWithData / stats.daysInMonth) *
                100
              ).toFixed(1)}% coverage`}
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
    );
  };

  const renderYearView = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(currentDate.getFullYear(), month, 1);
      const monthRecords = records.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() === month;
      });

      // Calculate total days in the month
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        month + 1,
        0
      ).getDate();

      // Calculate total sum of all numbers
      const totalSum = monthRecords.reduce(
        (sum, record) => sum + record.number,
        0
      );

      // Calculate average: total days / sum of all numbers
      const avgNumber = totalSum > 0 ? daysInMonth / totalSum : 0;

      // Calculate average based on occurrences (count each date with number > 0 as 1)
      const occurrences = monthRecords.filter(
        (record) => record.number > 0
      ).length;
      const avgOccurrences = totalSum > 0 ? daysInMonth / occurrences : 0;

      months.push(
        <Grid item xs={12} sm={6} md={4} lg={3} key={month}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
              sx={{
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border:
                  monthRecords.length > 0
                    ? `2px solid ${getColorForNumber(avgNumber)}`
                    : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                },
              }}
              onClick={() => {
                setCurrentDate(monthDate);
                setViewMode('month');
              }}
            >
              <CardContent>
                <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                  {monthDate.toLocaleDateString('en-US', { month: 'long' })}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {monthRecords.length} records
                </Typography>
                {avgNumber > 0 && (
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: 600, color: '#667eea' }}
                  >
                    Avg (Days/Sum): {avgNumber.toFixed(1)}
                  </Typography>
                )}
                {avgOccurrences > 0 && (
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 500, color: '#764ba2' }}
                  >
                    Avg (Days/Occ): {avgOccurrences.toFixed(1)}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      );
    }

    return (
      <Grid container spacing={2}>
        {months}
      </Grid>
    );
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];

    for (let i = 0; i < 42; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);

      const record = getRecordForDate(currentDay);
      const isCurrentMonth = currentDay.getMonth() === month;
      const isToday = currentDay.toDateString() === new Date().toDateString();

      days.push(
        <Grid item xs={1.7} key={i}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Paper
              sx={{
                p: 1,
                height: 80,
                cursor: 'pointer',
                backgroundColor: isCurrentMonth
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'rgba(255, 255, 255, 0.7)',
                border: isToday
                  ? '2px solid #667eea'
                  : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: isCurrentMonth
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.8)',
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
              onClick={() => handleDateClick(currentDay)}
            >
              <Typography
                variant='body2'
                sx={{
                  color: isCurrentMonth ? '#333' : 'rgba(0, 0, 0, 0.5)',
                  fontWeight: isToday ? 'bold' : 'normal',
                }}
              >
                {currentDay.getDate()}
              </Typography>
              {record && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: getColorForNumber(record.number),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {record.number}
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      );
    }

    return (
      <Box>
        <Grid container spacing={1}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Grid item xs={1.7} key={day}>
              <Typography
                variant='subtitle2'
                align='center'
                sx={{ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.9)' }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {days}
        </Grid>
      </Box>
    );
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);

    switch (viewMode) {
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + direction);
        break;
    }

    setCurrentDate(newDate);
  };

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
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => navigateDate(-1)}
              sx={{
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <Typography variant='h4' sx={{ color: 'white', fontWeight: 600 }}>
              {viewMode === 'year' && currentDate.getFullYear()}
              {viewMode === 'month' &&
                currentDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
            </Typography>
            <IconButton
              onClick={() => navigateDate(1)}
              sx={{
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title='Year View'>
              <IconButton
                onClick={() => setViewMode('year')}
                sx={{
                  color:
                    viewMode === 'year' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  backgroundColor:
                    viewMode === 'year'
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <CalendarMonth />
              </IconButton>
            </Tooltip>
            <Tooltip title='Month View'>
              <IconButton
                onClick={() => setViewMode('month')}
                sx={{
                  color:
                    viewMode === 'month' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  backgroundColor:
                    viewMode === 'month'
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <ViewModule />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Calendar Content */}
        <Box sx={{ minHeight: 400 }}>
          {loading ? (
            <Typography sx={{ color: 'white' }}>Loading...</Typography>
          ) : (
            <>
              {viewMode === 'year' && renderYearView()}
              {viewMode === 'month' && (
                <>
                  {renderMonthSummary()}
                  {renderMonthView()}
                </>
              )}
            </>
          )}
        </Box>

        {/* Legend */}
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Legend:
          </Typography>
          <Chip
            label='0'
            sx={{
              backgroundColor: '#388e3c',
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(56, 142, 60, 0.3)',
            }}
          />
          <Chip
            label='1'
            sx={{
              backgroundColor: '#fbc02d',
              color: 'black',
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(251, 192, 45, 0.3)',
            }}
          />
          <Chip
            label='>1'
            sx={{
              backgroundColor: '#d32f2f',
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(211, 47, 47, 0.3)',
            }}
          />
        </Box>
      </Paper>

      {/* Add/Edit Record Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 600 }}>
          {editingRecord ? 'Edit Record' : 'Add Record'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant='body1'
              gutterBottom
              sx={{ fontWeight: 600, color: 'white' }}
            >
              Date: {selectedDate?.toLocaleDateString()}
            </Typography>
            <TextField
              fullWidth
              label='Number'
              type='number'
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
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
              placeholder={editingRecord ? 'Enter new value' : 'Enter a number'}
            />
            {editingRecord && (
              <Typography
                variant='body2'
                sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Current value: {editingRecord.number}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveRecord}
            variant='contained'
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            {editingRecord ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JSIHCalendar;

import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Chip,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
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
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  getJSIHByYear,
  getJSIHByMonth,
  addJSIHRecord,
} from "../../services/js-ih-api";

const JSIHCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // 'year', 'month'
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(0);
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
        case "year":
          data = await getJSIHByYear(year);
          break;
        case "month":
          const month = currentDate.getMonth() + 1;
          data = await getJSIHByMonth(year, month);
          break;
        default:
          data = await getJSIHByMonth(year, currentDate.getMonth() + 1);
      }

      setRecords(data.records || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedNumber(0);
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
      setSelectedNumber(existingRecord.number);
    }

    setDialogOpen(true);
  };

  const handleSaveRecord = async () => {
    try {
      // Create a date string in YYYY-MM-DD format to avoid timezone issues
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}T00:00:00.000Z`;

      await addJSIHRecord(dateString, selectedNumber);
      setDialogOpen(false);
      loadData(); // Reload data to show the new/updated record
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Error saving record");
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
    // Color scale: green (0) → yellow (3-4) → orange (6-7) → red (9-10)
    const colors = [
      "#388e3c", // 0 - green
      "#558b2f", // 1 - dark green
      "#9e9d24", // 2 - olive
      "#fbc02d", // 3 - yellow
      "#f9a825", // 4 - dark yellow
      "#f57f17", // 5 - orange-yellow
      "#ff6f00", // 6 - orange
      "#ef6c00", // 7 - dark orange
      "#e65100", // 8 - deep orange
      "#d32f2f", // 9 - red
      "#b71c1c", // 10 - dark red
    ];
    if (number >= 0 && number <= 10) return colors[number];
    return "#1976d2"; // Blue fallback
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
    if (current > previous) return <TrendingUp color="success" />;
    if (current < previous) return <TrendingDown color="error" />;
    return <TrendingUp color="disabled" />;
  };

  const renderMonthSummary = () => {
    const stats = calculateMonthStats();
    const monthName = currentDate.toLocaleDateString("en-US", {
      month: "long",
    });
    const year = currentDate.getFullYear();

    return (
      <Box sx={{ mb: 4 }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%)",
            color: "black",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
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
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    background: "rgba(255, 255, 255, 0.95)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Records
                    </Typography>
                    <Typography variant="h4" sx={{ color: "black" }}>
                      {stats.count}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
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
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    background: "rgba(255, 255, 255, 0.95)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Average (Days/Sum)
                    </Typography>
                    <Typography variant="h4" sx={{ color: "black" }}>
                      {stats.average.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stats.total > 0
                        ? `${stats.daysWithData}/${stats.total}`
                        : "No data"}
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
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    background: "rgba(255, 255, 255, 0.95)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Average (Days/Occ)
                    </Typography>
                    <Typography variant="h4" sx={{ color: "black" }}>
                      {stats.averageWithData.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stats.occurrences > 0
                        ? `${stats.daysWithData}/${stats.occurrences}`
                        : "No occurrences"}
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
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    background: "rgba(255, 255, 255, 0.95)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Value
                    </Typography>
                    <Typography variant="h4" sx={{ color: "black" }}>
                      {stats.total.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Max: {stats.max} | Min: {stats.min}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.3)" }} />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Quick Stats:
            </Typography>
            <Chip
              label={`${stats.daysWithData}/${stats.daysInMonth} days with data`}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "black",
                borderRadius: 2,
                fontWeight: 600,
              }}
            />
            <Chip
              label={`${stats.occurrences} occurrences`}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "black",
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
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "black",
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
        0,
      ).getDate();

      // Calculate total sum of all numbers
      const totalSum = monthRecords.reduce(
        (sum, record) => sum + record.number,
        0,
      );

      // Calculate average: total days / sum of all numbers
      const avgNumber = totalSum > 0 ? daysInMonth / totalSum : 0;

      // Calculate average based on occurrences (count each date with number > 0 as 1)
      const occurrences = monthRecords.filter(
        (record) => record.number > 0,
      ).length;
      const avgOccurrences = totalSum > 0 ? daysInMonth / occurrences : 0;

      months.push(
        <Grid item xs={12} sm={6} md={4} lg={3} key={month}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
              sx={{
                cursor: "pointer",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border:
                  monthRecords.length > 0
                    ? `2px solid ${getColorForNumber(avgNumber)}`
                    : "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => {
                setCurrentDate(monthDate);
                setViewMode("month");
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {monthDate.toLocaleDateString("en-US", { month: "long" })}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {monthRecords.length} records
                </Typography>
                {avgNumber > 0 && (
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#667eea" }}
                  >
                    Avg (Days/Sum): {avgNumber.toFixed(1)}
                  </Typography>
                )}
                {avgOccurrences > 0 && (
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "#764ba2" }}
                  >
                    Avg (Days/Occ): {avgOccurrences.toFixed(1)}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>,
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
                cursor: "pointer",
                backgroundColor: isCurrentMonth
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(255, 255, 255, 0.7)",
                border: isToday
                  ? "2px solid #667eea"
                  : "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 2,
                position: "relative",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isCurrentMonth
                    ? "rgba(255, 255, 255, 1)"
                    : "rgba(255, 255, 255, 0.8)",
                  transform: "scale(1.02)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
              }}
              onClick={() => handleDateClick(currentDay)}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isCurrentMonth ? "#333" : "rgba(0, 0, 0, 0.5)",
                  fontWeight: isToday ? "bold" : "normal",
                }}
              >
                {currentDay.getDate()}
              </Typography>
              {record && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: getColorForNumber(record.number),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {record.number}
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>,
      );
    }

    return (
      <Box>
        <Grid container spacing={1}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Grid item xs={1.7} key={day}>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: "bold", color: "black" }}
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
      case "year":
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
      case "month":
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
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
          color: "black",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={() => navigateDate(-1)}
              sx={{
                color: "black",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <Typography variant="h4" sx={{ color: "black", fontWeight: 600 }}>
              {viewMode === "year" && currentDate.getFullYear()}
              {viewMode === "month" &&
                currentDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
            </Typography>
            <IconButton
              onClick={() => navigateDate(1)}
              sx={{
                color: "black",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Year View">
              <IconButton
                onClick={() => setViewMode("year")}
                sx={{
                  color: "black",
                  backgroundColor:
                    viewMode === "year" ? "rgba(0, 0, 0, 0.1)" : "transparent",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                }}
              >
                <CalendarMonth />
              </IconButton>
            </Tooltip>
            <Tooltip title="Month View">
              <IconButton
                onClick={() => setViewMode("month")}
                sx={{
                  color: "black",
                  backgroundColor:
                    viewMode === "month" ? "rgba(0, 0, 0, 0.1)" : "transparent",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
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
            <Typography sx={{ color: "black" }}>Loading...</Typography>
          ) : (
            <>
              {viewMode === "year" && renderYearView()}
              {viewMode === "month" && (
                <>
                  {renderMonthSummary()}
                  {renderMonthView()}
                </>
              )}
            </>
          )}
        </Box>

        {/* Legend - Gradient Scale 0-10 */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "black" }}
          >
            Legend:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: "#388e3c", fontWeight: 700 }}>Low</Typography>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <Box
                key={num}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: getColorForNumber(num),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "0.65rem",
                  fontWeight: "bold",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  cursor: "default",
                }}
              >
                {num}
              </Box>
            ))}
            <Typography variant="caption" sx={{ color: "#b71c1c", fontWeight: 700 }}>High</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Add/Edit Record Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: "white",
            color: "black",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle sx={{ color: "black", fontWeight: 600 }}>
          {editingRecord ? "Edit Record" : "Add Record"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: 600, color: "black" }}
            >
              Date: {selectedDate?.toLocaleDateString()}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Number</InputLabel>
              <Select
                value={selectedNumber}
                label="Number"
                onChange={(e) => setSelectedNumber(Number(e.target.value))}
                sx={{
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.5)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                  "& .MuiSelect-select": {
                    color: "black",
                  },
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {editingRecord && (
              <Typography variant="body2" sx={{ mt: 1, color: "black" }}>
                Current value: {editingRecord.number}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              color: "black",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveRecord}
            variant="contained"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "black",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
            }}
          >
            {editingRecord ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JSIHCalendar;

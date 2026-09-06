import React, { useState, useEffect, useMemo } from "react";
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
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  Assessment,
  BarChart as BarChartIcon,
  NavigateBefore,
  NavigateNext,
  CalendarToday,
  ShowChart,
  PieChart as PieChartIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  getAllJSIHRecords,
  getJSIHByYear,
  getJSIHByMonth,
} from "../../services/js-ih-api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const GRADIENT_COLORS = [
  "#388e3c", // 0 - green
  "#fbc02d", // 1 - yellow
  "#d32f2f", "#d32f2f", "#d32f2f", "#d32f2f", "#d32f2f",
  "#d32f2f", "#d32f2f", "#d32f2f", "#d32f2f", // 2+ - red
];

const PALETTE = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#00bcd4",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
  info: "#2196f3",
};

const JSIHSummary = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [chartView, setChartView] = useState("monthly");
  const [singleChartView, setSingleChartView] = useState(false);

  useEffect(() => { loadAllData(); }, []);
  useEffect(() => { loadYearlyData(); }, [selectedYear]);
  useEffect(() => { loadMonthlyData(); }, [selectedYear, selectedMonth]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const data = await getAllJSIHRecords();
      const records = data.records || [];
      setAllRecords(records);
      const years = [...new Set(records.map((r) => new Date(r.date).getFullYear()))];
      years.sort((a, b) => a - b);
      setAvailableYears(years);
      if (years.length > 0) setSelectedYear(years[years.length - 1]);
    } catch (error) {
      console.error("Error loading all data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadYearlyData = async () => {
    try {
      const data = await getJSIHByYear(selectedYear);
      setYearlyData(data.records || []);
    } catch (error) {
      console.error("Error loading yearly data:", error);
    }
  };

  const loadMonthlyData = async () => {
    try {
      const data = await getJSIHByMonth(selectedYear, selectedMonth);
      setMonthlyData(data.records || []);
    } catch (error) {
      console.error("Error loading monthly data:", error);
    }
  };

  const navigateYear = (direction) => {
    const idx = availableYears.indexOf(selectedYear);
    if (idx !== -1) {
      const newIdx = idx + direction;
      if (newIdx >= 0 && newIdx < availableYears.length) setSelectedYear(availableYears[newIdx]);
    }
  };

  const goToCurrentYear = () => {
    const y = new Date().getFullYear();
    if (availableYears.includes(y)) setSelectedYear(y);
  };

  const canNavigatePrevious = () => availableYears.indexOf(selectedYear) > 0;
  const canNavigateNext = () => availableYears.indexOf(selectedYear) < availableYears.length - 1;

  const calculateStats = (records, totalDays = null) => {
    if (!records || records.length === 0) {
      return { total: 0, average: 0, averageWithData: 0, averageOccurrences: 0, min: 0, max: 0, count: 0, daysWithData: 0 };
    }
    const numbers = records.map((r) => r.number);
    const total = numbers.reduce((s, n) => s + n, 0);
    const daysWithData = records.length;
    const average = total > 0 ? daysWithData / total : 0;
    const occurrences = numbers.filter((n) => n > 0).length;
    const averageWithData = totalDays && occurrences > 0 ? totalDays / occurrences : 0;
    const averageOccurrences = total > 0 && totalDays ? totalDays / occurrences : 0;
    return {
      total, average, averageWithData, averageOccurrences,
      min: Math.min(...numbers), max: Math.max(...numbers),
      count: records.length, daysWithData,
    };
  };

  const getMonthlyStats = (records) => {
    const md = {};
    for (let m = 1; m <= 12; m++) {
      const mr = records.filter((r) => new Date(r.date).getMonth() + 1 === m);
      const dim = new Date(selectedYear, m, 0).getDate();
      md[m] = calculateStats(mr, dim);
    }
    return md;
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <TrendingUp sx={{ color: PALETTE.success, fontSize: 20 }} />;
    if (current < previous) return <TrendingDown sx={{ color: PALETTE.error, fontSize: 20 }} />;
    return <TrendingUp sx={{ color: "text.disabled", fontSize: 20 }} />;
  };

  const isLeapYear = selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0);
  const daysInYear = isLeapYear ? 366 : 365;

  const calculateTotalDaysForOverall = (records) => {
    if (!records || records.length === 0) return 0;
    const dates = records.map((r) => new Date(r.date));
    return Math.ceil((Math.max(...dates) - Math.min(...dates)) / 86400000) + 1;
  };

  const totalDaysOverall = calculateTotalDaysForOverall(allRecords);
  const overallStats = calculateStats(allRecords, totalDaysOverall);
  const yearlyStats = calculateStats(yearlyData, daysInYear);
  const monthlyStats = getMonthlyStats(yearlyData);

  // Value distribution data (count of each value 0-10 in selected year)
  const valueDistribution = useMemo(() => {
    const dist = Array(11).fill(0);
    yearlyData.forEach((r) => {
      const n = r.number;
      if (n >= 0 && n <= 10) dist[n]++;
    });
    return dist;
  }, [yearlyData]);

  const maxMonthlyAvg = Math.max(...Object.values(monthlyStats).map((s) => s.average), 0.1);

  // ============ Chart configs ============
  const baseChartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#555", font: { size: 12, family: "'Inter', sans-serif" }, padding: 16, usePointStyle: true, pointStyle: "circle" } },
      tooltip: { backgroundColor: "rgba(30,30,60,0.92)", titleColor: "#fff", bodyColor: "#ddd", borderColor: PALETTE.primary, borderWidth: 1, cornerRadius: 8, padding: 12 },
    },
    scales: {
      x: { ticks: { color: "#666", font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.04)" } },
      y: { ticks: { color: "#666", font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.06)" }, beginAtZero: true },
    },
  };

  // Monthly line chart (daily values within month)
  const getMonthlyLineData = () => {
    const sorted = [...monthlyData].sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      labels: sorted.map((r) => `${new Date(r.date).getDate()}`),
      datasets: [{
        label: "Daily Value",
        data: sorted.map((r) => r.number),
        borderColor: PALETTE.primary,
        backgroundColor: (ctx) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          g.addColorStop(0, "rgba(102,126,234,0.35)");
          g.addColorStop(1, "rgba(102,126,234,0.02)");
          return g;
        },
        borderWidth: 2.5,
        pointBackgroundColor: sorted.map((r) => GRADIENT_COLORS[Math.min(Math.max(Math.round(r.number), 0), 10)]),
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 9,
        fill: true,
        tension: 0.35,
      }],
    };
  };

  // Yearly trend line chart
  const getYearlyLineData = (type) => {
    const labels = availableYears.map(String);
    const data = availableYears.map((y) => {
      const yr = allRecords.filter((r) => new Date(r.date).getFullYear() === y);
      const s = calculateStats(yr);
      return type === "average" ? s.average : s.total;
    });
    return {
      labels,
      datasets: [{
        label: type === "average" ? "Yearly Average" : "Yearly Total",
        data,
        borderColor: type === "average" ? PALETTE.primary : PALETTE.secondary,
        backgroundColor: type === "average" ? "rgba(102,126,234,0.12)" : "rgba(118,75,162,0.12)",
        borderWidth: 2.5,
        pointBackgroundColor: type === "average" ? PALETTE.primary : PALETTE.secondary,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 9,
        fill: true,
        tension: 0.35,
      }],
    };
  };

  // Monthly bar chart (total per month)
  const getMonthlyBarData = () => ({
    labels: MONTH_NAMES.map((m) => m.slice(0, 3)),
    datasets: [
      {
        label: "Total Value",
        data: MONTH_NAMES.map((_, i) => monthlyStats[i + 1].total),
        backgroundColor: MONTH_NAMES.map((_, i) => {
          const avg = monthlyStats[i + 1].average;
          const ratio = maxMonthlyAvg > 0 ? avg / maxMonthlyAvg : 0;
          return `rgba(102,126,234,${0.25 + ratio * 0.65})`;
        }),
        borderColor: PALETTE.primary,
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: "Record Count",
        data: MONTH_NAMES.map((_, i) => monthlyStats[i + 1].count),
        backgroundColor: "rgba(118,75,162,0.35)",
        borderColor: PALETTE.secondary,
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  });

  // Value distribution doughnut
  const getValueDoughnutData = () => ({
    labels: Array.from({ length: 11 }, (_, i) => `Value ${i}`),
    datasets: [{
      data: valueDistribution,
      backgroundColor: GRADIENT_COLORS.map((c) => c + "cc"),
      borderColor: GRADIENT_COLORS,
      borderWidth: 2,
      hoverOffset: 8,
    }],
  });

  const doughnutOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right", labels: { color: "#555", font: { size: 11 }, padding: 10, usePointStyle: true, pointStyle: "circle" } },
      tooltip: baseChartOpts.plugins.tooltip,
    },
    cutout: "55%",
  };

  // ============ Stat Card component ============
  const StatCard = ({ title, value, subtitle, color = PALETTE.primary, delay = 0, icon }) => (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay }}>
      <Card sx={{
        height: 160, borderRadius: 3, position: "relative", overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        background: `linear-gradient(135deg, ${color}11 0%, ${color}08 100%)`,
        border: `1px solid ${color}22`,
        transition: "all 0.3s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: `0 8px 30px ${color}22` },
      }}>
        <Box sx={{ position: "absolute", top: 12, right: 16, opacity: 0.1, fontSize: 48 }}>{icon}</Box>
        <CardContent>
          <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 600, letterSpacing: 1 }}>{title}</Typography>
          <Typography variant="h3" sx={{ color, fontWeight: 700, mt: 0.5 }}>{value}</Typography>
          {subtitle && <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>{subtitle}</Typography>}
        </CardContent>
      </Card>
    </motion.div>
  );

  // ============ Chart wrapper ============
  const ChartPaper = ({ title, icon, children, height = 380 }) => (
    <Paper sx={{
      p: 3, borderRadius: 3,
      background: "rgba(255,255,255,0.97)",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      height,
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        {icon}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333" }}>{title}</Typography>
      </Box>
      <Box sx={{ height: height - 72 }}>{children}</Box>
    </Paper>
  );

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Paper sx={{
        p: { xs: 2, md: 3 }, borderRadius: 4,
        boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        background: "linear-gradient(160deg, #f8f9ff 0%, #f0f2ff 50%, #faf5ff 100%)",
      }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Analytics sx={{ color: PALETTE.primary, fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a2e" }}>
            Analytics Dashboard
          </Typography>
        </Box>

        {/* Year Selector */}
        <Box sx={{ mb: 3 }}>
          <Paper sx={{
            p: 2, borderRadius: 3,
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333" }}>Year:</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="Previous Year">
                  <span>
                    <IconButton onClick={() => navigateYear(-1)} disabled={!canNavigatePrevious()} size="small">
                      <NavigateBefore />
                    </IconButton>
                  </span>
                </Tooltip>
                <FormControl sx={{ minWidth: 100 }} size="small">
                  <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} sx={{ fontWeight: 600 }}>
                    {availableYears.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                  </Select>
                </FormControl>
                <Tooltip title="Next Year">
                  <span>
                    <IconButton onClick={() => navigateYear(1)} disabled={!canNavigateNext()} size="small">
                      <NavigateNext />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Current Year">
                  <IconButton onClick={goToCurrentYear} size="small"><CalendarToday sx={{ fontSize: 18 }} /></IconButton>
                </Tooltip>
              </Box>
              <Chip label={`${availableYears.length} year${availableYears.length !== 1 ? "s" : ""}`} size="small" sx={{ fontWeight: 600, bgcolor: "rgba(0,0,0,0.05)" }} />
            </Box>
          </Paper>
        </Box>

        {loading ? (
          <LinearProgress sx={{ borderRadius: 2, height: 6 }} />
        ) : (
          <>
            {/* ===== Overall Stats ===== */}
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <Assessment sx={{ fontSize: 22 }} /> Overall Statistics
            </Typography>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              <Grid item xs={6} md={3}>
                <StatCard title="Total Records" value={overallStats.count} subtitle={`across ${availableYears.length} year(s)`} color={PALETTE.primary} icon="📊" />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard title="Overall Avg" value={overallStats.average.toFixed(2)} subtitle={`Sum/Occ: ${overallStats.averageWithData.toFixed(1)}`} color={PALETTE.accent} delay={0.08} icon="📈" />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard title={`${selectedYear} Records`} value={yearlyStats.count} subtitle={`${((yearlyStats.count / (overallStats.count || 1)) * 100).toFixed(0)}% of total`} color={PALETTE.success} delay={0.16} icon="📅" />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard title={`${selectedYear} Total`} value={yearlyStats.total.toFixed(0)} subtitle={`Max: ${yearlyStats.max} · Min: ${yearlyStats.min}`} color={PALETTE.secondary} delay={0.24} icon="🔢" />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* ===== Yearly Comparison ===== */}
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <ShowChart sx={{ fontSize: 22 }} /> Yearly Comparison
            </Typography>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              <Grid item xs={6} md={3}>
                <StatCard title={`${selectedYear} Avg`} value={yearlyStats.average.toFixed(2)} subtitle={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {getTrendIcon(yearlyStats.average, overallStats.average)} vs Overall
                  </Box>
                } color={PALETTE.primary} />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard title="Sum / Occ" value={yearlyStats.averageWithData.toFixed(1)} subtitle="Days per occurrence" color={PALETTE.warning} delay={0.08} />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard title="Days w/ Data" value={yearlyStats.count} subtitle={`${((yearlyStats.count / daysInYear) * 100).toFixed(1)}% coverage`} color={PALETTE.info} delay={0.16} />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard title="Occurrences" value={yearlyData.filter((r) => r.number > 0).length} subtitle="Days with value > 0" color={PALETTE.error} delay={0.24} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* ===== Charts Section ===== */}
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <ShowChart sx={{ fontSize: 22 }} /> Data Visualization
            </Typography>

            {/* Chart Controls */}
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, borderRadius: 3, background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "space-between" }}>
                  <ToggleButtonGroup value={chartView} exclusive onChange={(e, v) => v && setChartView(v)} size="small"
                    sx={{ "& .MuiToggleButton-root": { textTransform: "none", fontWeight: 600, px: 2, "&.Mui-selected": { bgcolor: `${PALETTE.primary}18`, color: PALETTE.primary } } }}>
                    <ToggleButton value="monthly"><ShowChart sx={{ mr: 0.5, fontSize: 18 }} /> Monthly</ToggleButton>
                    <ToggleButton value="yearly"><BarChartIcon sx={{ mr: 0.5, fontSize: 18 }} /> Yearly</ToggleButton>
                  </ToggleButtonGroup>

                  {chartView === "monthly" && (
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {MONTH_NAMES.map((m, i) => <MenuItem key={i} value={i + 1}>{m}</MenuItem>)}
                      </Select>
                    </FormControl>
                  )}

                  {chartView === "yearly" && (
                    <Button variant={singleChartView ? "contained" : "outlined"} onClick={() => setSingleChartView(!singleChartView)} size="small"
                      sx={{ textTransform: "none", fontWeight: 600, bgcolor: singleChartView ? PALETTE.primary : "transparent", color: singleChartView ? "#fff" : "#333", borderColor: "rgba(0,0,0,0.15)", "&:hover": { bgcolor: singleChartView ? PALETTE.secondary : "rgba(0,0,0,0.04)" } }}>
                      {singleChartView ? "Show All" : "Focus View"}
                    </Button>
                  )}
                </Box>
              </Paper>
            </Box>

            {/* Main Charts */}
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              {chartView === "monthly" ? (
                <>
                  <Grid item xs={12} md={8}>
                    <ChartPaper title={`Daily Values — ${MONTH_NAMES[selectedMonth - 1]} ${selectedYear}`} icon={<ShowChart sx={{ color: PALETTE.primary, fontSize: 20 }} />}>
                      <Line data={getMonthlyLineData()} options={{
                        ...baseChartOpts,
                        plugins: { ...baseChartOpts.plugins, legend: { ...baseChartOpts.plugins.legend, display: false } },
                      }} />
                    </ChartPaper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ChartPaper title={`Value Distribution — ${selectedYear}`} icon={<PieChartIcon sx={{ color: PALETTE.secondary, fontSize: 20 }} />} height={380}>
                      <Doughnut data={getValueDoughnutData()} options={doughnutOpts} />
                    </ChartPaper>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={singleChartView ? 12 : 6}>
                    <ChartPaper title="Yearly Average Trend" icon={<ShowChart sx={{ color: PALETTE.primary, fontSize: 20 }} />}>
                      <Line data={getYearlyLineData("average")} options={baseChartOpts} />
                    </ChartPaper>
                  </Grid>
                  {!singleChartView && (
                    <Grid item xs={12} md={6}>
                      <ChartPaper title="Yearly Total Trend" icon={<BarChartIcon sx={{ color: PALETTE.secondary, fontSize: 20 }} />}>
                        <Line data={getYearlyLineData("total")} options={baseChartOpts} />
                      </ChartPaper>
                    </Grid>
                  )}
                </>
              )}
            </Grid>

            {/* Monthly Bar Chart */}
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <ChartPaper title={`Monthly Overview — ${selectedYear}`} icon={<BarChartIcon sx={{ color: PALETTE.accent, fontSize: 20 }} />} height={360}>
                  <Bar data={getMonthlyBarData()} options={{
                    ...baseChartOpts,
                    plugins: { ...baseChartOpts.plugins },
                    scales: { ...baseChartOpts.scales, y: { ...baseChartOpts.scales.y, stacked: false } },
                  }} />
                </ChartPaper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* ===== Monthly Breakdown Table ===== */}
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <BarChartIcon sx={{ fontSize: 22 }} /> Monthly Breakdown — {selectedYear}
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ background: `linear-gradient(90deg, ${PALETTE.primary}11, ${PALETTE.secondary}11)` }}>
                    {["Month", "Records", "Avg (Days/Sum)", "Avg (Days/Occ)", "Total", "Max", "Distribution"].map((h) => (
                      <TableCell key={h} align={h === "Month" ? "left" : "right"} sx={{ fontWeight: 700, color: "#333", py: 1.5, fontSize: 13 }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MONTH_NAMES.map((name, i) => {
                    const s = monthlyStats[i + 1];
                    const barWidth = maxMonthlyAvg > 0 ? (s.average / maxMonthlyAvg) * 100 : 0;
                    return (
                      <TableRow key={name} sx={{ "&:hover": { bgcolor: "rgba(102,126,234,0.04)" }, "&:nth-of-type(even)": { bgcolor: "rgba(0,0,0,0.015)" } }}>
                        <TableCell sx={{ fontWeight: 600 }}>{name.slice(0, 3)}</TableCell>
                        <TableCell align="right">{s.count}</TableCell>
                        <TableCell align="right">{s.average.toFixed(2)}</TableCell>
                        <TableCell align="right">{s.averageOccurrences.toFixed(1)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>{s.total.toFixed(0)}</TableCell>
                        <TableCell align="right">
                          {s.count > 0 ? (
                            <Chip label={s.max} size="small" sx={{ bgcolor: GRADIENT_COLORS[Math.min(s.max, 10)], color: "#fff", fontWeight: 700, minWidth: 32, height: 24 }} />
                          ) : "—"}
                        </TableCell>
                        <TableCell align="right" sx={{ minWidth: 120 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end" }}>
                            <Box sx={{ width: 80, height: 8, bgcolor: "rgba(0,0,0,0.06)", borderRadius: 4, overflow: "hidden" }}>
                              <Box sx={{ width: `${barWidth}%`, height: "100%", borderRadius: 4, background: `linear-gradient(90deg, ${PALETTE.primary}, ${PALETTE.secondary})` }} />
                            </Box>
                            <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 28, textAlign: "right" }}>{((barWidth)).toFixed(0)}%</Typography>
                          </Box>
                        </TableCell>
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

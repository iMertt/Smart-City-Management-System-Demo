import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { PictureAsPdf, TableChart, Schedule } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportGenerator = ({ sensorData }) => {
  const [reportType, setReportType] = useState("daily");
  const [scheduleDialog, setScheduleDialog] = useState(false);

  const generateExcelReport = () => {
    const wb = XLSX.utils.book_new();

    const sensorSheet = [];
    Object.entries(sensorData || {}).forEach(([type, sensors]) => {
      sensors.forEach((sensor) => {
        sensorSheet.push({
          Type: type,
          ID: sensor.id,
          Value: sensor.value,
          Status: sensor.status,
          LastUpdate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(sensorSheet);
    XLSX.utils.book_append_sheet(wb, ws, "Sensor Data");
    XLSX.writeFile(wb, `SCMS_Report_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Smart City Management System Report", 14, 15);

    doc.setFontSize(11);
    doc.text(`Generated: ${format(new Date(), "PPpp")}`, 14, 25);
    doc.text(`Report Type: ${reportType}`, 14, 32);

    const tableData = [];
    Object.entries(sensorData || {}).forEach(([type, sensors]) => {
      sensors.forEach((sensor) => {
        tableData.push([
          type.toUpperCase(),
          sensor.id,
          sensor.value,
          sensor.status,
          (sensor.batteryLevel || "N/A") + "%",
        ]);
      });
    });

    doc.autoTable({
      startY: 40,
      head: [["Type", "ID", "Value", "Status", "Battery"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [26, 35, 126] },
    });

    doc.save(`SCMS_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 3 }}>
        Report Generation
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              PDF Report
            </Typography>
            <Button
              variant="contained"
              startIcon={<PictureAsPdf />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={generatePDF}
            >
              Generate PDF
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Excel Report
            </Typography>
            <Button
              variant="contained"
              startIcon={<TableChart />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={generateExcelReport}
            >
              Generate Excel
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Schedule Reports
            </Typography>
            <Button
              variant="contained"
              startIcon={<Schedule />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setScheduleDialog(true)}
            >
              Schedule
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={scheduleDialog}
        onClose={() => setScheduleDialog(false)}
        PaperProps={{
          sx: {
            bgcolor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>Schedule Reports</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ color: "#fff" }}>Report Frequency</InputLabel>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              sx={{ color: "#fff" }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReportGenerator;

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a237e',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1a237e',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#bdbdbd',
  },
  tableHeader: {
    backgroundColor: '#e3f2fd',
  },
  tableCell: {
    padding: 5,
    flex: 1,
    fontSize: 10,
  }
});

const PDFReport = ({ sensorData, reportType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Smart City Management System Report</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>Report Details</Text>
        <Text>Generated: {format(new Date(), 'PPpp')}</Text>
        <Text>Report Type: {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</Text>
      </View>

      {Object.entries(sensorData || {}).map(([type, sensors]) => (
        <View style={styles.section} key={type}>
          <Text style={styles.title}>{type.charAt(0).toUpperCase() + type.slice(1)} Sensors</Text>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Sensor ID</Text>
              <Text style={styles.tableCell}>Value</Text>
              <Text style={styles.tableCell}>Status</Text>
              <Text style={styles.tableCell}>Battery</Text>
            </View>
            
            {sensors.map((sensor) => (
              <View style={styles.tableRow} key={sensor.id}>
                <Text style={styles.tableCell}>{sensor.id}</Text>
                <Text style={styles.tableCell}>{sensor.value}</Text>
                <Text style={styles.tableCell}>{sensor.status}</Text>
                <Text style={styles.tableCell}>{sensor.batteryLevel}%</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default PDFReport;
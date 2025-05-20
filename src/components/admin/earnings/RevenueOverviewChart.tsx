
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RevenueDataPoint {
  month: string;
  revenue: number;
  enrollments: number;
}

interface RevenueOverviewChartProps {
  data: RevenueDataPoint[];
}

const RevenueOverviewChart: React.FC<RevenueOverviewChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          name="Revenue ($)"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="enrollments" 
          name="Enrollments" 
          stroke="#82ca9d" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueOverviewChart;

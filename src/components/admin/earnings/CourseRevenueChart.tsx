
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CourseRevenueItem {
  name: string;
  revenue: number;
}

interface CourseRevenueChartProps {
  data: CourseRevenueItem[];
}

const CourseRevenueChart: React.FC<CourseRevenueChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No course revenue data available</p>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip formatter={(value) => ['$' + value, 'Revenue']} />
        <Bar dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CourseRevenueChart;

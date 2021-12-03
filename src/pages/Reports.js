import React, { useState } from 'react';
import moment from 'moment';

// project components
import Input from '../components/UI/Input';

const Reports = () => {
  const [date, setDate] = useState(moment().format());

  return (
    <div>
      <br />
      <br />
      <br />
      <h1>Reports</h1>

      <Input
        type="time"
        id="meeting-time"
        name="meeting-time"
        label="Select time"
        value={date}
        min={`${moment().format('YYYY-MM-DD')}T00:00`}
        max={`${moment().format('YYYY-MM-DD')}T23:59`}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default Reports;

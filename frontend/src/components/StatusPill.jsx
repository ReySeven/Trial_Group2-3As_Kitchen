const StatusPill = ({ status }) => {
  const cls = {
    Pending: 'p-Pending', Accepted: 'p-Accepted',
    'Out for delivery': 'p-Out', Delivered: 'p-Delivered', Declined: 'p-Declined',
  };
  return <span className={`badge ${cls[status] || ''}`}>{status}</span>;
};

export default StatusPill;

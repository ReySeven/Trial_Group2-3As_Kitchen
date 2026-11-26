const AddressDisplay = ({ addr, empty = null }) => {
  if (!addr) return empty;
  if (!addr.includes(' | ')) return <span className="muted small">{addr}</span>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
      {addr.split(' | ').map((p, i) => {
        const [label, ...rest] = p.split(': ');
        return (
          <div key={i} className="small">
            <span className="muted">{label}: </span>
            <span>{rest.join(': ')}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AddressDisplay;

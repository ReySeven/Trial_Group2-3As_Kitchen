const AuthHero = ({ title, subtitle }) => {
  return (
    <section className="hero">
      <div className="brand">
        <span className="logo">3A</span>
        3A&apos;s Kitchen
      </div>
      <div>
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
      </div>
      <p className="small">Food Ordering and Delivery Management System</p>
    </section>
  );
};

export default AuthHero;

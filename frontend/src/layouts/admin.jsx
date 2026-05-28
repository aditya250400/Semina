import Header from "../components/Header";

export default function LayoutAdmin({ children }) {
  return (
    <div className="page">
      <Header />
      <div className="page-wrapper">{children}</div>
    </div>
  );
}

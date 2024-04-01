import { useLocation, useNavigate } from "react-router";

const pages = ["Products", "Pages", "Price Plans"];
const paths = ["/products", "/pages", "/price-plans"];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-row gap-10 items-center ml-10">
      {paths.map((path, idx) => (
        <button
          key={path}
          className={
            location.pathname === path
              ? "text-blue-800 underline text-3xl"
              : "text-blue-700 underline text-3xl hover:text-blue-800"
          }
          onClick={() => navigate(path)}
        >
          {pages[idx]}
        </button>
      ))}
    </div>
  );
};

export default Navigation;

import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
      <ClipLoader color="#3b82f6" size={50} />
    </div>
  );
}
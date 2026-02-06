export default function ErrorState({ message = "Something went wrong" }) {
  return <div className="card p-8 text-center text-danger">{message}</div>;
}

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="layout h-[100vh] flex justify-center items-center bg-white">
      <div className="pulseLoader"></div>
    </div>
  );
}

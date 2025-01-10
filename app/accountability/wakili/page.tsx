const WakiliPage = () => {
  return (
    <div className="h-[calc(100vh-6rem)] w-full">
      <iframe
        src="https://wakili.org"
        className="h-full w-full border-none"
        title="Wakili AI Website"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default WakiliPage;

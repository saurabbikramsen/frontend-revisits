const Premium = () => {
  const handleSubmit = async () => {};
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex max-w-3xl min-w-200 h-fit  flex-col mt-20 lg:flex-row">
        <div className="card bg-base-300 rounded-box grid p-10 grow place-items-center">
          <span className="rounded-md mb-10 flex w-full justify-center bg-yellow-600 text-white p-2">
            Gold Plan
          </span>
          <span>$9.99/month</span>
          <span>Unlimited matches</span>
          <span>Unlimited likes</span>
          <span>Unlimited superlikes</span>
          <button className="btn btn-primary mt-10">Subscribe</button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid p-10 grow place-items-center">
          <span className="rounded-md mb-10 w-full flex justify-center bg-gray-400 text-white p-2">
            Silver Plan
          </span>
          <span>$4.99/month</span>
          <span>200 matches</span>
          <span>100 likes per day</span>
          <span>10 superlikes</span>
          <button className="btn btn-primary mt-10" type="submit">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

import "./Loading.css";

function Loading() {
  return (
    <div className='wrapper'>
      <div className='skeleton-wrapper'>
        <div className='skeleton skeleton-title'></div>

        <div className='temp-wrapper'>
          <div className='skeleton skeleton-big-icon'></div>
          <div className='temp-group'>
            <div className='skeleton skeleton-temp'></div>
            <div className='skeleton skeleton-text'></div>
          </div>
        </div>

        <div className='details-wrapper'>
          <div className='details'>
            <div className='skeleton skeleton-small-icon'></div>
            <div className='skeleton skeleton-text'></div>
          </div>
          <div className='details'>
            <div className='skeleton skeleton-small-icon'></div>
            <div className='skeleton skeleton-text'></div>
          </div>
          <div className='details'>
            <div className='skeleton skeleton-small-icon'></div>
            <div className='skeleton skeleton-text'></div>
          </div>
          <div className='details'>
            <div className='skeleton skeleton-small-icon'></div>
            <div className='skeleton skeleton-text'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;

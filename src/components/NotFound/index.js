import './index.css'

const NotFound = props => {
  const redirectClicked = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679656742/erroring_1_ot8hfq.svg"
        alt="page not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found. <br />
        Please go back to the homepage.
      </p>
      <div>
        <button
          type="button"
          className="not-found-redirect-button"
          onClick={redirectClicked}
        >
          Home Page
        </button>
      </div>
    </div>
  )
}

export default NotFound

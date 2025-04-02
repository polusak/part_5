import './notification.css'

const Notification = ({ error, message }) => {
    if (message === null) {
      return null
    }
    
    if (error) {
        return (
            <div className="error">
              {message}
            </div>
          )
    } else {
        return (
            <div className="success">
              {message}
            </div>
          )
    }
  }

export default Notification
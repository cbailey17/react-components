import React from 'react'

const ProgressBars = () => {

    return (
        <div className="progress-new-section" data-aos="fade-left" data-aos-once="true">
          <div className="task-progress">
            <p>Inbox</p>
            <progress className="progress-new progress1-new" max="100" value="80"></progress>
          </div>
          <div class="task-progress-new">
            <p>Later</p>
            <progress className="progress-new progress2-new" max="100" value="50"></progress>
          </div>
          <div clasName="task-progress-new">
            <p>Archive</p>
            <progress className="progress-new progress3-new" max="100" value="75"></progress>
          </div>
        </div>
    )
}

export default ProgressBars
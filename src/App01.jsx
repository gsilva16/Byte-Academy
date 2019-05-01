var contentNode = document.getElementById("contents");

class EventFilter extends React.Component {
  render() {
    return <a href='view02.html'>Profile</a>;
  }
}

const EventRow = (props) => (
  <tr>
    <td>{props.Event.sport}</td>
    <td>{props.Event.location}</td>
    <td>{props.Event.date}</td>
    <td>{props.Event.time}</td>
    
  </tr>
);

function ChangeUserGoing(){
  console.log();

  
}


function EventTable(props) {
  const EventRows = props.Events.map(Event => (
    <EventRow key={Event.id} Event={Event} />
  ));
  return (
    <table className="table table-striped" >
      <thead>
        <tr>
          <th>Sport</th>
          <th>Location</th>
          <th>Date</th>
          <th>Time</th>

        </tr>
      </thead>
      <tbody>{EventRows}</tbody>
    </table>
  );
}

class EventAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.EventAdd;
    this.props.createEvent({
      
      sport: form.sport.value,
      location: form.location.value,
      date: form.date.value,
      time: form.time.value,
      people_going: 0
    });
    // Clear the form for the next input.
    form.sport.value = '';
    form.location.value = '';
    form.date.value = '';
    form.time.value = '';
  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="far fa-calendar-plus"></i> Add an Event
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
          <form className="px-4 py-3" name="EventAdd" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div>
                <label><i className="fas fa-running"></i> Sport</label>
                <input className="form-control" type="text" name="sport" placeholder="Sport" />
                <label><i className="fas fa-map-marker-alt"></i > Where?</label>
                <input className="form-control" type="text" name="location" placeholder="Location" />  
                <label><i className="fas fa-clock"></i> When?</label>
                <input className="form-control" type="date" name="date" placeholder="When?" />
                <input className="form-control" type="time" name="time" placeholder="When?" /> 
              </div>
            </div>
            <button type="submit" className="btn btn-primary" >Add</button>
          </form>
        </div>
      </div>
      
    );
  }
}

class EventList extends React.Component {
  constructor() {
    super();
    this.state = { Events: [] };

    this.createEvent = this.createEvent.bind(this);
  }

  componentDidMount() {
    fetch(`/api/events `).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ Events: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch issues:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }

  createEvent(newEvent) {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(newEvent => {
              const newEvents = this.state.Events.concat(newEvent);
              this.setState({ Events: newEvents });
            });
        }
        else {
          res.json()
            .then(error => {
              alert('Failed to add event: ' + error.message);
            });
        }
      });
  }

  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="index.html">Game On!</a>
            <a className="nav-link" href="index.html"><i className="far fa-calendar-alt"></i> Events</a>
            <a className="nav-link" href="view02.html"><i className="fas fa-user-alt"></i> Profile</a>
            <a className="nav-link" href="about.html"><i className="fas fa-user-alt"></i> About</a>
            <div className="navbar-nav ml-auto">
              <EventAdd createEvent={this.createEvent} />
            </div>
          </nav>
        <EventTable Events={this.state.Events} />
        <hr />
        
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<EventList />, contentNode);

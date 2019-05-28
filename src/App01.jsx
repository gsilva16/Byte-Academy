var contentNode = document.getElementById("contents");
var curId=0;
class EventFilter extends React.Component {
  render() {
    return <a href='view02.html'>Profile</a>;
  }
}

const EventRow = (props) => (
  <tr>
    <td>{props.Event.mes}</td>
    <td>{props.Event.date}</td>
    
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
        <th>Message</th>
        <th>Date</th>
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
    let newDate = new Date(); 
    let form = document.forms.EventAdd;
    this.props.createEvent({
      
      mes: form.mes.value,   
  
      date: newDate.getMonth()+1 + '/' + newDate.getDate() + '/' + newDate.getFullYear() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds(),
    });
    
    form.mes.value = '';
    curId++;
    window.location.reload();
  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="far fa-comment-dots"></i> New Message
        </button>
        <div className="dropdown-menu " aria-labelledby="dropdownMenu2">
          <form className="px-4 py-3" name="EventAdd" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div>
                <label> Message</label>
                <textarea className="form-control" type="text" name="mes" placeholder="Write your message" />
                
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
            <a className="navbar-brand" href="index.html">Message Board</a>
            <div className="navbar-nav ">
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

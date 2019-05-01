const issues = [
  {
    id: 1,
    
    name: "Doris Chan",
    created: new Date("2016-08-15"),
    interest: "Badminton",
    time: "7PM",
    title: "Error in console when clicking Add"
  }
];

var contentNode = document.getElementById("contents");

class IssueFilter extends React.Component {
  render() {
    return <div></div>;
  }
}


let IssueRow = (props) => (
  <table className='table-responsive' width="5%">
    <thead>
      <th>Favorite Sport</th>
      <th>Time Available</th>
      
    </thead>
    <tbody>
      <tr>
        <td >{props.issue.interest}</td>
        <td>{props.issue.time}</td>
      </tr>
    </tbody>
    
  </table>
);

let NameRow = (props) => (
  <tr>
    
    <td>{props.issue.name}</td>
    
    
    
  </tr>
);

function NameTable(props){
  const issueRows = props.issues.map(issue => (
    <NameRow key={issue.id} issue={issue} />
  ));
  
  
  return (
    <table>
      <tbody>{issueRows}</tbody>
      <tr><td>Junior</td></tr>
    </table>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue => (
    <IssueRow key={issue.id} issue={issue} />
  ));


  return (
    <table className="table table-striped">{issueRows}</table>
  );
}

class IssueAdd2 extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.issueAdd2;
    this.props.createIssue({
      time: form.time.value,
      interest: "",
      created: new Date(),
    });
    // Clear the form for the next input.
   
    form.time.value = '';
    
  }

  render() {
    return (
      <div>
        <form name="issueAdd2" onSubmit={this.handleSubmit}>
          <input type="text" name="time" placeholder="Time" />
          <button class="mdc-button">
           edit</button>
        </form>
      </div>
    );
  }
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.issueAdd;
    this.props.createIssue({
      interest: form.interest.value,
      time: "",
      created: new Date(),
    });
    // Clear the form for the next input.
   
    form.interest.value = '';
    
  }

  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="interest" placeholder="Interest" />
          <button class="mdc-button">
           edit</button>
        </form>
      </div>
    );
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };

    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      issues: issues
    });
  }

  createIssue(newIssue) {
   
    if(newIssue.interest != ""){
    this.state.issues[0].interest = newIssue.interest;
    }
    if(newIssue.time != ""){
      this.state.issues[0].time = newIssue.time;
    }
    
   
    this.setState({ issues: this.state.issues });
    
  }

  render() {
    return (
      <div>
        
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="index.html">Game On!</a>
          <a className="nav-link" href="index.html"><i className="far fa-calendar-alt"></i> Events</a>
            <a className="nav-link" href="view02.html"><i className="fas fa-user-alt"></i> Profile</a>
            <a className="nav-link" href="about.html"><i className="fas fa-user-alt"></i> About</a>
          </nav>
        
        <div style={{display: "inline-block" }}>
        <img src = "https://vignette.wikia.nocookie.net/onepunchman/images/7/70/Child_Emperor_%26_Pig_God_vs._Eyesight.png/revision/latest?cb=20180601180653" height = "140" width = "160" className="rounded"></img>
        </div>
        <h1>Doris Chan</h1>
        <h4>Junior</h4>
        
        <IssueTable issues={this.state.issues} />
       
        <IssueAdd createIssue={this.createIssue} />
        <IssueAdd2 createIssue= {this.createIssue}/>
        
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<IssueList />, contentNode);

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var issues = [{
  id: 1,

  name: "Doris Chan",
  created: new Date("2016-08-15"),
  interest: "Badminton",
  time: "7PM",
  title: "Error in console when clicking Add"
}];

var contentNode = document.getElementById("contents");

var IssueFilter = function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
  }

  _createClass(IssueFilter, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null);
    }
  }]);

  return IssueFilter;
}(React.Component);

var IssueRow = function IssueRow(props) {
  return React.createElement(
    "table",
    { className: "table-responsive", width: "5%" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "th",
        null,
        "Favorite Sport"
      ),
      React.createElement(
        "th",
        null,
        "Time Available"
      )
    ),
    React.createElement(
      "tbody",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          props.issue.interest
        ),
        React.createElement(
          "td",
          null,
          props.issue.time
        )
      )
    )
  );
};

var NameRow = function NameRow(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      props.issue.name
    )
  );
};

function NameTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return React.createElement(NameRow, { key: issue.id, issue: issue });
  });

  return React.createElement(
    "table",
    null,
    React.createElement(
      "tbody",
      null,
      issueRows
    ),
    React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        "Junior"
      )
    )
  );
}

function IssueTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return React.createElement(IssueRow, { key: issue.id, issue: issue });
  });

  return React.createElement(
    "table",
    { className: "table table-striped" },
    issueRows
  );
}

var IssueAdd2 = function (_React$Component2) {
  _inherits(IssueAdd2, _React$Component2);

  function IssueAdd2() {
    _classCallCheck(this, IssueAdd2);

    var _this2 = _possibleConstructorReturn(this, (IssueAdd2.__proto__ || Object.getPrototypeOf(IssueAdd2)).call(this));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(IssueAdd2, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueAdd2;
      this.props.createIssue({
        time: form.time.value,
        interest: "",
        created: new Date()
      });
      // Clear the form for the next input.

      form.time.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "issueAdd2", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "time", placeholder: "Time" }),
          React.createElement(
            "button",
            { "class": "mdc-button" },
            "edit"
          )
        )
      );
    }
  }]);

  return IssueAdd2;
}(React.Component);

var IssueAdd = function (_React$Component3) {
  _inherits(IssueAdd, _React$Component3);

  function IssueAdd() {
    _classCallCheck(this, IssueAdd);

    var _this3 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    return _this3;
  }

  _createClass(IssueAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueAdd;
      this.props.createIssue({
        interest: form.interest.value,
        time: "",
        created: new Date()
      });
      // Clear the form for the next input.

      form.interest.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "issueAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "interest", placeholder: "Interest" }),
          React.createElement(
            "button",
            { "class": "mdc-button" },
            "edit"
          )
        )
      );
    }
  }]);

  return IssueAdd;
}(React.Component);

var IssueList = function (_React$Component4) {
  _inherits(IssueList, _React$Component4);

  function IssueList() {
    _classCallCheck(this, IssueList);

    var _this4 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

    _this4.state = { issues: [] };

    _this4.createIssue = _this4.createIssue.bind(_this4);
    return _this4;
  }

  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      this.setState({
        issues: issues
      });
    }
  }, {
    key: "createIssue",
    value: function createIssue(newIssue) {

      if (newIssue.interest != "") {
        this.state.issues[0].interest = newIssue.interest;
      }
      if (newIssue.time != "") {
        this.state.issues[0].time = newIssue.time;
      }

      this.setState({ issues: this.state.issues });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "nav",
          { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
          React.createElement(
            "a",
            { className: "navbar-brand", href: "index.html" },
            "Game On!"
          ),
          React.createElement(
            "a",
            { className: "nav-link", href: "index.html" },
            React.createElement("i", { className: "far fa-calendar-alt" }),
            " Events"
          ),
          React.createElement(
            "a",
            { className: "nav-link", href: "view02.html" },
            React.createElement("i", { className: "fas fa-user-alt" }),
            " Profile"
          ),
          React.createElement(
            "a",
            { className: "nav-link", href: "about.html" },
            React.createElement("i", { className: "fas fa-user-alt" }),
            " About"
          )
        ),
        React.createElement(
          "div",
          { style: { display: "inline-block" } },
          React.createElement("img", { src: "https://vignette.wikia.nocookie.net/onepunchman/images/7/70/Child_Emperor_%26_Pig_God_vs._Eyesight.png/revision/latest?cb=20180601180653", height: "140", width: "160", className: "rounded" })
        ),
        React.createElement(
          "h1",
          null,
          "Doris Chan"
        ),
        React.createElement(
          "h4",
          null,
          "Junior"
        ),
        React.createElement(IssueTable, { issues: this.state.issues }),
        React.createElement(IssueAdd, { createIssue: this.createIssue }),
        React.createElement(IssueAdd2, { createIssue: this.createIssue })
      );
    }
  }]);

  return IssueList;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(IssueList, null), contentNode);
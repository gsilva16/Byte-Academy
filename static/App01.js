"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");
var curId = 0;

var EventFilter = function (_React$Component) {
  _inherits(EventFilter, _React$Component);

  function EventFilter() {
    _classCallCheck(this, EventFilter);

    return _possibleConstructorReturn(this, (EventFilter.__proto__ || Object.getPrototypeOf(EventFilter)).apply(this, arguments));
  }

  _createClass(EventFilter, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "a",
        { href: "view02.html" },
        "Profile"
      );
    }
  }]);

  return EventFilter;
}(React.Component);

var EventRow = function EventRow(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      props.Event.mes
    ),
    React.createElement(
      "td",
      null,
      props.Event.date
    )
  );
};

function ChangeUserGoing() {
  console.log();
}

function EventTable(props) {
  var EventRows = props.Events.map(function (Event) {
    return React.createElement(EventRow, { key: Event.id, Event: Event });
  });
  return React.createElement(
    "table",
    { className: "table table-striped" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          null,
          "Message"
        ),
        React.createElement(
          "th",
          null,
          "Date"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      EventRows
    )
  );
}

var EventAdd = function (_React$Component2) {
  _inherits(EventAdd, _React$Component2);

  function EventAdd() {
    _classCallCheck(this, EventAdd);

    var _this2 = _possibleConstructorReturn(this, (EventAdd.__proto__ || Object.getPrototypeOf(EventAdd)).call(this));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(EventAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var newDate = new Date();
      var form = document.forms.EventAdd;
      this.props.createEvent({

        mes: form.mes.value,

        date: newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds()
      });

      form.mes.value = '';
      curId++;
      window.location.reload();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "dropdown" },
        React.createElement(
          "button",
          { className: "btn btn-secondary dropdown-toggle", type: "button", id: "dropdownMenu2", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
          React.createElement("i", { className: "far fa-comment-dots" }),
          " New Message"
        ),
        React.createElement(
          "div",
          { className: "dropdown-menu ", "aria-labelledby": "dropdownMenu2" },
          React.createElement(
            "form",
            { className: "px-4 py-3", name: "EventAdd", onSubmit: this.handleSubmit },
            React.createElement(
              "div",
              { className: "form-row" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  " Message"
                ),
                React.createElement("textarea", { className: "form-control", type: "text", name: "mes", placeholder: "Write your message" })
              )
            ),
            React.createElement(
              "button",
              { type: "submit", className: "btn btn-primary" },
              "Add"
            )
          )
        )
      );
    }
  }]);

  return EventAdd;
}(React.Component);

var EventList = function (_React$Component3) {
  _inherits(EventList, _React$Component3);

  function EventList() {
    _classCallCheck(this, EventList);

    var _this3 = _possibleConstructorReturn(this, (EventList.__proto__ || Object.getPrototypeOf(EventList)).call(this));

    _this3.state = { Events: [] };

    _this3.createEvent = _this3.createEvent.bind(_this3);
    return _this3;
  }

  _createClass(EventList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      fetch("/api/events ").then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            _this4.setState({ Events: data.records });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch issues:" + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: "createEvent",
    value: function createEvent(newEvent) {
      var _this5 = this;

      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (newEvent) {
            var newEvents = _this5.state.Events.concat(newEvent);
            _this5.setState({ Events: newEvents });
          });
        } else {
          res.json().then(function (error) {
            alert('Failed to add event: ' + error.message);
          });
        }
      });
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
            "Message Board"
          ),
          React.createElement(
            "div",
            { className: "navbar-nav " },
            React.createElement(EventAdd, { createEvent: this.createEvent })
          )
        ),
        React.createElement(EventTable, { Events: this.state.Events }),
        React.createElement("hr", null)
      );
    }
  }]);

  return EventList;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(EventList, null), contentNode);
/** @jsx React.DOM */

var CheckboxField = React.createClass({
  propTypes: {
    values: React.PropTypes.object.isRequired
  },
  getDefaultProps: function () {
    return {
      values: {
        label: "Place holder text"
      }
    };
  },
  render: function () {
    return (
      <label htlmFor={this.props.values.id}>
        <input type="checkbox"
          name={this.props.values.name}
          id={this.props.values.id}
          value={this.props.values.value}
          checked={this.props.values.checked}
          onChange={this.handleChange} />
                {this.props.values.label}
        <br />
      </label>
    );
  },
  handleChange: function (event) {
    // Should use this to set parent's state via a callback func.  Then the
    // change to the parent's state will generate new props to be passed down
    // to the children in the render().
    this.props.callBackOnChange(this.props.values.value, event.target.checked);
  }
});

var CheckboxFieldGroup = React.createClass({
  propTypes: {
    defaultValues: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    // default props passed in to CheckboxFieldGroup (this componenent) will be used to set up the state.  State
    // is stored in this component, and *not* in the child CheckboxField components.  The state store in this
    // component will, in turn, generate the props for the child CheckboxField components.  When the latter
    // are updated (i.e. clicked) by the user, then the event will call the handleChange() function in
    // this component.  That will generate update this component's state, which in turn will generate
    // new props for the child CheckboxField components, which will cause those components to re-render!
    var that = this;
    var states = {};
    _.map(this.props.defaultValues.checkboxes, function (choice, key) {
      states[key] = choice.checked;
    });
    return states;
  },
  renderChoices: function () {
    var that = this; // Could also use .bind(this) on our map() function but that requires IE9+.
    return _.map(this.props.defaultValues.checkboxes, function (choice, key) {
      return CheckboxField({
      key: key,
        values: {
          name: that.props.defaultValues.name,
          value: key,
          label: choice.label,
          id: choice.id,
          checked: that.state[key]
        },
        callBackOnChange: that.handleChange
      });
    });

  },
  render: function () {
    return (
      <form>
                {this.renderChoices()}
      </form>
    );
  },
  handleChange: function (componentChanged, newState) {
    var stateChanged = {};
    stateChanged[componentChanged] = newState;
    this.setState(stateChanged);  // Automatically triggers render() !!
  },
  getCheckedValues: function () {
    var checkedObjArray = [];
    var self = this;

    checkedArray = _.filter(_.keys(this.state), function (key) {
      return self.state[key]
    });

    console.log("CheckboxFieldGroup.getCheckedValues() = " + checkedArray);
  },
  componentDidMount: function () {
    this.getCheckedValues();
  },
  componentDidUpdate: function () {
    this.getCheckedValues();
  }
});

var defaults = {
  name: "mikeyCheck",
  checkboxes: {
    MyCheckboxField: {
      label: "My Checkbox Field",
      checked: false
    },
    MyOtherCheckboxField: {
      label: "My Other Checkbox Field",
      checked: false
    },
    YetAnotherCheckboxField: {
      label: "Yet Another Checkbox Field",
      checked: true
    },
    YesItsAFourthCheckboxField: {
      label: "Yes, it's a fourth checkbox field",
      checked: false
    }
  }
};

React.renderComponent(<CheckboxFieldGroup defaultValues={defaults} />, document.getElementById("main"));
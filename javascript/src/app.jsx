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
    console.log("CheckboxField.render()");
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
    // ChingKang change: we pass the value (from props) and the new checked state.  (I passed back
    // the whole event and the new checked state.)
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
    // First of the ChingKang changes.  See http://stackoverflow.com/questions/27853840/reactjs-managed-checkbox-groups
    // Big ChingKang changes here.  He uses a hash/associative array instead of a "normal" array as
    // I was using.  More importantly, he only has the checked property as part of state, as that's
    // the only thing that the user can change.  (I had pretty well *everything* in state!!)  State
    // is returned as hash array of checkbox states only, e.g:
    //          MyCheckboxField : false
    //          MyOtherChecboxField: false
    //          YetAnotherCheckboxField: true
    var states = {};
    var dataToLoop = this.props.defaultValues.get("questions");
    dataToLoop.each(function (choice, key) {
      states[key] = choice.get("checked");
    });
    return states;
  },
  renderChoices: function () {
    var that = this; // Could also use .bind(this) on our map() function but that requires IE9+.
    var collToLoop = this.props.defaultValues.get("questions");
    var returnData = [];
    collToLoop.each(function (choice, key) {
      console.log("loopy, key = " + key);
      values = {
          name: that.props.defaultValues.get("name"),
          value: key,
          label: choice.get("label"),
          id: choice.get("id"),
          checked: that.state[key]
        };
      returnData.push (
        <CheckboxField
          key={key}
          values={values}
          callBackOnChange={that.handleChange} />
        );
    });
    return returnData;
  },
  render: function () {
    var data = this.renderChoices();
    return (
      <form>
        {data}
      </form>
    );
  },
  handleChange: function (componentChanged, newState) {
    var stateChanged = {};

    // Another big ChinKang change here.  How to change state for just the one CheckboxField that's actually
    // been ticked.  Because he's done it all as a hash/associate array, he only has to set the one element
    // that needs to be changed.  setState() must do a merge of the new state element with all of the existing
    // state elements then.
    stateChanged[componentChanged] = newState;
    this.setState(stateChanged);  // Automatically triggers render() !!
  },
  getCheckedValues: function () {
    var checkedObjArray = [];
    var self = this;        // ChinKang prefers "self" to "this"!

    // Final ChinKang change.  This function much shorter than my double functions because he's used the hash array.
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


var firstDataModel = firstCheckBoxList.first();
React.render(<CheckboxFieldGroup defaultValues={firstCheckBoxList.first()} />, document.getElementById("main"));
// React.render(<CheckboxFieldGroup defaultValues={defaults} />, document.getElementById("main"));













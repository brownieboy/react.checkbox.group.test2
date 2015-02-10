
var CheckboxModel = Backbone.Model.extend({
    defaults: {
        label: "My label",
        checked: false
    }
});

var CheckboxQuestionsColl = Backbone.Collection.extend({
    model: CheckboxModel
});

var CheckboxListModel = Backbone.Model.extend({
    defaults: {
        name: "my name",
        questions: []
    },
    initialize: function(initObj) {
        this.set("questions", new CheckboxQuestionsColl(initObj.questions));
        console.log("CheckboxListModel.initialize()");
    }
});

var CheckboxesListColl = Backbone.Collection.extend({
    model: CheckboxListModel,
    initialize: function() {
        console.log("CheckboxesListColl.initialize()");
    }
});

var defaults = [{
    name: "mikeyCheck",
    questions: [{
        label: "My Checkbox Field",
        checked: false
    }, {
        label: "My Other Checkbox Field",
        checked: false
    }, {
        label: "Yet Another Checkbox Field",
        checked: true
    }, {
        label: "Yes, it's a fourth checkbox field",
        checked: false
    }]
}, {
    name: "mikeyCheck2",
    questions: [{
        label: "My Checkbox Field ",
        checked: false
    }, {
        label: "My Other Checkbox Field 2",
        checked: false
    }, {
        label: "Yet Another Checkbox Field 2",
        checked: true
    }, {
        label: "Yes, it's a fourth checkbox field 2",
        checked: false
    }]
}];


var firstCheckBoxList = new CheckboxesListColl(defaults);
var firstCheckBoxListJSONString = JSON.stringify(firstCheckBoxList);
var firstCheckBoxListJSON = JSON.parse(firstCheckBoxListJSONString);
console.log("done");


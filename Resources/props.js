
var meta = ["id", "type", "layout", "left", "right", "top", "bottom", "width", "height", "text", "title", "value", "hintText", "passwordMask", "backgroundColor", "color", "fontSize", "borderWidth", "borderColor", "borderRadius"];
var fields = {};

exports.create = function() {
    var view = Ti.UI.createScrollView({
        width: "33%",
        layout: "vertical",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#33c8a3"
    });
    
    for (var i=0;i<meta.length;i++) {
        var m = meta[i];
        var row = Ti.UI.createView({
            height: Ti.UI.SIZE,
            top: 20,
        });
        view.add(row);
        row.add(Ti.UI.createLabel({
            text: m,
            left: 10,
            width: "45%"
        }));
        fields[m] = Ti.UI.createTextField({
            value: "",
            left: "45%",
            right: 10,
        });
        row.add(fields[m]);
    }
    
    var submit = Ti.UI.createButton({
        title: "Submit",
        top: 20,
    });
    submit.addEventListener("click", function() {
        var item = app.items[app.selected];
        for (var i=0;i<meta.length;i++) {
            var m = meta[i];
            if (fields[m].value == '-') {
                item[m] = undefined;
            } else {
                item[m] = fields[m].value;
            }   
        }
        app.update();
    });
    view.add(submit);
    
    view.update = function() {
        var item = app.items[app.selected];
        for (var i=0;i<meta.length;i++) {
            var m = meta[i];
            if (item[m] == undefined) {
                fields[m].value = '-';
            } else {
                fields[m].value = item[m];
            }
        }
    };
    
    return view;
};
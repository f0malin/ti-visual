
var meta = ["id", "type", "layout", "left", "right", "top", "bottom", "width", "height", "text", "title", "value", "hintText", "passwordMask", "backgroundColor", "color", "fontSize", "borderWidth", "borderColor", "borderRadius"];
var fields = {};

exports.create = function() {
    var view = Ti.UI.createScrollView({
        width: "33%",
        layout: "vertical",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#33c8a3",
    });
    
    for (var i=0;i<meta.length;i++) {
        var m = meta[i];
        var row = Ti.UI.createView({
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            top: 20,
        });
        view.add(row);
        row.add(Ti.UI.createLabel({
            text: m,
            left: "5%",
            width: "40%",
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        }));
        fields[m] = Ti.UI.createTextField({
            value: "",
            width: "45%",
            right: "5%",
            borderColor: "#33c8a3",
            borderWidth: 1,
        });
        row.add(fields[m]);
    }
    
    var submit = Ti.UI.createButton({
        title: "Submit",
        top: 20,
        width: 80,
        backgroundColor: "#33c8a3",
        color: "white",
        height: 30,
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
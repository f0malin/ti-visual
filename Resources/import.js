function genCode(data) {
    var id = data.id;
    var type = data.type || "view";
    var children = data.children;
    var args = dup(data);
    args.id = undefined;
    args.type = undefined;
    args.children = undefined;
    if (args.fontSize) {
        args.font = {fontSize: args.fontSize};
        args.fontSize = undefined;
    }
    var code = 'var ' + id + " = Ti.UI.create" + type.substr(0,1).toUpperCase() + type.substr(1) + "("+JSON.stringify(args)+");\n";
    if (children) {
        for (var i=0;i<children.length;i++) {
            var child = children[i];
            if (!child.deleted) {
                code += genCode(children[i]);
                code += id + ".add("+child.id+");\n";
            }
        }
    }
    return code;
}

exports.create = function() {
    var win = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "#fff",
    });
    
    var label = Ti.UI.createTextArea({
        //value: JSON.stringify(app.data, null, 4),
        value: "",
        top: 20,
        bottom: 60,
        left: 20,
        right: 20,
        borderColor: "#33c8a3",
        borderWidth: 1
    });
    win.add(label);
    
    var close = Ti.UI.createButton({
        title: "Import",
        bottom: 20,
        width: 80,
        backgroundColor: "#33c8a3",
        color: "white",
        height: 30,
    });
    close.addEventListener("click", function() {
        var data;
        try {
            data = JSON.parse(label.getValue());
        } catch(err) {}
        if (data) {
            app.data = data;
            app.update();
            props.update();
        }
        win.close();
    });
    win.add(close);
    
    return win;
};

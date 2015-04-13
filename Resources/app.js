var app = {};

app.data = {
    type: "view",
    id: "root",
    backgroundColor: "yellow",
    layout: "vertical",
    width: Ti.UI.FILL,
    children: [
        {type: "textField", id: "user", text: "", hintText: "用户名", width: 400, top: 20},
        {type: "textField", id: "password", text: "", hintText: "密码", passwordMask: true, width: 400, top: 20},
        {type: "button", id: "submit", title: "提交", top: 20},
    ],
};

app.selected = "root";

app.nextId = 0;

app.items = {};
app.views = {};
app.trees = {};
app.parents = {};

function removeChildren(view) {
    if (view.children) {
        for (var i=0;i<view.children.length;i++) {
            var child = view.children[i];
            view.remove(child);
        }
    }
}

app.update = function() {
    console.log("children function: " + preview.removeAllChildren);
    removeChildren(preview);
    //preview.removeAllChildren();
    preview.add(app.genView(app.data));
    removeChildren(tree.myContent);
    //tree.myContent.removeAllChildren();
    tree.myContent.add(app.genTree(app.data));
    console.log(app.data);
};

console.log([] instanceof Array);
console.log({} instanceof Object);

function dupData(data) {
    var r = dup(data);
    var id = r.id;
    var children = r.children;
    r.id = "_v" + app.nextId ++;
    r.children = [];
    if (children) {
        for (var i=0;i<children.length;i++) {
            var child = children[i];
            r.children.push(dupData(child));
        }
    }
    return r;
}

function dup(a) {
    var b = {};
    for (k in a) {
        b[k] = a[k];
    }
    return b;
}

app.genView = function(data) {
    var type = data.type || "view";
    var children = data.children;
    var id = data.id;
    var args = dup(data);
    args.type = undefined;
    args.children = undefined;
    args.id = undefined;
    args.deleted = undefined;
    if (args.fontSize) {
        args.font = {fontSize: args.fontSize};
        args.fontSize = undefined;
    }
    var string = 'Ti.UI.create' + type.substr(0,1).toUpperCase() + type.substr(1) + "("+JSON.stringify(args)+");";
    console.log(string);
    var view = eval(string);
    
    if (app.selected == id) {
        view.setBorderWidth(1);
        view.setBorderColor("blue");
    }
    if (children) {
        for (var i=0;i<children.length;i++) {
            var child = children[i];
            if (!child.deleted) {
                var childView = app.genView(child);
                view.add(childView);
                app.parents[child.id] = data;
            }
        }
    }
    app.views[id] = view;
    app.items[id] = data;
    return view;
};

app.genTree = function(data) {
    var type = data.type || "view";
    var children = data.children;
    var id = data.id;
    var view = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: 20,
        layout: "vertical",
    });
    view.add(Ti.UI.createLabel({text: type+": "+id, left: 0, top: 2}));
    if (app.selected == id) {
        console.log("id equal " + id);
        view.children[0].setBorderWidth(1);
        view.children[0].setBorderColor("blue");
    }
    
    if (children) {
        for (var i=0;i<children.length;i++) {
            var child = children[i];
            if (!child.deleted) {
                var childView = app.genTree(child);
                view.add(childView);
            }
        }
    }
    view.myId = id;
    app.trees[id] = view;
    view.addEventListener("click", function(e) {
        app.selected = this.myId;
        console.log(this.myId);
        app.update();
        props.update();
        e.cancelBubble = true;
    });
    return view;
};

Ti.UI.setBackgroundColor("#fff");

var win = Ti.UI.createWindow({
    backgroundColor: "white",
    layout: "horizontal",
    top: 20,
    
});

var preview = require("preview").create();
var tree = require("tree").create();
var props = require("props").create();
win.add(preview);
win.add(tree);
win.add(props);

win.open();

app.update();
props.update();

(function (global0bj) {
    // Setup MakeBelieveJS

    // MakeBelieveElement constructor function  
    function MakeBelieveElement(nodes) {
        // this means this instance of MakeBelieveElement
        this.nodes = nodes;
    }

    MakeBelieveElement.prototype.getLength = function() {
        return this.nodes.length; 
    };

    MakeBelieveElement.prototype.getTagNames = function() {
        var tagNames = [];
        for (var i= 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];
            tagNames.push(currentElement.tagName.toLowerCase());
        }
        return tagNames;
    };

    MakeBelieveElement.prototype.parent = function(element) {
        var parents = [];
        // element is defined
        if (element) {
            for (var i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].parentNode.matches(element)) {
                    parents.push(this.nodes[i].parentNode)
                }
            }
        }
        else { 
            for (var i = 0; i < this.nodes.length; i++) {
                parents.push(this.nodes[i].parentNode)
            }
        }
        return parents;
    };

    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    };

    global0bj.__ = query


})(window);

//console.log(window);

var paragraphs = __('p');
var divs = __('.item');

console.log(paragraphs.getLength());
console.log(divs.getLength());
console.log(paragraphs.getTagNames());
console.log(divs.getTagNames());

var parent = __('#password').parent();
var formParent = __('#password').parent('form');
var paragraphsParent = paragraphs.parent();
console.log(parent);
console.log(formParent);
console.log(paragraphsParent);




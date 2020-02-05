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

    // 4 //
    MakeBelieveElement.prototype.parent = function(element) {
        var parents = [];

        for (var i = 0; i < this.nodes.length; i++) {
            if (element){
                if (this.nodes[i].parentNode.matches(element)) {
                    parents.push(this.nodes[i].parentNode)
                }
            }   
            else { 
                parents.push(this.nodes[i].parentNode)
            }
        }
        return parents;
    };

    // 5 //
    MakeBelieveElement.prototype.grandParent = function(element) {
        var grandParents = [];
        
        for (var i = 0; i < this.nodes.length; i++) {
            if (element){
                if (this.nodes[i].parentNode.parentNode.matches(element)) {
                    grandParents.push(this.nodes[i].parentNode.parentNode)
                }
            }   
            else { 
                grandParents.push(this.nodes[i].parentNode.parentNode)
            }
        }
        return grandParents;
    };

    // 6 //
    MakeBelieveElement.prototype.ancestor = function (selector) {
        var findSelector = document.querySelector(selector)
        var parentItem
        var ancestor
        for (let item of this.nodes) {
            parentItem = item.parentElement
            while (parentItem !== null) {
                if (parentItem == findSelector) {
                    ancestor = parentItem
                }
                if (parentItem.parentElement === null) {
                    parentItem = null;
                }
                else {
                    parentItem = parentItem.parentElement
                }
            }
        }
        return ancestor
    };

    // 7 //
    MakeBelieveElement.prototype.onClick = function(evt){
        for (var i = 0; i < this.nodes.length; i++){
            this.nodes[i].addEventListener("click", evt)
        }
    }

    // 8 //
    MakeBelieveElement.prototype.insertText = function(text){
        for (var i = 0; i < this.nodes.length; i++){
            this.nodes[i].innerHTML = text
            console.log(this.nodes)
        }
    }

    // 9 //
    MakeBelieveElement.prototype.append = function(elem){
        var newElem;
        if (typeof elem == "string"){
            var elemType = elem.match(/<(.*?)>/)[0];
            var stripedHtml = elem.replace(/<[^>]+>/g, '');
            newElem = document.createElement(elemType[1]);
            newElem.append(document.createTextNode(stripedHtml));
        } else{
            newElem = elem.parentNode
        }
        this.nodes[0].append(newElem)
    }

    // 10 //
    MakeBelieveElement.prototype.prepend = function(elem){
        var newElem;
        if (typeof elem == "string"){
            var elemType = elem.match(/<(.*?)>/)[1];
            var stripedHtml = elem.replace(/<[^>]+>/g, '');
            newElem = document.createElement(elemType);
            newElem.appendChild(document.createTextNode(stripedHtml));
        } else{
            newElem = elem.parentNode
        }
        this.nodes[0].prepend(newElem)
    }

    // 11 //
    MakeBelieveElement.prototype.delete = function(){
        for (var i = 0; i < this.nodes.length; i++){
            this.nodes[i].remove()
        }
    }
    
    // 14 //
    MakeBelieveElement.prototype.toggleClass = function(c){
        var toggledClasses = this.nodes[0].classList.value.split(' ')
        this.nodes[0].classList.value = ''
        var found = false
        for (let i=0; i< toggledClasses.length; i++){
            if (!(toggledClasses[i] == c)){
                this.nodes[0].classList.add(toggledClasses[i])
                
            } else{
                found = true
            }
        }
        if (found == false){
            this.nodes[0].classList.add(c)
        }
        return this.nodes[0]
    }

    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    };

    global0bj.__ = query


})(window);

//console.log(window);

var paragraphs = __('p');
var divs = __('.item');

console.log("length")
console.log(paragraphs.getLength());
console.log(divs.getLength());

var parent = __('#password').parent();
var formParent = __('#password').parent('form');
console.log("parents")
console.log(parent);
console.log(formParent);

var paragraphsParent = paragraphs.parent();
var paragraphsGrandParent = paragraphs.grandParent();
var paragraphsAncestor = paragraphs.ancestor('.ancestor');
console.log("parents of p");
console.log(paragraphsParent);
console.log("grandparent of p")
console.log(paragraphsGrandParent);
console.log("ancestor of p")
console.log(paragraphsAncestor);

console.log("paragraph tagnames")
console.log(paragraphs.getTagNames());
console.log("div tagnames")
console.log(divs.getTagNames());


console.log(__('#paragraph-1').ancestor('.ancestor'))
__('.top').onClick(function(evt){
    console.log(evt)
})

__('.parent').insertText('hallo');

__('.the-prepender').prepend('<p>I am an prepended paragraph</p>')
__('.the-prepender').prepend('<p>again</p>')
__('.the-prepender').prepend('<h2>again</h2>')
__('.the-prepender').prepend('<h2></h2>')
__('.the-prepender').prepend(document.createElement('p')
            .appendChild(
                document.createTextNode('bla')
                ))
__('.the-appender').append('<p>I am an appended paragraph!</p>')
__('.the-appender').append(
    document.createElement('p')
        .appendChild(
            document.createTextNode('I am an appended paragraph!')
        )
)
__('.some-div h2').delete()


// console.log(document)
console.log(__('.some-div').toggleClass('other-class'))
console.log(__('.some-div').toggleClass('new-class'))



